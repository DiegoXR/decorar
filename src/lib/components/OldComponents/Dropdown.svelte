<script>
    import { onMount } from "svelte";
    
    export let selectedOption;
    let isOpen = false;
    let selected = 'Select an option';
    // const options = ['23 x 20', '30 x 41', '38 x 51', '46 x 61' ];
    // const options = ['23 x 20', '30 x 41', '38 x 51', '46 x 61' ];
    const options = ['0.2 x 0.2','0.25 x 0.25','0.5 x 0.5','1 x 1','1.5 x 1.5'];
  
    onMount(() => { 
      selectOption(options[0]);
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
      class="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring"
      on:click={toggleDropdownMouse}
      on:keydown={toggleDropdownKey}
    >
      {selected}
    </button>
    {#if isOpen}
      <div class="absolute right-0 w-48 mt-2 bg-white shadow-lg rounded-md z-10">
        <ul>
          {#each options as option}
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
  