<script lang="ts">
    import { onMount } from 'svelte';
    import Separator from "./CustomMadeComponents/Separator.svelte";
    import ImageSizeControl from "./GroupComponents/ImageSizeControl.svelte";
    import FrameTypeControl from "./GroupComponents/FrameTypeControl.svelte";
    import FrameWidthControl from "./GroupComponents/FrameWidthControl.svelte";
    import FrameDepthControl from "./GroupComponents/FrameDepthControl.svelte";
    import PasspartoutTypeControl from "./GroupComponents/PasspartoutTypeControl.svelte";
    import PasspartoutSizeControl from "./GroupComponents/PasspartoutSizeControl.svelte";
    import Generate3DButton from "./GroupComponents/Generate3DButton.svelte";
    import ArrowLeft from "../IconComponents/ArrowLeft.svelte";
    import ArrowRight from "../IconComponents/ArrowRight.svelte";
    
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
<div class="flex flex-col justify-center items-center gap-4 w-full max-w-md mx-auto bg-lightgray p-4 rounded-2xl">
  <!-- Section navigation -->
  <div class="flex justify-between items-center w-full mb-0">
    <button 
      class="p-2 rounded-full hover:bg-gray-200 transition-colors" 
      on:click={prevSlide}
      aria-label="Previous section"
    >
      <ArrowLeft />
    </button>
    
    <div class="text-center font-medium">
      {sectionTitles[currentSlide]}
    </div>
    
    <button 
      class="p-2 rounded-full hover:bg-gray-200 transition-colors" 
      on:click={nextSlide}
      aria-label="Next section"
    >
      <ArrowRight />
    </button>
  </div>
  
  <!-- Indicator dots -->
  <div class="flex justify-center gap-2 mb-0">
    {#each Array(totalSlides) as _, i}
      <button 
        class="w-2 h-2 rounded-full transition-colors {currentSlide === i ? 'bg-highlight' : 'bg-darkgray'}"
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
          <!-- Passepartout Type Control -->
          <PasspartoutTypeControl />
          
          <!-- Passepartout Size Control -->
          <PasspartoutSizeControl />
          
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