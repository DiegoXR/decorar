<script>
    import { onMount } from "svelte";
    let counter = 3; // Default value for the counter
    const min = 1;   // Minimum value for the counter
    const max = 20;   // Maximum value for the counter


    /**
     * @type {number}
     */
     export let selectedOption;

     /**
     * @type {number}
     */
     export let defaultValue;

    /**
     * @type {HTMLInputElement}
     */
     let inputElement;

     /**
     * @type {number}
     */
     let selectedManualOption;

     onMount(() => { 
      inputElement.addEventListener('change', numberChanged);
      selectedOption = defaultValue;
      counter = selectedOption;
    });

    /**
   * @param {{ preventDefault: () => void; }} event
   */
    function increment(event) {
        event.preventDefault(); // Prevent Safari zoom behavior
        if (counter < max){
            counter++;
            selectedOption = counter;
        } 
    }

    /**
   * @param {{ preventDefault: () => void; }} event
   */
    function decrement(event) {
        event.preventDefault(); // Prevent Safari zoom behavior
        if (counter > min) {
            counter--;
            selectedOption = counter;
        }
        
    }

    function numberChanged() {
      // Convert from String to Number  
           
      selectedManualOption = parseInt(inputElement.value, 10);

      if (selectedManualOption >= min || selectedManualOption <= max){
        selectedOption = selectedManualOption;
        counter = selectedOption;
      }
    }

</script>

<style>
    button {
        touch-action: manipulation; /* Prevents Safari zooming */
    }
</style>

<form class="max-w-xs">
    <div class="relative flex items-center max-w-[11rem]">
        <button
            type="button"
            on:click={decrement}
            class="bg-gray-800  border-gray-300 rounded-s-lg p-3 h-10"
        >
            <svg
                class="w-3 h-3 dark:text-gray-900 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
            >
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
            </svg>
        </button>
        <input
            type="number"
            id="bedrooms-input"
            class="bg-gray-50 border-x-0 border-gray-300 h-10 font-medium text-center text-gray-900 text-sm  block w-full pb-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={counter}
            step="1"
            bind:this={inputElement}
        />
        <div class="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
            <!-- <svg class="w-2.5 h-2.5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"/>
            </svg> -->
            <span>cm</span>
        </div>
        <button
            type="button"
            on:click={increment}
            class=" bg-gray-800  border-gray-300 rounded-e-lg p-3 h-10"
        >
            <svg
                class="w-3 h-3 dark:text-gray-900 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
            >
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
            </svg>
        </button>
    </div>
</form>
