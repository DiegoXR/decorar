<script>
    import { onMount, onDestroy } from "svelte";
    import * as THREE from "three";
    import { selectedImageObject } from "../../stores.js";
    import { currentFrameProperties } from "../../lib/FrameStore.js";
    // import { frameVisibilityStore } from "../../lib/FrameVisibilityStore.js";
    import { rendererStore, sceneStore } from "../threeJSstore.js"; // Adjust the import path as necessary
    import * as SQUAREFRAME from "../../lib/FrameUtilitiesSquare.js";
    import * as THREEJsUtilities from "../../lib/ThreeJsUtilities.js";
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

    /**
     * @type {HTMLDivElement}
     */
    let container;

    /**
     * @type {THREE.Scene}
     */
    let scene;

    /**
     * @type {THREE.Camera}
     */
    let camera;

    /**
     * @type {THREE.WebGLRenderer}
     */
    let renderer;

    /**
     * @type {THREE.Mesh}
     */
    let frame;

    let dataObject = {
        width: 1,
        height: 1,
        src: "",
        description: "",
        alt: "",
    };

    let ratio = null;

    let imageSize = [1, 1];

    /**
     * @type {{ innerWidth: number; innerHeight: number; isVisible: boolean; }}
     */
    let currentFrame;

    /**
     * @type {import("svelte/store").Unsubscriber}
     */
    let currentFrameSubscription;
    /**
     * @type {import("svelte/store").Unsubscriber}
     */
    let currentImageSubscription;

    //// Automatically create default Material
    const texturePath = "/referenceTextures/Oak_512.png";
    const texture = new THREE.TextureLoader().load(texturePath);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 1);

    const m0 = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.FrontSide,
        transparent: true,
        opacity: 1,
    });

    let materials = [m0];

    // Get the renderer from the Store
    $: renderer = $rendererStore;

    onMount(() => {
        
        currentFrame = THREEJsUtilities.baseFrame;
        console.log("Mounting Three Js Scene");
        
        InitializeImageSubscription();
      
       scene = new THREE.Scene();

        // Create camera
       camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            10,
        );
        camera.position.z = 0.5;

        // Create orbit controls for camera
        const controls = new OrbitControls( camera, renderer.domElement );
        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.minDistance = 1;
        controls.maxDistance = 1000;
        controls.maxPolarAngle = Math.PI / 2

        // Setup render
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x808080); // El código de color hexadecimal para gris
        container.appendChild(renderer.domElement);

        // Create plane with texture
        const textureLoader = new THREE.TextureLoader();
        const planeTexture = textureLoader.load(dataObject.src);
        const geometry = new THREE.PlaneGeometry(dataObject.width, dataObject.width);

        const material = new THREE.MeshPhysicalMaterial({
            map: planeTexture,
            side: THREE.FrontSide,
        });

        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        // Create ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 3); // color blanco, intensidad 0.5
        scene.add(ambientLight);

       // Create testing plane 1
       const planeTest = THREEJsUtilities.plane;
       planeTest.position.set(0,0,0.01);
       scene.add(planeTest); 

       // Create testing plane 2
    //    const geometry2 = new THREE.PlaneGeometry( 1, 1 );
    //    const material2 = new THREE.MeshBasicMaterial( {color: 0xff00, side: THREE.DoubleSide} );
    //    const plane2 = new THREE.Mesh( geometry2, material2 );
    //    plane2.position.set(0,0,0.01);
    //    scene.add( plane2 );

        function animate() {
            requestAnimationFrame(animate);
            // plane.rotation.x += 0.01;
            // plane.rotation.y += 0.01;
            renderer.render(scene, camera);
        }

        animate();
        
        InitializeFrameSubscription();
    });

    function InitializeImageSubscription(){
        currentImageSubscription = selectedImageObject.subscribe((value) => {
        dataObject = value;
        calculateRatio(dataObject.width, dataObject.height);      
    });
    }

    function InitializeFrameSubscription() {
               
        currentFrameSubscription = currentFrameProperties.subscribe(
            (updatedFrame) => {

                if (currentFrame.isVisible != updatedFrame.isVisible) {
                    SetFrameVisibility(updatedFrame.isVisible);
                    currentFrame.isVisible = updatedFrame.isVisible;
                }
               
                if ( currentFrame.innerWidth != updatedFrame.innerWidth || currentFrame.innerHeight != updatedFrame.innerHeight) {

                    THREEJsUtilities.removeMeshFromScene(frame, scene);
                  
                    // @ts-ignore
                    frame = SQUAREFRAME.CreateFrameSquare(
                        updatedFrame.innerWidth,
                        updatedFrame.innerHeight,
                        updatedFrame.framewidth,
                        updatedFrame.frameDepth,
                        materials,
                    );

                    scene.add(frame);
                    currentFrame.innerWidth = updatedFrame.innerWidth;
                    currentFrame.innerHeight = updatedFrame.innerHeight;
                }
            },
        );
    }

    onDestroy(() => {
        
        console.log("Destroying Three Js scene component");
        sceneStore.set(scene);

        THREEJsUtilities.DisposeThreeJsScene(scene, renderer, container);

        if (currentImageSubscription) {
            currentImageSubscription();
        }

        if (currentFrameSubscription) {
            currentFrameSubscription();
        }
    });

    /**
     * @param {number} width
     * @param {number} height
     */
    function calculateRatio(width, height) {
        ratio = width / height;

        if (ratio > 1)
            imageSize[0] = ratio; // Portrait Image (Horizontal)
        else if (ratio < 1) imageSize[1] = 1 + (1 - ratio); // Landscape Image (Vertical)
    }

    /**
     * @param {boolean} isVisible
     */
    function SetFrameVisibility(isVisible) {
        if (frame != null) {
            frame.visible = isVisible;
        }
    }
</script>

<div bind:this={container} class="w-full h-full"></div>
