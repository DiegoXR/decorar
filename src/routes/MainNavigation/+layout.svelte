<script lang="js">
    import PageHeader from "$lib/components/PageHeader.svelte";
    import NavigationBar from "$lib/components/NavigationBar.svelte";
    import { onMount } from "svelte";
    import * as THREE from "three";
    import { rendererStore, sceneStore } from "../../lib/threeJSstore";

    onMount(() => {
        
        // Update the store with the renderer instance
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        rendererStore.set(renderer);


        // Update the store with the scene instance
        const scene = new THREE.Scene();
        sceneStore.set(scene); 
    });

</script>

<PageHeader></PageHeader>
<NavigationBar></NavigationBar>
<div class="w-max h-[15vh]"></div>

<!-- If you uncomment this, the Three Js version will be enabled -->

<slot />
<!-- Here is where the content of your pages will be injected -->
