<script>
    import { onMount } from "svelte";
    
    /**
     * @type {number[]}
     */
    export let selectedOption;
    
    let isOpen = false;

    /**
     * @type {number[]}
     */
    let selected;
    /**
     * @type {number[][]}
     */
     export let availableSizes = [];

     /**
     * @type {number[]}
     */
     export let defaultSize;


    onMount(() => { 
      selectOption(defaultSize);
      console.log("Diego");
    });

    /**
     * @param {number[]} option
     */
    function selectOption(option) {
      selected = option;
      selectedOption = option;
      isOpen = false;
    }
  
     /**
     * @param {MouseEvent} event
     */
    function toggleDropdownMouse(event) {
      if (event.type === 'click') {
        isOpen = !isOpen;
      }
    }

    /**
     * @param {KeyboardEvent} event
     */
     function toggleDropdownKey(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        isOpen = !isOpen;
      }
    }
  </script>
  
  <div class="relative">
    <button 
      class="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring"
      on:click={toggleDropdownMouse}
      on:keydown={toggleDropdownKey}
    >
      {selected}
    </button>
    {#if isOpen}
      <div class="absolute right-0 w-48 mt-2 bg-white shadow-lg rounded-md z-10">
        <ul>
          {#each availableSizes as option}
            <button
              class="px-4 py-2 hover:bg-blue-100 cursor-pointer w-full text-left"
              on:click={() => selectOption(option)}
            >
              {option}
            </button>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
  