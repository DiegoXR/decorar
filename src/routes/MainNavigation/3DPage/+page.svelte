<script>
    import { onMount, onDestroy } from "svelte";
    import SceneMaker from "$lib/components/SceneMaker.svelte";
    import SceneToGltf from "$lib/components/SceneToGltf.svelte";
    import { sceneIsReady } from "../../../lib/SceneStatusStore";

    let isSceneMakerLoaded = false;

    $: sceneIsReady.subscribe((value) => {
        isSceneMakerLoaded = value;
    });

    onMount(() => {});

    onDestroy(() => {});
</script>

<SceneMaker></SceneMaker>
<div class="w-full h-full bg-white">
    {#if isSceneMakerLoaded}
    <SceneToGltf></SceneToGltf>
    {/if}
</div>
