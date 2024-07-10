<script lang="js">
    import PageHeader from "$lib/components/UIComponents/PageHeader.svelte";
    import NavigationBar from "$lib/components/UIComponents/NavigationBar.svelte";
    import { onMount } from "svelte";
    import * as THREE from "three";
    import { rendererStore, sceneStore } from "../../lib/SceneStatusStore";
    import { get } from 'svelte/store';
    import { redirect } from '@sveltejs/kit';
    import {isMainPageVisited} from '../../lib/PageStatusStore'



    // @ts-ignore
    export async function load({ session }) {
    console.log('Load function executed in layout');
    const visited = get(isMainPageVisited);
    if (!visited) {
      throw redirect(307, '/');
    }
    return {};
  }

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
<!-- <div class="bg-red-700 w-full h-[10vh] bottom-0 fixed">hola</div>  -->
<div class="h-[100vh] w-full bg-white">           
    <!-- SPACER BEHIND THE HEADER  -->
   <div class="w-full h-[10vh] bg-slate-600">
   </div >
    <!-- SLOT FOR OTHER PAGES  -->
   <div class="w-full h-[80vh]">
    <slot />
   </div> 
   
</div> 

<NavigationBar></NavigationBar>
