<script>
    import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
    import { onMount, onDestroy } from "svelte";
    import * as THREE from "three";
    import { sceneStore } from "../SceneStatusStore"; // Adjust the import path as necessary
    import "@google/model-viewer";
    import { browser} from '$app/environment';

    /**
     * @type {THREE.Scene}
     */
    let scene;

    let gltfIsReady = false;

       /**
     * @type {import("svelte/store").Unsubscriber}
     */
     let sceneUnsubscription;

    onMount(() => {
        // console.log("GLTF CReator will be mounted");
        sceneInscription();
        exportGLTF();
    });


    function sceneInscription(){
        sceneUnsubscription = sceneStore.subscribe((value) => {
        // console.log("AR received the scene");
        scene = value;
        });
        sceneUnsubscription();
    }
   

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
        
        if (scene == null) {
            // console.log("Scene is null");
            return;
        }

        // console.log("Exporting Gltf again");

        removeAmbientLights();

        // Instantiate a exporter
        const exporter = new GLTFExporter();

        // Ensure all textures are loaded and valid
        scene.traverse((object) => {
            if ( object instanceof THREE.Mesh && object.material) {
                let materials = object.material;
                if (!Array.isArray(materials)) {
                    materials = [materials];
                }
                materials.forEach((/** @type {{ map: { image: any; }; }} */ material) => {
                    if (material.map && !material.map.image) {
                        console.log(`Material map ${object.name} texture is not loaded: ${material.map}`);
                        throw new Error('Texture not loaded');
                    }
                });
            }
        });

        // Parse the input and generate the glTF output
        exporter.parse(
            scene,
            // called when the gltf has been generated
            function (gltf) {
                // console.log(gltf);
                storedGLTF = gltf;

                if (gltf instanceof ArrayBuffer) {
                    const blob = new Blob([gltf], {
                        type: "model/gltf-binary",
                    });
                    // Create URL without appending extension - use proper MIME type instead
                    const url = URL.createObjectURL(blob);
                    // Now you can use this URL with <model-viewer>
                    modelUrl = url;
                    gltfIsReady = true;
                    console.log('Model URL created:', modelUrl);

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
                console.log(error);
            },
            options,
        );
    }

    onDestroy(() => {
        storedGLTF = null;
        sceneUnsubscription();
    });

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

    function handleButtonClick() {
    if (browser && window.gtag) {
      window.gtag("event", "level_start", {
        level_name: "AR Session Started"
      });
    //   console.log('Custom event sent');
    
      window.gtag("event", "post_score", {     
      question: "3",
      answer: "AR_LAUNCHED"
    });
    
      }
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

{#if gltfIsReady}
<div class="h-[100vh] w-[100vw] modelViewerSpace">
    <model-viewer
    src={modelUrl}
    ar
    ar-placement="wall"
    camera-controls
    touch-action="pan-y"
    alt="A 3D model of some wall art"
    min-camera-orbit="-90deg 0deg auto"
    max-camera-orbit="90deg 180deg auto"
>
<button
slot="ar-button"
class="bg-[#FBFF2B] text-black hover:bg-[#FBFF2B] button-4 py-3 px-3 rounded-xl transition-colors absolute left-1/2 bottom-20 transform -translate-x-1/2"
on:click={handleButtonClick}
>
 Activate AR
</button>

</model-viewer>
</div>
{:else}
<div class="h-[100vh] w-[100vw] bg-white flex items-center justify-center">
    <h3 class="text-black header-3">Model not ready</h3>
</div>
{/if}

<style>

model-viewer {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .modelViewerSpace{
    background: linear-gradient(0deg, rgba(184,184,184,1) 10%, rgba(255,255,255,1) 100%);  
  }
  
</style>

