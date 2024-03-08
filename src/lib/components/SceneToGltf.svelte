<script>
    import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
    import { onMount, onDestroy } from "svelte";
    import * as THREE from "three";
    import { sceneStore } from "../threeJSstore.js"; // Adjust the import path as necessary
    import "@google/model-viewer";

    /**
     * @type {THREE.Scene}
     */
    let scene;

    onMount(() => {
        console.log("AR Mounted");
        exportGLTF();
    });

    let unsubscribe = sceneStore.subscribe((value) => {
        console.log("AR received the scene");
        scene = value;
    });

    /**
     * @type {ArrayBuffer | { [key: string]: any; } | null}
     */
    let storedGLTF = null; // Variable para almacenar el GLTF
    let modelUrl = ""; // Reactive variable to hold the model URL

    // Specify export options
    const options = {
        binary: true, // This specifies that the output should be in GLB format
    };

    function exportGLTF() {
        if (scene == null) return;

        removeAmbientLights();

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
                    const blob = new Blob([gltf], {
                        type: "model/gltf-binary",
                    });
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

    function removeAmbientLights() {
        /**
         * @type {THREE.AmbientLight[]}
         */
        const lightsToRemove = [];

        // Traverse the entire scene graph
        scene.traverse((object) => {
            if (object instanceof THREE.AmbientLight) {
                lightsToRemove.push(object);
            }
        });

        lightsToRemove.forEach((light) => scene.remove(light));
    }
</script>

<!-- <button
    class="mx-2 mb-2 h-10 w-10 bg-cyan-950"
    on:click={() => {
        console.log("Export button has been pressed");
        exportGLTF();
    }}
>
</button> -->

<model-viewer
    src={modelUrl}
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
