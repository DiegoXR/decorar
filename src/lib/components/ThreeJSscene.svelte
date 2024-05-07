<script>
    import { onMount, onDestroy } from "svelte";
    import * as THREE from "three";
    import { currentImageProperties } from "../ImageStore.js";
    import { currentFrameProperties } from "../../lib/FrameStore.js";
    // import { frameVisibilityStore } from "../../lib/FrameVisibilityStore.js";
    import { rendererStore, sceneStore } from "../threeJSstore.js"; // Adjust the import path as necessary
    import * as SQUAREFRAME from "../../lib/FrameUtilitiesSquare.js";
    import * as THREEJsUtilities from "../../lib/ThreeJsUtilities.js";
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    import ConstNode from "three/examples/jsm/nodes/core/ConstNode.js";

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

     /**
     * @type {THREE.Mesh}
     */
    let planeImage;


    /**
     * @type {THREE.TextureLoader}
     */
    let textureLoader;

    // let dataObject = {
    //     width: 1,
    //     height: 1,
    //     src: "",
    //     description: "",
    //     alt: "",
    // };

    let dataObject = {
    src: "",
    alt: "",
    description: "",
    availableSizes: [
    [0, 0]
],
    defaultSize: [0, 0]
}


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
        textureLoader = new THREE.TextureLoader();

        // Create ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 3); // color blanco, intensidad 0.5
        scene.add(ambientLight);

        function animate() {
            requestAnimationFrame(animate);
            // plane.rotation.x += 0.01;
            // plane.rotation.y += 0.01;
            renderer.render(scene, camera);
        }

        animate();

        InitializeImageSubscription();
        InitializeFrameSubscription();
    });

    function InitializeImageSubscription(){
        currentImageSubscription = currentImageProperties.subscribe((value) => {
        dataObject = value;
        
        // @ts-ignore
        planeImage = CreatePlaneImage(dataObject.src, dataObject.defaultSize[0], dataObject.defaultSize[1])
        
        if (planeImage != null) scene.add(planeImage);
        
    });
    }

    function InitializeFrameSubscription() {
               
        currentFrameSubscription = currentFrameProperties.subscribe(
            (updatedFrame) => {

                // Frame visibility change
                if (currentFrame.isVisible != updatedFrame.isVisible) {
                    SetFrameVisibility(updatedFrame.isVisible);
                    currentFrame.isVisible = updatedFrame.isVisible;
                }
               
                // Frame size change
                if (currentFrame.innerWidth != updatedFrame.innerWidth || currentFrame.innerHeight != updatedFrame.innerHeight) {

                    THREEJsUtilities.removeMeshFromScene(frame, scene);
                  
                    console.log("hEY");
                    
                    // @ts-ignore
                    frame = SQUAREFRAME.CreateFrameSquare(
                        updatedFrame.innerWidth,
                        updatedFrame.innerHeight,
                        updatedFrame.framewidth,
                        updatedFrame.frameDepth,
                        materials,
                    );

                    // Frame goes closer to the camera so its back face touches the wall instead of being across the wall
                    THREEJsUtilities.repositionMesh(frame, updatedFrame.frameDepth)
                    scene.add(frame);
                    currentFrame.innerWidth = updatedFrame.innerWidth;
                    currentFrame.innerHeight = updatedFrame.innerHeight;

                    // When the frame size is updated the image is updated as well.
                    UpdateImageSize(updatedFrame.innerWidth, updatedFrame.innerHeight);
                }

                // Frame Color change
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
     * @param {boolean} isVisible
     */
    function SetFrameVisibility(isVisible) {
        if (frame != null) {
            frame.visible = isVisible;
        }
    }

    /**
     * @param {string} imagePath
     * @param {number} width
     * @param {number} height
     */
    function CreatePlaneImage(imagePath, width, height){
        
        if (imagePath == null) return null;
             
        let planeTexture = textureLoader.load(imagePath);
        let geometry = new THREE.PlaneGeometry(width, height);

        let planeMaterial = new THREE.MeshPhysicalMaterial({
            map: planeTexture,
            side: THREE.FrontSide,
        });

        let plane = new THREE.Mesh(geometry, planeMaterial);

        return plane;
    }

    /**
     * @param {number} width
     * @param {number} height
     */
    function UpdateImageSize(width, height){
        
        THREEJsUtilities.removeMeshFromScene(planeImage, scene);
        // @ts-ignore
        planeImage = CreatePlaneImage(dataObject.src, width, height)
        
        if (planeImage != null) scene.add(planeImage);
    }

</script>

<div bind:this={container} class="w-full h-full"></div>
