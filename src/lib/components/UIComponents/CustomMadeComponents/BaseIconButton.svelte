<script>
  import { createEventDispatcher } from 'svelte';
  
  // Create a dispatcher to forward click events
  const dispatch = createEventDispatcher();
  
  // Props
  export let variant = 'BasePrimary'; // BasePrimary, BaseSecondary, BaseHighlighted, BaseDisabled
  export let disabled = false;
  export let rounded = 'all'; // all, left, right, none
  export let size = 'medium'; // small, medium, large
  export let ariaLabel = ''; // Accessibility label

  // Base classes
  let baseClasses = 'flex items-center justify-center transition-colors';
  let variantClasses = '';
  let roundedClasses = '';
  let sizeClasses = '';

  // Reactive statements to determine classes based on props
  $: {
    disabled = variant === 'BaseDisabled' ? true : disabled;
    
    // Set variant classes
    switch (variant) {
      case 'BasePrimary':
        variantClasses = 'bg-ui-background text-black hover:bg-gray-700';
        break;
      case 'BaseSecondary':
        variantClasses = 'bg-white text-black border-none hover:bg-gray-100';
        break;
      case 'BaseHighlighted':
        variantClasses = 'bg-[#FBFF2B] text-black hover:bg-[#FBFF2B]';
        break;
      case 'BaseDisabled':
        variantClasses = 'bg-gray-300 text-gray-500 cursor-not-allowed';
        break;
      case 'BaseGray':
        variantClasses = 'bg-ui-background text-black';
        break;
      default:
        variantClasses = 'bg-gray-800 text-white hover:bg-gray-700'; // Default to primary
    }
    
    // Override classes if disabled
    if (disabled && variant !== 'BaseDisabled') {
      variantClasses = 'bg-gray-300 text-gray-500 cursor-not-allowed';
    }
    
    // Set rounded classes
    switch (rounded) {
      case 'all':
        roundedClasses = 'rounded-lg';
        break;
      case 'left':
        roundedClasses = 'rounded-l-lg';
        break;
      case 'right':
        roundedClasses = 'rounded-r-lg';
        break;
      case 'none':
        roundedClasses = '';
        break;
      default:
        roundedClasses = 'rounded-lg';
    }
    
    // Set size classes
    switch (size) {
      case 'small':
        sizeClasses = 'p-1 h-8 w-8';
        break;
      case 'medium':
        sizeClasses = 'p-2 h-10 w-10';
        break;
      case 'large':
        sizeClasses = 'p-3 h-12 w-12';
        break;
      default:
        sizeClasses = 'p-2 h-10 w-10'; // Default to medium
    }
  }
  
  // Handle click event
  /**
   * @param {MouseEvent} event - The click event
   */
  function handleClick(event) {
    if (!disabled) {
      dispatch('click', event);
    }
  }
</script>

<style>
  /* Prevent double-tap zoom on mobile devices regardless of button state */
  button {
    touch-action: manipulation;
  }
</style>

<button 
  type="button"
  class="{baseClasses} {variantClasses} {roundedClasses} {sizeClasses} {$$props.class || ''}" 
  {disabled}
  on:click={handleClick}
  aria-label={ariaLabel}
>
  <slot />
</button>
