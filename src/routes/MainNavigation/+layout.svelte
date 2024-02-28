<script lang="js">
    import PageHeader from "$lib/components/PageHeader.svelte";
    import NavigationBar from "$lib/components/NavigationBar.svelte";
    import { page } from "$app/stores";
    import { Canvas } from "@threlte/core";
    import Scene2 from "$lib/components/scene2.svelte";
    import Model5 from "$lib/components/Model5.svelte";

    // Esto almaceza el renderer dentro del store en la version three.js
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



<!-- If you uncomment this, the Threlte version will be enabled -->
<!-- {#if $page.url.pathname === "/MainNavigation/Customize"}
    <div class="bg-red-100 w-full h-[50vh]">
        <div>This is only visible in the customize written by the layout</div>
        <Canvas>
            <Scene2></Scene2>
        </Canvas>
    </div>
{/if} -->

<!-- If you uncomment this, the Three Js version will be enabled -->
{#if $page.url.pathname === "/MainNavigation/Customize"}
    <div class="bg-red-100 w-full h-[50vh]">
        <div>This is only visible in the customize written by the layout</div>
         <Model5></Model5> 
    </div>
{/if} 

<slot />
<!-- Here is where the content of your pages will be injected -->
