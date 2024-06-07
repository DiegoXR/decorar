<script>
    import { onMount } from "svelte";
    
    /**
     * @type {number}
     */
    export let selectedOption;
    
    // export let isVisible = true;

     /**
     * @type {string}
     */
     export let defaultValue;

     /**
     * @type {HTMLInputElement}
     */
     let inputElement;

    onMount(() => { 
      inputElement.addEventListener('change', numberChanged);
    });
    
    function numberChanged() {
        selectedOption = parseInt(inputElement.value, 10); 
    }
       
  </script>
  
  <input bind:this={inputElement}  type="number" id="selector" name="quantity" min="1" max="10" step="1" value={defaultValue}>

  

  