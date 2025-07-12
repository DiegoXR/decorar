<script>
  import { onMount } from "svelte";

  /**
   * @type {boolean}
   */
  export let initialStatus;

  /**
   * @type {boolean}
   */
  export let isChecked = true;

  /**
   * @type {string}
   */
  export let id;

  /**
   * @type {string}
   */
  export let variant = "primary"; // primary or disabled

  /**
   * @type {boolean}
   */
  export let disabled = false;

  onMount(() => {
    isChecked = initialStatus;
  });

  $: {
    disabled = variant === "disabled";
  }

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  /**
   * @param {Event} event
   */
  function handleChange(event) {
    if (disabled) {
      event.preventDefault();
      return;
    }
    // Dispatch the change event with the current value
    dispatch('change', isChecked);
  }
</script>

<label class="relative inline-flex cursor-pointer items-center">
  <input 
    id={id} 
    type="checkbox" 
    class="sr-only" 
    bind:checked={isChecked} 
    on:change={handleChange}
    {disabled}
  />
  <label for={id} class="hidden"></label>
  <div 
    class="
      relative h-6 w-11 rounded-full border transition-colors duration-250 ease-linear flex items-center
      {isChecked 
        ? variant === 'disabled' 
          ? 'bg-gray-400' 
          : 'bg-black' 
        : 'bg-slate-200'}
      {disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
    "
  >
    <span 
      class="
        absolute left-[2px] h-5 w-5 rounded-full border border-gray-300 bg-white
        transition-transform duration-250 ease-linear will-change-transform
        {isChecked ? 'translate-x-[19px]' : 'translate-x-0'}
      "
    ></span>
  </div>
</label>
