<script>
    import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
    import { onMount, onDestroy } from "svelte";
    import * as THREE from "three";
    import { currentSelectedImageStore } from "../../CurrentSelectedImageStore.js";
    import { rendererStore } from "../../../lib/ThreeJSstore.js"; // Adjust the import path as necessary
    import "@google/model-viewer";
    

    /**
     * @type {HTMLDivElement}
     */
    let container;
    /**
     * @type {THREE.Object3D<THREE.Object3DEventMap>}
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

    // Get the renderer from the Store
    $: renderer = $rendererStore;


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

    onMount(() => {
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

        const geometry = new THREE.PlaneGeometry(1, 1);

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


    let unsubscribe = currentSelectedImageStore.subscribe((value) => {
        dataObject = value;
    });

    /**
     * @type {ArrayBuffer | { [key: string]: any; } | null}
     */
    let storedGLTF = null; // Variable para almacenar el GLTF
    let modelUrl = ''; // Reactive variable to hold the model URL

    // Specify export options
    const options = {
        binary: true, // This specifies that the output should be in GLB format
    };

    function exportGLTF() {
        // Instantiate a exporter
        const exporter = new GLTFExporter();

        // Parse the input and generate the glTF output
        exporter.parse(
            scene,
            // called when the gltf has been generated
            function (gltf) {
                console.log(gltf);
                storedGLTF = gltf;
                
                if (gltf instanceof ArrayBuffer) {

                const blob = new Blob([gltf], { type: 'model/gltf-binary' });
                const url = URL.createObjectURL(blob);
                 // Now you can use this URL with <model-viewer>
                modelUrl = url; // Assuming `modelUrl` is a reactive variable in Svelte

                // Example: Download the file
                // const link = document.createElement('a');
                // link.href = url;
                // link.download = 'scene.glb';
                // document.body.appendChild(link);
                // link.click();
                // document.body.removeChild(link);
                } 
                
            },
            // called when there is an error in the generation
            function (error) {
                console.log("An error happened");
            },
            options,
        );
    }

    onDestroy(() => {
        storedGLTF = null;
    });

    onDestroy(unsubscribe);
</script>

<div bind:this={container} class="w-full h-full"></div>

<button
    class="mx-2 mb-2 h-10 w-10 bg-cyan-950"
    on:click={() => {
        console.log("Export button has been pressed");
        exportGLTF();
    }}
>
</button>

<model-viewer
    src= {modelUrl}
    ar
    ar-placement="wall"
    camera-controls
    touch-action="pan-y"
    alt="A 3D model of some wall art"
>
    <button
        slot="ar-button"
        class="h-100 w-100 bg bg-blue-600 position: static bottom-0 left-0"
    >
        👋 Activate AR
    </button>

</model-viewer>
