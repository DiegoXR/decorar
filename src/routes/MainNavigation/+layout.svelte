<script lang="js">
    import PageHeader from "$lib/components/UIComponents/PageHeader.svelte";
    import NavigationBar from "$lib/components/UIComponents/NavigationBar.svelte";
    import { onMount } from "svelte";
    import * as THREE from "three";
    import { rendererStore, sceneStore } from "../../lib/SceneStatusStore";
    import { get } from 'svelte/store';
    import { redirect } from '@sveltejs/kit';
    import {isMainPageVisited} from '../../lib/PageStatusStore';
    import {GA4_ID} from "../../projectConstants.js"
    import GoogleAnalytics from "$lib/components/Analytics/GoogleAnalytics.svelte";



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
        
      // // Add Google Analytics script
      // const script = document.createElement('script');
      //   script.async = true;
      //   script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
      //   document.head.appendChild(script);

      //   // Initialize Google Analytics
      //   window.dataLayer = window.dataLayer || [];
      //   function gtag() {
      //       window.dataLayer.push(arguments);
      //   }
      //   gtag('js', new Date());
      //   gtag('config', `${GA4_ID}`);
        
      //   console.log("Layout Mounted");
      
      
      // Update the store with the renderer instance
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        rendererStore.set(renderer);


        // Update the store with the scene instance
        const scene = new THREE.Scene();
        sceneStore.set(scene); 
    });
</script>

<GoogleAnalytics></GoogleAnalytics>
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
