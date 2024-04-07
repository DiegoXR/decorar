<script>
    import { onMount, onDestroy } from "svelte";
    import * as THREE from "three";
    import { selectedImageObject } from "../../stores.js";
    import {currentFrameProperties} from "../../lib/FrameStore.js";
    import { rendererStore, sceneStore } from "../threeJSstore.js"; // Adjust the import path as necessary
    import * as SQUAREFRAME from '../../lib/FrameUtilitiesSquare.js';

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
    let frame 

    let dataObject = {
        width: 1,
        height: 1,
        src: "",
        description: "",
        alt: "",
    };

    let frameObject = {
    isVisible: true,
    innerWidth: 1,
    innerHeight: 1,
    framewidth: 1,
    frameDepth: 1
    };

    let ratio = null;

    let imageSize = [1, 1];


    export let model5Value = 'hey Iam the scene model 5';

    // Get the renderer from the Store
    $: renderer = $rendererStore;

    onMount(() => {       

        scene = new THREE.Scene();      
        
        // Create camera
        camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            10,
        );
        camera.position.z = 1.5;

        // Setup render
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x808080); // El código de color hexadecimal para gris
        container.appendChild(renderer.domElement);

        
        // Create plane with texture
        const textureLoader = new THREE.TextureLoader();
        const planeTexture = textureLoader.load(dataObject.src);
        const geometry = new THREE.PlaneGeometry(imageSize[0], imageSize[1]);

        const material = new THREE.MeshPhysicalMaterial({
            map: planeTexture,
            side: THREE.FrontSide,
        });

        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);
        
        // Create frame mesh

        //// Automatically create frame
        const texturePath = "/referenceTextures/Oak_512.png";
        const texture = new THREE.TextureLoader().load(texturePath);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(3, 1);

        const m0 = new THREE.MeshStandardMaterial( { map: texture, 
        side: THREE.FrontSide,
        transparent : true,
        opacity :0.5 } );  

        const materials = [
        m0
        ];

        const innerWidth = 0.5;
        const innerHeight = 1;
        const framewidth = 0.09;
        const frameDepth = 0.3;
        // @ts-ignore
        frame = SQUAREFRAME.CreateFrameSquare(innerWidth, innerHeight, framewidth, frameDepth, materials)
        // Automatically create frame
        scene.add(frame);


        // Create ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 3); // color blanco, intensidad 0.5
        scene.add(ambientLight);

        /// Testing Cube
        // Crear un cubo y añadirlo a la escena
        // const geometryCube = new THREE.BoxGeometry(); // Parámetros por defecto para un cubo 1x1x1
        // const materialCube = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Material verde básico
        // cube = new THREE.Mesh(geometryCube, materialCube); // Crear el mesh del cubo
        // scene.add(cube); // Añadir el cubo a la materialCube

        function animate() {
            requestAnimationFrame(animate);
            // plane.rotation.x += 0.01;
            // plane.rotation.y += 0.01;
            renderer.render(scene, camera);
        }

        animate();
    });

    let unsubscribe = selectedImageObject.subscribe((value) => {
        dataObject = value;
        calculateRatio(dataObject.width, dataObject.height); 
               
    });

    let unsubscribe2 = currentFrameProperties.subscribe((currentFrame) =>{
        
        frameObject = currentFrame;
        SetVisibleCube(currentFrame.isVisible);
    });

    onDestroy(() => {       
        sceneStore.set(scene);
        // Stop the animation loop
        if (renderer) renderer.setAnimationLoop(null);

        // Dispose of resources
        scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                if (object.geometry) {
                    object.geometry.dispose();
                }

                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach((material) => {
                            if (material.map) material.map.dispose();
                            material.dispose();
                        });
                    } else {
                        if (object.material.map) object.material.map.dispose();
                        object.material.dispose();
                    }
                }
            }
        });

        if (renderer.domElement) {
            while (container.firstChild) container.removeChild(container.firstChild);
        }
    });

    onDestroy(unsubscribe);
    onDestroy(unsubscribe2);

    /**
     * @param {number} width
     * @param {number} height
     */
    function calculateRatio(width, height) {
        ratio = width / height;

        if (ratio > 1) imageSize[0] = ratio; // Portrait Image (Horizontal)
        else if (ratio < 1) imageSize[1] = 1 + (1 - ratio); // Landscape Image (Vertical)
    }

    /**
     * @param {boolean} isVisible
     */
    function SetVisibleCube(isVisible){

        if (frame != null){
            frame.visible = isVisible;
        }
    }

</script>


<div bind:this={container} class="w-full h-full"></div>
<!-- <button
    class="mx-2 mb-2 h-10 w-10 bg-cyan-950"
    on:click={() => {

        model5Value = "A" + model5Value;
    }}
>
</button> -->


<!-- <Toggle></Toggle> -->