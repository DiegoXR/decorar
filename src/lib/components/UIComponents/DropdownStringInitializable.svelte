<script>
    import { onMount } from "svelte";
    
    /**
     * @type {string}
     */
    export let selectedOption;
    
    let isOpen = false;

    /**
     * @type {string}
     */
    let selected;
    /**
     * @type {string[]}
     */
     export let availableOptions = [];

     /**
     * @type {string}
     */
     export let defaultOption;


    onMount(() => { 
      selectOption(defaultOption);
      console.log("Mounting DropDown");
    });

    /**
     * @param {string} option
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
      class="px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring"
      on:click={toggleDropdownMouse}
      on:keydown={toggleDropdownKey}
    >
    {selectedOption}
    </button>
    {#if isOpen}
      <div class="absolute right-0  top-[-30px] w-48  bg-red shadow-lg rounded-md z-10">
        <ul>
          {#each availableOptions as option}
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
  