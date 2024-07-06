<script>
    import { onMount, onDestroy } from "svelte";
    import { frameConfigurationStore } from "../../lib/FrameConfigurationStore.js";
    import * as THREEJsUtilities from "../../lib/ThreeJsUtilities.js";
    import { sceneIsReady, sceneStore } from "../SceneStatusStore.js";
    import * as THREEJsConfiguration from "../../lib/SceneConstants.js";
    import * as SQUAREFRAME from "../../lib/FrameUtilitiesSquare.js";
    import * as THREE from "three";

    let localFrameConfiguration =
        THREEJsConfiguration.startingFrameConfiguration;

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

    /**
     * @type {THREE.Material[]}
     */
    let materials = [];

    onMount(() => {
        SceneSubscription();
        FrameConfigurationSubscription();
        createScenePromise(localFrameConfiguration);
    });

    onDestroy(() => {
        if (currentFrameSubscription) currentFrameSubscription();
        if (sceneUnsubscription) sceneUnsubscription();

        console.log("3D Maker : Remove Elements from scene");
        sceneStore.set(scene);
        THREEJsUtilities.ClearScene(scene);
        localFrameConfiguration =
            THREEJsConfiguration.startingFrameConfiguration;
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

     /**
     * @param {{ ImageSrc: string; ImageSize: number[]; FrameIsVisible: boolean; FrameBorderWidth: number; FrameDepth: number; availableSizes: number[][]; }} localFrameConfiguration
     */
    function CreatePlaneAsynchronously(localFrameConfiguration) {
             
        let imagePath = localFrameConfiguration.ImageSrc;
        let width = localFrameConfiguration.ImageSize[0];
        let height = localFrameConfiguration.ImageSize[1]
        
        if (imagePath == null) return null;

        return new Promise((resolve, reject) => {

            const planeTexture = textureLoader.load(
            imagePath, // URL of the texture
            () => {
                let material = new THREE.MeshPhysicalMaterial({
                    map: planeTexture,
                    side: THREE.FrontSide,
                });

                let geometry = new THREE.PlaneGeometry(width, height);
                const plane = new THREE.Mesh(geometry, material);
                console.log(
                    `Succesfully loaded texture ${imagePath} in the Scene Maker`,
                );
                scene.add(plane);
                resolve(true);
            },
            undefined,
            (error) => {
                console.error(
                    `An error happened while loading the texture in the following path ${imagePath}`,
                    error,
                );

                reject(error);
            },
        );    
  });
    }

    /**
     * @param {{ ImageSrc: string; ImageSize: number[]; FrameIsVisible: boolean; FrameBorderWidth: number; FrameDepth: number; availableSizes: number[][]; }} localFrameConfiguration
     */
    function CreateFrame(localFrameConfiguration) {
        // console.log(
        //     `Frame will be created with the following params : Width :${localFrameConfiguration.ImageSize[0]}- Height : ${localFrameConfiguration.ImageSize[1]} `,
        // );
        // console.log(
        //     `Frame will be created with the following params : BorderWidth :${localFrameConfiguration.FrameBorderWidth}- Depth : ${localFrameConfiguration.FrameDepth} `,
        // );

        return new Promise((resolve, reject) => {

        if (!localFrameConfiguration.FrameIsVisible)
            resolve(true);
            



    // var loader = new THREE.CubeTextureLoader();
    // var textureCube = loader.load([
    //     "/referenceTextures/Oak_512.png", // Right
    //     "/referenceTextures/Oak_512.png", // Left
    //     "/referenceTextures/Oak_512.png", // Top
    //     "/referenceTextures/Oak_512.png", // Bottom
    //     "/referenceTextures/Oak_512.png", // Front
    //     "/referenceTextures/Oak_512.png", // Back
    // ]);

    // const m0 = new THREE.MeshStandardMaterial({
    //     side: THREE.FrontSide,
    //     transparent: false,
    //     opacity: 1,
    //     color: 0xff0000,
    //     map: texture,
    // });

    //const pbrMaterial = new THREE.MeshPhysicalMaterial({
        //map: texture,
        // normalMap: normalTexture,
        // roughnessMap: roughnessTexture,
        // metalnessMap: metalnessTexture,
        // clearcoat: 1,
        // clearcoatRoughness: 0.1,
        // reflectivity: 1
    //});
       
            const frameTexture = textureLoader.load(
            "/referenceTextures/Oak_512.png", // URL of the texture
            () => {
                frameTexture.wrapS = THREE.RepeatWrapping;
                frameTexture.wrapT = THREE.RepeatWrapping;
                frameTexture.repeat.set(4, 1);

                let frameMaterial = new THREE.MeshPhysicalMaterial({
                    map: frameTexture,
                    side: THREE.FrontSide,
                });

                materials.push(frameMaterial);

                // @ts-ignore
                frame = SQUAREFRAME.CreateFrameSquare(
                    localFrameConfiguration.ImageSize[0] -
                        THREEJsConfiguration.frameInnerOffset,
                    localFrameConfiguration.ImageSize[1] -
                        THREEJsConfiguration.frameInnerOffset,
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
                resolve(true);
            },
            undefined,
            (error) => {
                console.error(
                    `An error happened while loading the frame texture in the following path`,
                    error,
                );
                reject(error);
            },
        );

      });
    }

    /**
     * @param {any} localFrameConfiguration
     */
    function createScenePromise(localFrameConfiguration) {

    textureLoader = new THREE.TextureLoader();
    
    Promise.all([CreateFrame(localFrameConfiguration), CreatePlaneAsynchronously(localFrameConfiguration)])
    .then(([isFrameReady, isPlaneReady]) => {
      console.log('Both Objects created succesfully');
      // Do something with the textures if needed
      
      if (isFrameReady && isPlaneReady){
        sceneStore.set(scene);
        sceneIsReady.set(true);
      }

    })
    .catch((error) => {
      console.error('Error loading textures', error);
    });
}


</script>
