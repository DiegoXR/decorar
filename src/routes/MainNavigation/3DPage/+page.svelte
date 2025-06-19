<script>
    import { onMount, onDestroy } from "svelte";
    import SceneMaker from "$lib/components/SceneMaker.svelte";
    import SceneToGltf from "$lib/components/SceneToGltf.svelte";
    import { sceneIsReady } from "../../../lib/SceneStatusStore";
    import { frameConfigurationStore } from "$lib/FrameConfigurationStore.js";

    let isSceneMakerLoaded = false;
    let enable3DGeneration =  true;

     /**
     * @type {import("svelte/store").Unsubscriber}
     */
     let currentFrameSubscription;

    $: sceneIsReady.subscribe((value) => {
        isSceneMakerLoaded = value;
    });

    FrameConfigurationSubscription();
    onMount(() => {});
    onDestroy(() => { if (currentFrameSubscription) currentFrameSubscription(); });

     
    function FrameConfigurationSubscription() {
        currentFrameSubscription = frameConfigurationStore.subscribe(
            (value) => {
                if (value.ImageSrc === ""){                  
                    // If the Image source is empty this means that the page has been refreshed 
                    enable3DGeneration = false;                     
                }else{
                    enable3DGeneration = true; 
                }
            },
        );
    }

</script>
{#if enable3DGeneration}
    <SceneMaker></SceneMaker>
    <div class="w-full h-full bg-red-500">
    {#if isSceneMakerLoaded}
    <SceneToGltf></SceneToGltf>
    {/if} 
    </div>
{:else}
<div class=" w-full h-full flex justify-center items-center p-5">
    <p class="text-gray-800">Unable to create 3D model. Please go back to Explore section</p>
</div>
{/if} 


