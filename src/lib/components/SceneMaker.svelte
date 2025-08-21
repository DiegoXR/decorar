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
    import { getUserImageFromCache } from "../../lib/TextureCacheStore.js";


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

    // Helper function to process plane texture and create mesh
    function processPlaneTexture(planeTexture, width, height, resolve) {
        // Configure wrapping for repetition
        planeTexture.wrapS = THREE.RepeatWrapping;
        planeTexture.wrapT = THREE.RepeatWrapping;
        
        // Adjust repetition based on texture proportion
        const textureWidth = planeTexture.image ? planeTexture.image.width : planeTexture.source.data.width;
        const textureHeight = planeTexture.image ? planeTexture.image.height : planeTexture.source.data.height;
        const textureRatio = textureWidth / textureHeight;
        
        // Save texture ratio for frame usage
        planeTextureRatio = textureRatio;
                       
        // Improve texture quality
        planeTexture.minFilter = THREE.LinearFilter;
        planeTexture.magFilter = THREE.LinearFilter;
        planeTexture.anisotropy = 4;
        planeTexture.generateMipmaps = true;
        
        // Create material and geometry
        const material = new THREE.MeshPhysicalMaterial({
            map: planeTexture,
            side: THREE.FrontSide,
        });

        const geometry = new THREE.PlaneGeometry(width, height);
        const plane = new THREE.Mesh(geometry, material);
        
        scene.add(plane);
        resolve(true);
    }

    function CreatePlaneAsynchronously() {
        const imagePath = localFrameConfiguration.ImageSrc;
        const width = localFrameConfiguration.ImageSize[0];
        const height = localFrameConfiguration.ImageSize[1];
        
        if (imagePath == null) return null;

        return new Promise((resolve, reject) => {
            // Try to get cached image first
            const cachedImage = getUserImageFromCache(imagePath);
            
            if (cachedImage) {
                // Use cached image - create texture directly from HTMLImageElement
                console.log(`Using cached image for plane: ${imagePath}`);
                
                const planeTexture = new THREE.Texture(cachedImage);
                planeTexture.needsUpdate = true;
                
                processPlaneTexture(planeTexture, width, height, resolve);
            } else {
                // Fallback to traditional loading method
                console.log(`Loading image traditionally (not in cache): ${imagePath}`);
                
                const planeTexture = textureLoader.load(
                    imagePath,
                    () => processPlaneTexture(planeTexture, width, height, resolve),
                    undefined,
                    (error) => {
                        console.error(`Error loading texture: ${imagePath}`, error);
                        reject(error);
                    }
                );    
            }
        });
    }

    function CreateFrame() {

        return new Promise((resolve, reject) => {

        if (!localFrameConfiguration.FrameIsVisible){
            resolve(true);
            return;
        }
                  
            // Use traditional texture loading for frames (no cache)
            const frameTextureUrl = localFrameConfiguration.FrameColor?.imageUrl || "/referenceTextures/WoodReference.png";
            
            const frameTexture = textureLoader.load(
            frameTextureUrl,
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

                // frameTexture.colorSpace = THREE.SRGBColorSpace;

                // Get the color from the frame configuration - use hexModel for Three.js
                const frameColorHex = localFrameConfiguration.FrameColor.hexModel;
                
                const frameColor = new THREE.Color('#' + frameColorHex);
                console.log('Applied frame final color:', frameColorHex);

                let frameMaterial = new THREE.MeshStandardMaterial({
                    map: frameTexture,
                    side: THREE.FrontSide,
                    metalness: 0,
                    roughness: 1,
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
                console.error('Error loading frame texture:', error);
                reject(error);
            }
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


</script>
