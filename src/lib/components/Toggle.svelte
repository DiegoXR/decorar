<script>
  import {onMount} from "svelte";

  export let isChecked = true;

  onMount(() => {
    isChecked = true;
  });

  // Esta función se llama cada vez que cambia el valor de isChecked
  $: if (isChecked) {
    //console.log('El toggle está ON');
  }
</script>

<label>
  <input type="checkbox" bind:checked={isChecked} />
  Enable Frame
</label>

<!-- {#if isChecked}
  <p>Hello</p>
{/if} -->
