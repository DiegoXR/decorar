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
      // console.log("Mounting DropDown");
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
  
  <div class="relative">
    <button 
      class="px-4 py-2 bg-black text-white rounded-md focus:outline-none focus:ring"
      on:click={toggleDropdownMouse}
      on:keydown={toggleDropdownKey}
    >
      {formatDimensions(selected)}
    </button>
    {#if isOpen}
      <div class="absolute right-0  top-[-30px] w-48  bg-white shadow-lg rounded-md z-10">
        <ul>
          {#each availableSizes as option}
            <button
              class="px-4 py-2 hover:bg-blue-100 cursor-pointer w-full text-left"
              on:click={() => selectOption(option)}
            >
              {formatDimensions(option)}
            </button>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
  