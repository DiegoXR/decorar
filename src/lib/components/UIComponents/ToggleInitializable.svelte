<script>
    import {onMount} from "svelte";
  
    // Output value
    export let isChecked = true;

     /**
     * @type {boolean}
     */
    export let initialStatus;
  
    onMount(() => {     
        isChecked = initialStatus;
        console.log(`Initial Status of the toogle is: ${isChecked}`);
    });
  
    // This function is called when the value isChecked changes.
    $: if (isChecked) {

    }
  </script>
  
  <label>
    <input type="checkbox" bind:checked={isChecked} />
    Enable Frame
  </label>
  
  <!-- {#if isChecked}
    <p>Hello</p>
  {/if} -->
  