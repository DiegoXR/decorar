<script lang="ts">
    import { onMount } from 'svelte';
    import Separator from "./CustomMadeComponents/Separator.svelte";
    import ImageSizeControl from "./GroupComponents/ImageSizeControl.svelte";
    import FrameTypeControl from "./GroupComponents/FrameTypeControl.svelte";
    import FrameWidthControl from "./GroupComponents/FrameWidthControl.svelte";
    import FrameDepthControl from "./GroupComponents/FrameDepthControl.svelte";
    import FrameMaterialControl from "./GroupComponents/FrameMaterialControl.svelte";
    import FrameColorControl from "./GroupComponents/FrameColorControl.svelte";
    import PasspartoutTypeControl from "./GroupComponents/PasspartoutTypeControl.svelte";
    import PasspartoutSizeControl from "./GroupComponents/PasspartoutSizeControl.svelte";
    import Generate3DButton from "./GroupComponents/Generate3DButton.svelte";
    import ArrowLeft from "../IconComponents/ArrowLeft.svelte";
    import ArrowRight from "../IconComponents/ArrowRight.svelte";
    import { uiGroupSlideStore } from "../../PageConfigurationStore.js";
    
    // Carousel state - initialize from store to prevent flash
    let currentSlide = 0;
    const totalSlides = 3;
    
    // Initialize currentSlide from store immediately to prevent flash
    const unsubscribe = uiGroupSlideStore.subscribe(value => {
        currentSlide = value;
    });
    
    // Section titles
    const sectionTitles = ['Image', 'Frame', 'Passepartout'];
    
    // Clean up subscription on destroy
    onMount(() => {
        return unsubscribe;
    });
    
    // Navigation functions - now update both local state and store
    function nextSlide() {
        const newSlide = (currentSlide + 1) % totalSlides;
        currentSlide = newSlide;
        uiGroupSlideStore.set(newSlide);
    }
    
    function prevSlide() {
        const newSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        currentSlide = newSlide;
        uiGroupSlideStore.set(newSlide);
    }
    
    function goToSlide(index: number) {
        currentSlide = index;
        uiGroupSlideStore.set(index);
    }
</script>

<!-- Unified UI Group with carousel navigation -->
<div class="flex flex-col justify-center items-center gap-4 w-full max-w-md mx-auto bg-lightgray p-4 rounded-2xl">
  <!-- Section navigation -->
  <div class="flex justify-between items-center w-full mb-0">
    <button 
      class="p-2 rounded-full hover:bg-gray-200 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center" 
      on:click={prevSlide}
      aria-label="Previous section"
      style="touch-action: manipulation;"
    >
      <ArrowLeft />
    </button>
    
    <div class="text-center font-medium">
      {sectionTitles[currentSlide]}
    </div>
    
    <button 
      class="p-2 rounded-full hover:bg-gray-200 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center" 
      on:click={nextSlide}
      aria-label="Next section"
      style="touch-action: manipulation;"
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
        style="touch-action: manipulation;"
      ></button>
    {/each}
  </div>
  
  <!-- Carousel container -->
  <div class="relative w-full overflow-hidden min-h-[200px] portrait:max-sm:min-h-[100px]">
    <!-- Slide container with transform for sliding effect -->
    <div 
      class="flex transition-transform duration-300 ease-in-out w-full"
      style="transform: translateX(-{currentSlide * 100}%);"
    >
      <!-- Slide 1: Image Controls -->
      <div class="min-w-full flex-shrink-0 px-1 overflow-hidden">
        <div class="flex flex-col w-full gap-1">
          <!-- Row 1: Image Size -->
          <ImageSizeControl />
          
          <!-- Separator -->
          <Separator width="full" margin="my-0" />
        </div>
      </div>
      
      <!-- Slide 2: Frame Controls -->
      <div class="min-w-full flex-shrink-0 px-1 overflow-hidden">
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
          
          <!-- Frame Material Control -->
          <FrameMaterialControl />
          
          <!-- Separator -->
          <Separator width="full" margin="my-0" />
          
          <!-- Frame Color Control -->
          <FrameColorControl />
          
          <!-- Separator -->
          <Separator width="full" margin="my-0" />
        
        </div>
      </div>
      
      <!-- Slide 3: Passepartout Controls -->
      <div class="min-w-full flex-shrink-0 px-1 overflow-hidden">
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
    <!-- Generate 3D Button (moved outside carousel) -->
    <div class="w-full">
    <Generate3DButton />
    </div>

  </div>
  
  <!-- Generate 3D Button (moved outside carousel) -->
  <!-- <div class="w-full mt-2">
    <Generate3DButton />
  </div> -->
</div>

<style>
  /* Any additional styles if needed */
</style>


<!-- <div class="p-3 border border-gray-300 rounded-lg bg-white hover:border-blue-500 cursor-pointer">
  <div class="h-16 bg-gray-200 rounded mb-2"></div>
  <p class="text-sm font-medium">Classic Frame</p>
</div> -->