<script>
  import ArrowDown from "$lib/components/IconComponents/ArrowDown.svelte";
  import ArrowUp from "$lib/components/IconComponents/ArrowUp.svelte";
  
  export let label = 'Button';
  export let variant = 'BasePrimary'; // BasePrimary, BaseSecondary, BaseHighlighted, BaseDisabled
  export let disabled = false;
  export let isOpen = false;

  let baseClasses = 'py-3 px-3 rounded-none transition-colors w-full sm:w-auto';
  let variantClasses = '';

  $: {
    disabled = variant === 'BaseDisabled' ? true : disabled;
    switch (variant) {
      case 'BasePrimary':
        variantClasses = 'bg-black text-white hover:bg-gray-800';
        break;
      case 'BaseSecondary':
        variantClasses = 'bg-white text-black border-none';
        break;
      case 'BaseHighlighted': // Example: Yellow button, similar to the original form button
        variantClasses = 'bg-[#FBFF2B] text-black hover:bg-[#FBFF2B]';
        break;
      case 'BaseDisabled':
        variantClasses = 'bg-gray-300 text-gray-500 cursor-not-allowed';
        break;
      default:
        variantClasses = 'bg-black text-white hover:bg-gray-800'; // Default to primary
    }
    if (disabled && variant !== 'BaseDisabled') {
        variantClasses = 'bg-gray-300 text-gray-500 cursor-not-allowed';
    }
  }
</script>

<button 
  class="{baseClasses} {variantClasses} {$$props.class || ''}" 
  {disabled}
  on:click
>
  <div class="flex items-center justify-between w-full">
    <span>{label}</span>
    <div class="ml-2">
      {#if isOpen}
        <ArrowUp/>
      {:else}
        <ArrowDown/>
      {/if}
    </div>
  </div>
  <slot></slot>
</button>
