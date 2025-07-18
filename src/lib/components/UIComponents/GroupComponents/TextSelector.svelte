<script>
  import { onMount, createEventDispatcher } from "svelte";
  import ArrowLeft from "$lib/components/IconComponents/ArrowLeft.svelte";
  import ArrowRight from "$lib/components/IconComponents/ArrowRight.svelte";
  import BaseIconButton from "$lib/components/UIComponents/CustomMadeComponents/BaseIconButton.svelte";
  
  const dispatch = createEventDispatcher();

  /**
   * @type {string[]}
   */
  export let availableOptions = [];

  /**
   * @type {string}
   */
  export let defaultOption;

  /**
   * @type {string}
   */
  export let selectedOption;

  /**
   * @type {boolean}
   */
  export let isActive = true;

  /**
   * @type {number}
   */
  let currentIndex = 0;

  /**
   * @type {string}
   */
  let displayValue = "";

  onMount(() => {
    initializeSelection();
  });

  function initializeSelection() {
    if (availableOptions.length === 0) return;
    
    // Find the index of the default option
    const index = availableOptions.indexOf(defaultOption);
    currentIndex = index !== -1 ? index : 0;
    
    // Set the selected option
    selectedOption = availableOptions[currentIndex];
    displayValue = selectedOption;
  }

  /**
   * @param {{ preventDefault: () => void; }} event
   */
  function previous(event) {
    event.preventDefault();
    if (!isActive) return;
    
    if (availableOptions.length === 0) return;
    
    // Move to previous option, wrap around to the end if at the beginning
    currentIndex = (currentIndex - 1 + availableOptions.length) % availableOptions.length;
    updateSelection();
  }

  /**
   * @param {{ preventDefault: () => void; }} event
   */
  function next(event) {
    event.preventDefault();
    if (!isActive) return;
    
    if (availableOptions.length === 0) return;
    
    // Move to next option, wrap around to the beginning if at the end
    currentIndex = (currentIndex + 1) % availableOptions.length;
    updateSelection();
  }

  function updateSelection() {
    selectedOption = availableOptions[currentIndex];
    displayValue = selectedOption;
    
    // Dispatch change event with the new selected option
    dispatch('change', selectedOption);
  }
</script>

<style>
  /* Prevent double-tap zoom on mobile devices */
  :global(.text-selector-button) {
    touch-action: manipulation;
  }
</style>

<div class="flex items-center justify-between w-full max-w-[200px]">
  <div class="relative flex items-center w-full">
    <!-- Previous button -->
    <BaseIconButton 
      on:click={previous}
      variant={isActive ? "BaseGray" : "BaseDisabled"}
      rounded="none"
      size="medium"
      disabled={!isActive}
      ariaLabel="Previous option"
      class="text-selector-button"
    >
      <ArrowLeft />
    </BaseIconButton>
    
    <!-- Text display field -->
    <div 
      class="body-3 h-10 bg-lightgray text-center text-black flex items-center justify-center w-full {isActive ? '' : 'opacity-50'}"
    >
      {displayValue}
    </div>
    
    <!-- Next button -->
    <BaseIconButton 
      on:click={next}
      variant={isActive ? "BaseGray" : "BaseDisabled"}
      rounded="none"
      size="medium"
      disabled={!isActive}
      ariaLabel="Next option"
      class="text-selector-button"
    >
      <ArrowRight />
    </BaseIconButton>
  </div>
</div>
