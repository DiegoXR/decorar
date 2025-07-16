<script lang="ts">
    import { onMount } from 'svelte';
    import Separator from "./CustomMadeComponents/Separator.svelte";
    import ImageSizeControl from "./GroupComponents/ImageSizeControl.svelte";
    import FrameTypeControl from "./GroupComponents/FrameTypeControl.svelte";
    import FrameWidthControl from "./GroupComponents/FrameWidthControl.svelte";
    import FrameDepthControl from "./GroupComponents/FrameDepthControl.svelte";
    import PasspartoutControl from "./GroupComponents/PasspartoutControl.svelte";
    import Generate3DButton from "./GroupComponents/Generate3DButton.svelte";
    
    // Carousel state
    let currentSlide = 0;
    const totalSlides = 3;
    
    // Section titles
    const sectionTitles = ['Image', 'Frame', 'Passepartout'];
    
    // Navigation functions
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    }
    
    function goToSlide(index: number) {
        currentSlide = index;
    }
</script>

<!-- Unified UI Group with carousel navigation -->
<div class="flex flex-col justify-center items-center gap-4 w-full max-w-md mx-auto bg-ui-background p-4 rounded-2xl">
  <!-- Section navigation -->
  <div class="flex justify-between items-center w-full mb-0">
    <button 
      class="p-2 rounded-full hover:bg-gray-200 transition-colors" 
      on:click={prevSlide}
      aria-label="Previous section"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    </button>
    
    <div class="text-center font-medium">
      {sectionTitles[currentSlide]}
    </div>
    
    <button 
      class="p-2 rounded-full hover:bg-gray-200 transition-colors" 
      on:click={nextSlide}
      aria-label="Next section"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
  
  <!-- Indicator dots -->
  <div class="flex justify-center gap-2 mb-0">
    {#each Array(totalSlides) as _, i}
      <button 
        class="w-2 h-2 rounded-full transition-colors {currentSlide === i ? 'bg-blue-500' : 'bg-gray-300'}"
        on:click={() => goToSlide(i)}
        aria-label="Go to section {i+1}"
      ></button>
    {/each}
  </div>
  
  <!-- Carousel container -->
  <div class="relative w-full overflow-hidden" style="min-height: 350px;">
    <!-- Slide container with transform for sliding effect -->
    <div 
      class="flex transition-transform duration-300 ease-in-out w-full"
      style="transform: translateX(-{currentSlide * 100}%);"
    >
      <!-- Slide 1: Image Controls -->
      <div class="min-w-full flex-shrink-0 px-1 overflow-hidden" style="min-height: 350px;">
        <div class="flex flex-col w-full gap-1">
          <!-- Row 1: Image Size -->
          <ImageSizeControl />
          
          <!-- Separator -->
          <Separator width="full" margin="my-0" />
        </div>
      </div>
      
      <!-- Slide 2: Frame Controls -->
      <div class="min-w-full flex-shrink-0 px-1 overflow-hidden" style="min-height: 350px;">
        <div class="flex flex-col w-full gap-1">
          <!-- Frame Type Control -->
          <FrameTypeControl />
          
          <!-- Separator -->
          <Separator width="full" margin="my-0" />
          
          <!-- Frame Width Control -->
          <FrameWidthControl />
          
          <!-- Separator -->
          <Separator width="full" margin="my-0" />
          
          <!-- Frame Depth Control -->
          <FrameDepthControl />
          
          <!-- Separator -->
          <Separator width="full" margin="my-0" />
        
        </div>
      </div>
      
      <!-- Slide 3: Passepartout Controls -->
      <div class="min-w-full flex-shrink-0 px-1 overflow-hidden" style="min-height: 350px;">
        <div class="flex flex-col w-full gap-4">
          <!-- Passepartout Control -->
          <PasspartoutControl />
          
          <!-- Separator -->
          <Separator width="full" margin="my-0" />
        
        </div>
      </div>
    </div>
  </div>
  
  <!-- Generate 3D Button (moved outside carousel) -->
  <div class="w-full mt-4">
    <Generate3DButton />
  </div>
</div>

<style>
  /* Add any additional styles here if needed */
</style>


<!-- <div class="p-3 border border-gray-300 rounded-lg bg-white hover:border-blue-500 cursor-pointer">
  <div class="h-16 bg-gray-200 rounded mb-2"></div>
  <p class="text-sm font-medium">Classic Frame</p>
</div> -->