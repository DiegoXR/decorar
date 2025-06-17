<script>
    import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
    import ChevronDownOutline from 'flowbite-svelte-icons/ChevronDownOutline.svelte';
    import { onMount } from "svelte";
  
    let dropdownOpen = false;
    let selectedText = "Size"; // Default text for the dropdown
  
    /**
     * @type {string[]}
     */
    export let availableOptions = []; // Array of strings instead of numbers
  
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
      e.preventDefault(); // Prevent default behavior
      dropdownOpen = false; // Close the dropdown
      selectedText = option;
    }
  
    /**
     * @param {string} option
     */
    function selectOptionInitial(option) {
      selected = option;
      selectedOption = option;
      dropdownOpen = false; // Close the dropdown
      selectedText = option;
    }
  </script>
  
  <Button disabled={!isActive}  class="sizes" size="xs" color="dark">
    {selectedText}
    <ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white" />
  </Button>
  <Dropdown  bind:open={dropdownOpen}>
    <DropdownItem slot="header">Select Option</DropdownItem>
    {#each availableOptions as option}
      <DropdownItem  on:click={(e) => selectOption(e, option)}>{option}</DropdownItem>
    {/each}
  </Dropdown>
  