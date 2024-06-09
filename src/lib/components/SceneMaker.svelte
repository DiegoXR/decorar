<script>
    import { onMount, onDestroy } from "svelte";
    import { frameConfigurationStore } from "../../lib/FrameConfigurationStore.js";
    import * as THREEJsUtilities from "../../lib/ThreeJsUtilities.js";
    import {sceneIsReady, sceneStore} from "../SceneStatusStore.js";
    import * as THREEJsConfiguration from  "../../lib/SceneConstants.js";
    import * as SQUAREFRAME from "../../lib/FrameUtilitiesSquare.js";
    import * as THREE from "three";

    let localFrameConfiguration = THREEJsConfiguration.startingFrameConfiguration;

    /**
     * @type {import("svelte/store").Unsubscriber}
     */
    let currentFrameSubscription;

    /**
     * @type {import("svelte/store").Unsubscriber}
     */
    let sceneUnsubscription;

    /**
     * @type {THREE.Scene}
     */
    let scene;

    /**
     * @type {THREE.TextureLoader}
     */
    let textureLoader;

     /**
     * @type {THREE.Mesh}
     */
     let frame;

     //// Automatically create default Material
     const texturePath = "/referenceTextures/Oak_512.png";
    const texture = new THREE.TextureLoader().load(texturePath);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 1);

    const m0 = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
        color : 0xff0000
    });

    let materials = [m0];
    

    onMount(() => {
        SceneSubscription();
        FrameConfigurationSubscription();
        CreateScene();    
    });

    onDestroy(() => {
        if (currentFrameSubscription) currentFrameSubscription();
        if (sceneUnsubscription) sceneUnsubscription();

        console.log("3D Maker : Remove Elements from scene");
        THREEJsUtilities.CleanScene(scene);
        localFrameConfiguration = THREEJsConfiguration.startingFrameConfiguration;
        sceneStore.set(scene);
        sceneIsReady.set(false);

    });

    function FrameConfigurationSubscription() {
        currentFrameSubscription = frameConfigurationStore.subscribe(
            (value) => {
                localFrameConfiguration = value;

                console.log(
                    `SCENE Maker /The received configuration is img src : ${localFrameConfiguration.ImageSrc}, Visi : ${localFrameConfiguration.FrameIsVisible}, frame width
                    ${localFrameConfiguration.FrameBorderWidth}`,
                );
            },
        );
    }

    function SceneSubscription() {
        let sceneUnsubscription = sceneStore.subscribe((value) => {
            console.log("Step 1 : SCENE Maker : Getting the scene ");
            scene = value;
        });

        sceneUnsubscription();
    }

    function CreateScene() {
        // Create plane with texture
        textureLoader = new THREE.TextureLoader();       
        CreatePlaneAsynchronously(localFrameConfiguration.ImageSrc, localFrameConfiguration.ImageSize[0], localFrameConfiguration.ImageSize[1]);
        CreateFrame(localFrameConfiguration);
    }

    /**
     * @param {string} imagePath
     * @param {number} width
     * @param {number} height
     */
    function CreatePlaneAsynchronously(imagePath, width, height){
        if (imagePath == null) return null;

        const planeTexture = textureLoader.load(
            imagePath, // URL of the texture
            () => {                
                let material = new THREE.MeshPhysicalMaterial({
                    map: planeTexture,
                    side: THREE.FrontSide,
                });

                let geometry = new THREE.PlaneGeometry(width, height);
                const plane = new THREE.Mesh(geometry, material);
                scene.add(plane);
                sceneStore.set(scene);
                sceneIsReady.set(true);
            },
            undefined,
            (err) => {
                console.error(
                    "An error happened while loading the texture",
                    err,
                );
            },
        );
    }


     /**
     * @param {{ ImageSrc: string; ImageSize: number[]; FrameIsVisible: boolean; FrameBorderWidth: number; FrameDepth: number; availableSizes: number[][]; }} localFrameConfiguration
     */
     function CreateFrame(localFrameConfiguration) {
        
        console.log(`Frame will be created with the following params : Width :${localFrameConfiguration.ImageSize[0]}- Height : ${localFrameConfiguration.ImageSize[1]} `);
        console.log(`Frame will be created with the following params : BorderWidth :${localFrameConfiguration.FrameBorderWidth}- Depth : ${localFrameConfiguration.FrameDepth} `);
        
        // @ts-ignore
        frame = SQUAREFRAME.CreateFrameSquare(
            localFrameConfiguration.ImageSize[0] - THREEJsConfiguration.frameInnerOffset,
            localFrameConfiguration.ImageSize[1] - THREEJsConfiguration.frameInnerOffset,
            localFrameConfiguration.FrameBorderWidth,
            localFrameConfiguration.FrameDepth,
            materials,
        );

        // Frame goes closer to the camera so its back face touches the wall instead of being across the wall
        frame = THREEJsUtilities.repositionMesh(
            frame,
            localFrameConfiguration.FrameDepth / 2,
        );
        scene.add(frame);
    }
</script>
