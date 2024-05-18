<script>
    import {onMount} from "svelte";
  
    // Output value
    export let isChecked = true;

     /**
     * @type {boolean}
     */
    export let initialStatus;
  
    onMount(() => {
      
        console.log(`***TOGGLE INIT value applied ${initialStatus}`);
        isChecked = initialStatus;
        console.log("Mounting Toggle Initializable");
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
  