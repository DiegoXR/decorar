<script lang="js">
    import PageHeader from "$lib/components/PageHeader.svelte";
    import NavigationBar from "$lib/components/NavigationBar.svelte";


    // This is the renderer part
    import { onMount } from "svelte";
    import * as THREE from "three";
    import { rendererStore } from "../../lib/customizeSceneStoreV5";

    onMount(() => {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        // Update the store with the renderer instance
        rendererStore.set(renderer);
    });
</script>

<PageHeader></PageHeader>
<NavigationBar></NavigationBar>
<div class="w-max h-[15vh]"></div>
<slot />
<!-- Here is where the content of your pages will be injected -->
