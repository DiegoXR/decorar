<script>
    import { onMount, onDestroy } from "svelte";
    import { frameConfigurationStore } from "../../lib/FrameConfigurationStore.js";
    import * as THREEJsUtilities from "../../lib/ThreeJsUtilities.js";
    import * as SetupUtilities from "../../lib/SetupUtilities.js";
    import { sceneIsReady, sceneStore } from "../SceneStatusStore.js";
    import * as THREEJsConfiguration from "../../lib/SceneConstants.js";
    import * as THREE from "three";
    import * as FrameUtilitiesSquare from "../../lib/FrameUtilitiesSquare.js";
    import * as UVProjectionUtils from "../../lib/UVProjectionUtils.js";


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
    let textureLoader = new THREE.TextureLoader();

    /**
     * @type {THREE.Mesh}
     */
    let frame;
    
    /**
     * Variable para almacenar el ratio de la textura del plano
     * @type {number}
     */
    let planeTextureRatio = 1;

    onMount(() => {    
        // window.addEventListener('beforeunload', handleBeforeUnload);
        SceneSubscription();
        FrameConfigurationSubscription();  
    });

    onDestroy(() => {
        if (currentFrameSubscription) currentFrameSubscription();
        if (sceneUnsubscription) sceneUnsubscription();

        console.log("3D Maker : Remove Elements from scene");
        sceneStore.set(scene);
        THREEJsUtilities.ClearScene(scene);
        localFrameConfiguration = THREEJsConfiguration.startingFrameConfiguration;
        sceneStore.set(scene);
        sceneIsReady.set(false);
        // window.removeEventListener('beforeunload', handleBeforeUnload);
    });

    function FrameConfigurationSubscription() {
        currentFrameSubscription = frameConfigurationStore.subscribe(
            (value) => {
                localFrameConfiguration = value;
                createScenePromise();

                // console.log(
                //     `SCENE Maker /The received configuration is img src : ${localFrameConfiguration.ImageSrc}, Visi : ${localFrameConfiguration.FrameIsVisible}, frame width
                //     ${localFrameConfiguration.FrameBorderWidth}`,
                // );

            },
        );
    }

    function SceneSubscription() {
        let sceneUnsubscription = sceneStore.subscribe((value) => {
            // console.log("Step 1 : SCENE Maker : Getting the scene " + scene);
            scene = value;
        });

        sceneUnsubscription();
    }

    function CreatePlaneAsynchronously() {
             
        let imagePath = localFrameConfiguration.ImageSrc;
        let width = localFrameConfiguration.ImageSize[0];
        let height = localFrameConfiguration.ImageSize[1]
        
        if (imagePath == null) return null;

        return new Promise((resolve, reject) => {

            const planeTexture = textureLoader.load(
            imagePath, // URL of the texture
            () => {
                // Configurar wrapping para permitir repetición
                planeTexture.wrapS = THREE.RepeatWrapping;
                planeTexture.wrapT = THREE.RepeatWrapping;
                
                // Ajustar la repetición basada en la proporción de la textura
                const textureWidth = planeTexture.image.width;
                const textureHeight = planeTexture.image.height;
                const textureRatio = textureWidth / textureHeight;
                
                // Guardar el ratio de la textura en una variable para usarlo en el frame
                planeTextureRatio = textureRatio;
                               
                // Mejorar calidad de la textura
                planeTexture.minFilter = THREE.LinearFilter;
                planeTexture.magFilter = THREE.LinearFilter;
                planeTexture.anisotropy = 4; // Aumentar filtrado anisotrópico
                planeTexture.generateMipmaps = true;
                
                let material = new THREE.MeshPhysicalMaterial({
                    map: planeTexture,
                    side: THREE.FrontSide,
                });

                let geometry = new THREE.PlaneGeometry(width, height);
                const plane = new THREE.Mesh(geometry, material);
                // console.log(
                //     `Succesfully loaded texture ${imagePath} in the Scene Maker`,
                // );
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

    function CreateFrame() {
        // console.log(
        //     `Frame will be created with the following params : Width :${localFrameConfiguration.ImageSize[0]}- Height : ${localFrameConfiguration.ImageSize[1]} `,
        // );
        // console.log(
        //     `Frame will be created with the following params : BorderWidth :${localFrameConfiguration.FrameBorderWidth}- Depth : ${localFrameConfiguration.FrameDepth} `,
        // );

        return new Promise((resolve, reject) => {

        if (!localFrameConfiguration.FrameIsVisible){
            resolve(true);
            return;
        }
                  
            const frameTexture = textureLoader.load(
            "/referenceTextures/WoodReference.png", // URL of the texture
            () => {
            let imageWidth = localFrameConfiguration.ImageSize[0];
            let imageHeight = localFrameConfiguration.ImageSize[1];

            let passPartoutContribution = 0;

            if (localFrameConfiguration.PasspartoutIsVisible)
                passPartoutContribution = SetupUtilities.CalculatePasspartoutBorders(localFrameConfiguration.PasspartoutCutoutSize, imageWidth); 
                      
            let frameTargetWidth = passPartoutContribution + imageWidth -  THREEJsConfiguration.frameInnerOffset;
            let frameTargetHeight = passPartoutContribution + imageHeight - THREEJsConfiguration.frameInnerOffset; 

                // Create the frame mesh
                frame = FrameUtilitiesSquare.CreateFrameSquare(
                    frameTargetWidth,
                    frameTargetHeight,
                    localFrameConfiguration.FrameBorderWidth,
                    localFrameConfiguration.FrameDepth                   
                );
                
                // Apply box projection UVs to improve texture mapping
                UVProjectionUtils.applyProjectionUVs(frame, 'planar', { scale: 4 });

                // Improve texture quality and mapping
                frameTexture.wrapS = THREE.RepeatWrapping;
                frameTexture.wrapT = THREE.RepeatWrapping;
                
                // Usar directamente el ratio de la textura del plano para el frame
                console.log('Usando ratio de textura del plano:', planeTextureRatio);
                
                // Aplicar el ratio de la textura del plano al frame
                if (planeTextureRatio > 1) {
                    // Textura más ancha que alta
                    frameTexture.repeat.set(planeTextureRatio * 1, 1);
                } else if (planeTextureRatio < 1) {
                    // Textura más alta que ancha
                    frameTexture.repeat.set(1, (1/planeTextureRatio) * 1);
                } else {
                    // Textura cuadrada
                    frameTexture.repeat.set(1, 1);
                }
                
                // Improve texture filtering
                frameTexture.minFilter = THREE.LinearFilter;
                frameTexture.magFilter = THREE.LinearFilter;
                frameTexture.anisotropy = 4; // Increase anisotropic filtering
                
                // Prevent texture bleeding
                frameTexture.generateMipmaps = true;

                // Get the color from the frame configuration
                const frameColorHex = localFrameConfiguration.FrameColor.hex;
                const frameColorRgb = SetupUtilities.hexToRgb(frameColorHex, true); // Use oak as default
                
                // Convert RGB to THREE.js color format (0-1 range)
                const frameColor = new THREE.Color(
                    frameColorRgb.r / 255,
                    frameColorRgb.g / 255,
                    frameColorRgb.b / 255
                );
                
                let frameMaterial = new THREE.MeshPhysicalMaterial({
                    map: frameTexture,
                    side: THREE.FrontSide,
                    roughness: 0.7, // Adjust for better material appearance
                    metalness: 0.2,
                    color: frameColor // Apply the color from the configuration
                });

                frame.material = frameMaterial;  

                // Frame goes closer to the camera so its back face touches the wall instead of being across the wall
                frame = THREEJsUtilities.repositionMesh(
                    frame,
                    localFrameConfiguration.FrameDepth / 2 - THREEJsConfiguration.frameDepthOffset,
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

    function createPasspartout(){
            
        return new Promise((resolve, reject) => {
        
            if (!localFrameConfiguration.PasspartoutIsVisible || !localFrameConfiguration.FrameIsVisible){
                resolve(true);
                return;
            }
            
            let imageWidth = localFrameConfiguration.ImageSize[0];
            let imageHeight = localFrameConfiguration.ImageSize[1];

            let passPartoutContribution = SetupUtilities.CalculatePasspartoutBorders(localFrameConfiguration.PasspartoutCutoutSize, imageWidth); 
                      
            let planeWidth = passPartoutContribution + imageWidth;
            let planeHeight = passPartoutContribution + imageHeight;   

              // TESTING EXTRUDE
              const shape = new THREE.Shape();
              shape.moveTo(-planeWidth/2, -planeHeight/2);
              shape.lineTo(-planeWidth/2, planeHeight/2);
              shape.lineTo(planeWidth/2, planeHeight/2);
              shape.lineTo(planeWidth/2, -planeHeight/2);
              shape.moveTo(-planeWidth/2, -planeHeight/2);

              const hole = new THREE.Path();
              hole.moveTo(-imageWidth/2, -imageHeight/2);
              hole.lineTo(-imageWidth/2, imageHeight/2);
              hole.lineTo(imageWidth/2, imageHeight/2);
              hole.lineTo(imageWidth/2, -imageHeight/2);
              hole.lineTo(-imageWidth/2, -imageHeight/2);

              shape.holes = [hole];

              const extrudeSettings = { 
            	depth: 0.005, 
            	bevelEnabled: false, 
            	bevelSegments: 0, 
            	steps: 1, 
            	bevelSize: 0, 
            	bevelThickness: 0 
            };

              const extrudedGeometery = new THREE.ExtrudeGeometry(shape, extrudeSettings);
              extrudedGeometery.center();
              //White alternatives
            //   0xffffff
            //   0xf5f5f5
            //   0xf8f8ff
            //   0xefefef

              
              const passPartoutPlane = new THREE.Mesh(extrudedGeometery, new THREE.MeshPhysicalMaterial({color: 0xf5f5f5, side: THREE.DoubleSide}));
              scene.add( passPartoutPlane );
              resolve(true);
    });       
    }

    // Ya no es necesario inicializar textureLoader aquí
    
    function createScenePromise() {

    Promise.all([CreateFrame(), CreatePlaneAsynchronously(), createPasspartout()])
    .then(([isFrameReady, isPlaneReady, isPassPartoutReady]) => {
       //   console.log('Both Objects created succesfully');
      // Do something with the textures if needed
      
      if (isFrameReady && isPlaneReady && isPassPartoutReady){
        sceneStore.set(scene);
        sceneIsReady.set(true);
      }

    })
    .catch((error) => {
      console.error('Error loading textures', error);
    });
    }

    // Code to run before the user leaves or refreshes the page
    // @ts-ignore
//     const handleBeforeUnload = (event) => {
//     // Perform your action here
//     console.log('User is refreshing or leaving the page');
//     frameConfigurationStore.set(localFrameConfiguration);
//   }; 

            
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

</script>
