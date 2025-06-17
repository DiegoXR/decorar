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

  /**
   * @param {Event} event
   */
  function handleChange(event) {
    if (disabled) {
      event.preventDefault();
      return;
    }
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
      relative h-6 w-11 rounded-full border transition-colors duration-200 ease-in-out
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
        absolute top-0.5 h-5 w-5 rounded-full border border-gray-300 bg-white
        transition-all duration-200 ease-in-out
        {isChecked ? 'left-[calc(100%-22px)]' : 'left-[2px]'}
      "
    ></span>
  </div>
</label>
