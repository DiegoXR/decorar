<script>
  import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
  import ChevronDownOutline from 'flowbite-svelte-icons/ChevronDownOutline.svelte';
  import { onMount } from "svelte";

  let dropdownOpen = false;
  let selectedText = "Image Size"; // Remove the reactive `$:` as it's not needed.

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
      // console.log("Mounting DropDown");
    });
  
  
  //   const selectOption = (/** @type {MouseEvent} */ e, /** @type {string} */ value) => {
  //   e.preventDefault(); // Prevent default behavior
  //   selectedText = value; // Update the button text with the selected value
  //   dropdownOpen = false; // Close the dropdown
  //   console.log(value);
  // };

  /**
     * @param {number[]} option
     * @param {MouseEvent} e
     */
     function selectOption(e, option) {
      selected = option;
      selectedOption = option;
      e.preventDefault(); // Prevent default behavior
      dropdownOpen = false; // Close the dropdown
      selectedText = formatDimensions(option);
    }

    /**
     * @param {number[]} option
     */
     function selectOptionInitial(option) {
      selected = option;
      selectedOption = option;
      dropdownOpen = false; // Close the dropdown
      selectedText = formatDimensions(option);
    }

    /**
     * @param {number[]} dimensions
     */
     function formatDimensions(dimensions){
      
      if (dimensions == undefined)
          return `Undefined`;
      
      if (dimensions.length !== 2 || !dimensions.every(num => typeof num === 'number')) {
        throw new Error("Input must be an array of two numbers");
    }

    const firstDimension = (dimensions[0] * 100).toFixed(1);
    const secondDimension = (dimensions[1] * 100).toFixed(1);

    return `${firstDimension} cm X ${secondDimension} cm`;
       
    }
</script>

<Button class="sizes" size="xs" color="dark">
  {selectedText}
  <ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white" />
</Button>
<Dropdown  bind:open={dropdownOpen}>
  <DropdownItem slot="header">Width x Height</DropdownItem>
  {#each availableSizes as option}
    <DropdownItem on:click={(e) => selectOption(e, option)}>{formatDimensions(option)}</DropdownItem>
  {/each}
</Dropdown>



