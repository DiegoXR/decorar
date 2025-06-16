<script>
  import { onMount, onDestroy } from 'svelte';
  
  let width = 0;
  let height = 0;
  
  function updateDimensions() {
    width = window.innerWidth;
    height = window.innerHeight;
  }
  
  onMount(() => {
    // Initialize dimensions
    updateDimensions();
    
    // Add event listener for resize
    window.addEventListener('resize', updateDimensions);
    
    // Add event listener for orientation change (mobile devices)
    window.addEventListener('orientationchange', updateDimensions);
  });
  
  onDestroy(() => {
    // Clean up event listeners
    window.removeEventListener('resize', updateDimensions);
    window.removeEventListener('orientationchange', updateDimensions);
  });
</script>

<div class="screen-size-debugger h-auto w-full">
  <p class="text-sm font-mono bg-black/80 text-white px-2 py-1 rounded-md fixed bottom-2 right-2 z-50">
    Screen: {width}px × {height}px
  </p>
</div>

<style>
  .screen-size-debugger {
    pointer-events: none;
  }
</style>
