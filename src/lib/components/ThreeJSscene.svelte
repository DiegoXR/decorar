<script>
    import { onMount, onDestroy } from "svelte";
    import * as THREE from "three";
    import { currentSelectedImageStore } from "../CurrentSelectedImageStore.js";
    import { rendererStore, sceneStore } from "../SceneStatusStore.js"; // Adjust the import path as necessary
    import * as SQUAREFRAME from "../../lib/FrameUtilitiesSquare.js";
    import * as THREEJsUtilities from "../../lib/ThreeJsUtilities.js";
    import { OrbitControls } from "three/addons/controls/OrbitControls.js";
    import { currentGlobalPropertiesStore } from "../GlobalPropertiesStore.js";

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
     * @type {boolean}
     */
    let IsFrameSynchronizedWithImage = false;

    /**
     * @type {THREE.TextureLoader}
     */
    let textureLoader;

    let dataObject = {
        src: "",
        alt: "",
        description: "",
        availableSizes: [[0, 0]],
        defaultSize: [0, 0],
    };

    let frameInnerOffset = 0.005;
    let frameWallOffset = 0.004;

    /**
     * @type {import("svelte/store").Unsubscriber}
     */
    let currentImageSubscription;

    /**
     * @type {import("svelte/store").Unsubscriber}
     */
    let currentPropertiesSubscription;

    let currentLocalReferenceProperties = THREEJsUtilities.startingGlobalProperties;

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
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.minDistance = 1;
        controls.maxDistance = 1000;
        controls.maxPolarAngle = Math.PI / 2;

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
        InitializePropertiesSubscription();
    });

    function InitializeImageSubscription() {
        currentImageSubscription = currentSelectedImageStore.subscribe(
            (value) => {
                dataObject = value;
                // console.log(`THREEJS : Creating Plane with default image sizes`);
                // @ts-ignore
                planeImage = CreatePlaneImage(
                    dataObject.src,
                    dataObject.defaultSize[0],
                    dataObject.defaultSize[1],
                );

                currentLocalReferenceProperties.ImageSize= [dataObject.defaultSize[0], dataObject.defaultSize[1]];
                if (planeImage != null) scene.add(planeImage);
            },
        );
    }

    function InitializePropertiesSubscription() {
        currentPropertiesSubscription = currentGlobalPropertiesStore.subscribe(
            (currentGlobalProperties) => {
                // console.log(`THREEJS : Detected a global property change`);

                // When the image size is updated the plane image is updated as well.
                if (
                    currentGlobalProperties.ImageSize[0] !==
                        currentLocalReferenceProperties.ImageSize[0] &&
                    currentGlobalProperties.ImageSize[1] !==
                        currentLocalReferenceProperties.ImageSize[1]
                ) {
                    // console.log(
                    //     `THREEJS : The global properties for img size changed. Applying Plane size update ${currentGlobalProperties.ImageSize[0]} - ${currentGlobalProperties.ImageSize[1]}`,
                    // );
                    UpdateImageSize(
                        currentGlobalProperties.ImageSize[0],
                        currentGlobalProperties.ImageSize[1],
                    );
                    currentLocalReferenceProperties.ImageSize =
                        currentGlobalProperties.ImageSize;



                    if (currentGlobalProperties.FrameIsVisible) {
                        CreateFrame(currentGlobalProperties);
                        IsFrameSynchronizedWithImage = true;
                    } else {
                        IsFrameSynchronizedWithImage = false;
                    }
                }

                // Frame visibility change
                SetFrameVisibility(currentGlobalProperties);
            },
        );
    }

    onDestroy(() => {
        console.log("Destroying Three Js scene component");
        sceneStore.set(scene);

        THREEJsUtilities.DisposeThreeJsScene(scene, renderer, container);

        if (currentImageSubscription) currentImageSubscription();

        if (currentPropertiesSubscription) currentPropertiesSubscription();

        currentLocalReferenceProperties = THREEJsUtilities.startingGlobalProperties;

        IsFrameSynchronizedWithImage = false;
    });

    /**
     * @param {{ ImageSize: number[]; FrameIsVisible: boolean; FrameBorderWidth: number; FrameDepth: number; }} CurrentGlobalProperties
     */
    function SetFrameVisibility(CurrentGlobalProperties) {
        if (frame != null) {
            
            if (CurrentGlobalProperties.FrameIsVisible){
                if (IsFrameSynchronizedWithImage){
                    frame.visible = true;
                }else{
                    CreateFrame(CurrentGlobalProperties);
                    frame.visible = true;
                }           
            }else{
                frame.visible = false;
            }         
        }
        else if (frame == null && CurrentGlobalProperties.FrameIsVisible){
            CreateFrame(CurrentGlobalProperties);
        }

        // console.log(`***THREE JS I have applied the following visibility to the local ref ${CurrentGlobalProperties.FrameIsVisible}`);

        currentLocalReferenceProperties.FrameIsVisible = CurrentGlobalProperties.FrameIsVisible;
    }

    /**
     * @param {string} imagePath
     * @param {number} width
     * @param {number} height
     */
    function CreatePlaneImage(imagePath, width, height) {
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
    function UpdateImageSize(width, height) {
        THREEJsUtilities.removeMeshFromScene(planeImage, scene);
        // @ts-ignore
        planeImage = CreatePlaneImage(dataObject.src, width, height);

        if (planeImage != null) scene.add(planeImage);
    }

    /**
     * @param {{ ImageSize: number[]; FrameIsVisible: boolean; FrameBorderWidth: number; FrameDepth: number; }} CurrentGlobalProperties
     */
    function CreateFrame(CurrentGlobalProperties) {
        // When the image size is updated the frame is recreated as well
        THREEJsUtilities.removeMeshFromScene(frame, scene);
        // @ts-ignore
        frame = SQUAREFRAME.CreateFrameSquare(
            CurrentGlobalProperties.ImageSize[0] - frameInnerOffset,
            CurrentGlobalProperties.ImageSize[1] - frameInnerOffset,
            CurrentGlobalProperties.FrameBorderWidth,
            CurrentGlobalProperties.FrameDepth,
            materials,
        );

        // Frame goes closer to the camera so its back face touches the wall instead of being across the wall
        frame = THREEJsUtilities.repositionMesh(
            frame,
            CurrentGlobalProperties.FrameDepth / 2,
        );
        scene.add(frame);

        currentLocalReferenceProperties.FrameBorderWidth =
            CurrentGlobalProperties.FrameBorderWidth;
        currentLocalReferenceProperties.FrameDepth =
            CurrentGlobalProperties.FrameDepth;
    }
</script>

<div bind:this={container} class="w-full h-full"></div>
