<script lang="js">
    import PageHeader from "$lib/components/UIComponents/PageHeader.svelte";
    import NavigationBar from "$lib/components/UIComponents/NavigationBar.svelte";
    import { onMount } from "svelte";
    import * as THREE from "three";
    import { rendererStore, sceneStore } from "../../lib/SceneStatusStore";

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

 <div class="h-[100vh] w-full bg-black">         
   
   <div class="w-full h-[20vh] bg-slate-600">
   </div >
        
   <div class="w-full h-[80vh]">
    <slot />
   </div>
   
</div> 


<!-- Here is where the content of your pages will be injected -->
<!-- <div class="w-max h-[15vh]"></div> -->

<!-- flex-none basis-[50%] flex-shrink-0 -->