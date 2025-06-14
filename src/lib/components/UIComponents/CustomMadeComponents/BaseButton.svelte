<script>
  export let label = 'Button';
  export let variant = 'BasePrimary'; // BasePrimary, BaseSecondary, BaseHighlighted, BaseDisabled
  export let disabled = false;

  let baseClasses = 'py-3 px-3 rounded-xl transition-colors w-full sm:w-auto';
  let variantClasses = '';

  $: {
    disabled = variant === 'BaseDisabled' ? true : disabled;
    switch (variant) {
      case 'BasePrimary':
        variantClasses = 'bg-black text-white hover:bg-gray-800';
        break;
      case 'BaseSecondary':
        variantClasses = 'bg-white text-black border border-gray-300 hover:bg-gray-100';
        break;
      case 'BaseHighlighted': // Example: Yellow button, similar to the original form button
        variantClasses = 'bg-yellow-400 text-black hover:bg-yellow-500';
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
  {label}
</button>
