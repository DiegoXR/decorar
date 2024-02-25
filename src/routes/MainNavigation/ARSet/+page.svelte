<p>This is the Page AR Set</p>

<!-- <script>
    import { onMount } from 'svelte';
    import { sceneStore } from "../../../lib/customizeSceneStoreV4.js";
  
    /**
     * @type {HTMLDivElement}
     */
    let container; // This will be the DOM element to mount the Three.js renderer
  
    onMount(() => {
      sceneStore.initialize(); // Initialize or reset the scene as needed
  
      $sceneStore.renderer.setSize(container.offsetWidth, container.offsetHeight);
      container.appendChild($sceneStore.renderer.domElement);
  
      // Animation loop or rendering logic here
      function animate() {
        requestAnimationFrame(animate);
        $sceneStore.renderer.render($sceneStore.scene, $sceneStore.camera);
      }
  
      animate();
    });
  </script>
  
  <div bind:this={container}></div> -->
  
  