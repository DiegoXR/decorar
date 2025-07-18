<script>
  import { onMount } from "svelte";
  import { clickOutside } from "$lib/actions/clickOutside.js";
  import BaseButtonDropdown from "./BaseButtonDropdown.svelte";

  let dropdownOpen = false;
  let selectedText = "Select Option";

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
   * @type {string}
   */
  let selected;

  onMount(() => { 
    selectOptionInitial(defaultOption);
  });

  /**
   * @param {string} option
   * @param {MouseEvent} e
   */
  function selectOption(e, option) {
    selected = option;
    selectedOption = option;
    e.preventDefault();
    dropdownOpen = false;
    selectedText = option;
  }

  /**
   * @param {string} option
   */
  function selectOptionInitial(option) {
    // If default option is not in available options, use the first option
    if (option && availableOptions.includes(option)) {
      selected = option;
      selectedOption = option;
    } else if (availableOptions.length > 0) {
      selected = availableOptions[0];
      selectedOption = availableOptions[0];
    }
    
    dropdownOpen = false;
    selectedText = selected || "Select Option";
  }

  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
  }

  function handleClickOutside() {
    dropdownOpen = false;
  }
</script>

<div class="custom-dropdown-container relative w-full max-w-[200px]" use:clickOutside on:outclick={handleClickOutside}>
  <BaseButtonDropdown
    variant="BaseGray"
    label="{selectedText}"
    isOpen={dropdownOpen}
    class="flex items-center justify-between w-full whitespace-nowrap"
    on:click={toggleDropdown}
  >
  </BaseButtonDropdown>
  
  {#if dropdownOpen}
    <div class="custom-dropdown-menu absolute z-10 w-full mt-1 bg-lightgray rounded-none shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div class="py-1">
        {#each availableOptions as option}
          <button 
            class="block w-full text-left px-4 py-2 text-black body-4"
            on:click={(e) => selectOption(e, option)}
          >
            {option}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .custom-dropdown-menu {
    max-height: 200px;
    overflow-y: auto;
    width: 100%;
  }
</style>
