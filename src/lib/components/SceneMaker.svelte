<script>
    import { onMount, onDestroy } from "svelte";
    import { frameConfigurationStore } from "../../lib/FrameConfigurationStore.js";
    import * as THREEJsUtilities from "../../lib/ThreeJsUtilities.js";
    import { sceneStore, sceneIsReady } from "../ThreeJSstore.js";
    import { CreateSquareContourCoordinatesWithIntermediatePoints } from "$lib/FrameUtilitiesSquare.js";
    import * as THREE from "three";

    let localFrameConfiguration = THREEJsUtilities.startingFrameConfiguration;

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
    let planeImage;

    

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
        localFrameConfiguration = THREEJsUtilities.startingFrameConfiguration;
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

        // @ts-ignore
        // planeImage = CreatePlaneImage(
        //     localFrameConfiguration.ImageSrc,
        //     localFrameConfiguration.ImageSize[0],
        //     localFrameConfiguration.ImageSize[1],
        // );

        //  if (planeImage != null){
        //     scene.add(planeImage);
        //  }else{
        //     console.log("Plane is null");
        //  }

        // const geometryCube = new THREE.BoxGeometry(0.2, 0.2); // Parámetros por defecto para un cubo 1x1x1
        // const materialCube = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Material verde básico
        // const cube = new THREE.Mesh(geometryCube, materialCube); // Crear el mesh del cubo
        // cube.position.set(generateRandom(), generateRandom(), generateRandom());
        // scene.add(cube);

        // Create Test plane with texture
        // const geometryTest = new THREE.PlaneGeometry(0.5, 0.5);
        // const materialTest = new THREE.MeshBasicMaterial({
        //     color: 0xff0000,
        //     side: THREE.DoubleSide,
        // });
        // const planeTest = new THREE.Mesh(geometryTest, materialTest);
        // planeTest.position.set(
        //     generateRandom(),
        //     generateRandom(),
        //     generateRandom(),
        // );
        // scene.add(planeTest);

        // let planeTexture = textureLoader.load("/referenceImages/1080_1080.jpg");

        // Step 2: Load the Texture
        const geometryTest2 = new THREE.PlaneGeometry(0.2, 0.2);
        const planeTexture = textureLoader.load(
            localFrameConfiguration.ImageSrc, // URL of the texture
            () => {
                console.log("Texture loaded successfully");
                
                // const materialTest = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
                let materialTest2 = new THREE.MeshPhysicalMaterial({
                    map: planeTexture,
                    side: THREE.FrontSide,
                });
                const planeTest2 = new THREE.Mesh(geometryTest2, materialTest2);
                scene.add(planeTest2);
                sceneStore.set(scene);
                sceneIsReady.set(true);
                console.log("Scene async is ready maker");
            },
            undefined,
            (err) => {
                console.error(
                    "An error happened while loading the texture",
                    err,
                );
            },
        );

        // sceneStore.set(scene);
        // sceneIsReady.set(true);
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

    function generateRandom() {
        // Define the range for the random x position
        const minX = -0.5;
        const maxX = 0.5;

        // Generate a random x position within the defined range
        const randomX = Math.random() * (maxX - minX) + minX;

        return randomX;
    }
</script>
