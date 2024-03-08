<script>
    import { onMount, onDestroy } from "svelte";
    import * as THREE from "three";
    import { selectedImageObject } from "../../stores.js";
    import { rendererStore, sceneStore } from "../threeJSstore.js"; // Adjust the import path as necessary

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


    let dataObject = {
        width: 1,
        height: 1,
        src: "",
        description: "",
        alt: "",
    };

    let ratio = null;

    let imageSize = [1, 1];


    export let model5Value = 'hey Iam the scene model 5';

    // Get the renderer from the Store
    $: renderer = $rendererStore;

    onMount(() => {       
        console.log("Mounting Model5");
        scene = new THREE.Scene();      
        camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            10,
        );

        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x808080); // El código de color hexadecimal para gris

        container.appendChild(renderer.domElement);

        const textureLoader = new THREE.TextureLoader();

        const planeTexture = textureLoader.load(dataObject.src);

        const geometry = new THREE.PlaneGeometry(imageSize[0], imageSize[1]);

        const material = new THREE.MeshPhysicalMaterial({
            map: planeTexture,
            side: THREE.FrontSide,
        });

        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        // Agregar luz ambiental
        const ambientLight = new THREE.AmbientLight(0xffffff, 3); // color blanco, intensidad 0.5
        scene.add(ambientLight);

        camera.position.z = 1.5;

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

    /**
     * @param {number} width
     * @param {number} height
     */
    function calculateRatio(width, height) {
        ratio = width / height;

        if (ratio > 1) imageSize[0] = ratio; // Portrait Image (Horizontal)
        else if (ratio < 1) imageSize[1] = 1 + (1 - ratio); // Landscape Image (Vertical)
    }

</script>


<div bind:this={container} class="w-full h-full"></div>
<button
    class="mx-2 mb-2 h-10 w-10 bg-cyan-950"
    on:click={() => {

        model5Value = "A" + model5Value;
    }}
>
</button>
