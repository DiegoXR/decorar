<script>
    import { onMount, onDestroy } from "svelte";
    import SceneMaker from "$lib/components/SceneMaker.svelte";
    import SceneToGltf from "$lib/components/SceneToGltf.svelte";
    //import { sceneIsReady } from "../../../lib/ThreeJSstore";

    let isSceneMakerLoaded = false;

    // $: sceneIsReady.subscribe((value) => {
    //     isSceneMakerLoaded = value;
    //     console.log("GLAG COLOMBIA RECEIVED");
    // });

    //    /**
    //  * @type {import("svelte/store").Unsubscriber}
    //  */
    //  let sceneUnsubscription;

    // function sceneInscription(){
    //     sceneUnsubscription = sceneIsReady.subscribe((value) => {
    //     isSceneMakerLoaded = value;
    //     });
    // }
   
    // sceneInscription();
    onMount(() => {});

    onDestroy(() => {});
</script>

<SceneMaker></SceneMaker>
<div class="w-full h-[50vh] bg-green-300">
    {#if isSceneMakerLoaded}
    <p>SCENE TO GLTF</p>
    <SceneToGltf></SceneToGltf>
    {/if}
</div>
