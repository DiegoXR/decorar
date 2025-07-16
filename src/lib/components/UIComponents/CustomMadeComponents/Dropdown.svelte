<script>
  import { onMount } from "svelte";
  import { clickOutside } from "$lib/actions/clickOutside.js";
  import BaseButtonDropdown from "./BaseButtonDropdown.svelte";

  let dropdownOpen = false;
  let selectedText = "Image Size";

  /**
   * @type {number[][]}
   */
  export let availableSizes = [];

  /**
   * @type {number[]}
   */
  export let defaultSize;

  /**
   * @type {number[]}
   */
  export let selectedOption;

  /**
   * @type {number[]}
   */
  let selected;

  onMount(() => { 
    selectOptionInitial(defaultSize);
  });

  /**
   * @param {number[]} option
   * @param {MouseEvent} e
   */
  function selectOption(e, option) {
    selected = option;
    selectedOption = option;
    e.preventDefault();
    dropdownOpen = false;
    selectedText = formatDimensions(option);
  }

  /**
   * @param {number[]} option
   */
  function selectOptionInitial(option) {
    selected = option;
    selectedOption = option;
    dropdownOpen = false;
    selectedText = formatDimensions(option);
  }

  /**
   * @param {number[]} dimensions
   */
  function formatDimensions(dimensions) {
    if (dimensions == undefined)
      return `Undefined`;
    
    if (dimensions.length !== 2 || !dimensions.every(num => typeof num === 'number')) {
      throw new Error("Input must be an array of two numbers");
    }

    const firstDimension = (dimensions[0] * 100).toFixed(1);
    const secondDimension = (dimensions[1] * 100).toFixed(1);

    return `${firstDimension} cm X ${secondDimension} cm`;
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
    <div class="custom-dropdown-menu absolute z-10 w-full mt-1 bg-ui-background rounded-none shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div class="py-1 body-4 text-black px-4 pt-2">
        Width x Height
      </div>
      <div class="py-1">
        {#each availableSizes as option}
          <button 
            class="block w-full text-left px-4 py-2 text-black body-4"
            on:click={(e) => selectOption(e, option)}
          >
            {formatDimensions(option)}
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
