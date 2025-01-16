<script>
    import { ButtonGroup, Button } from 'flowbite-svelte';
  
    /**
   * @type {string}
   */
    let selectedButton = 'A' ;
  
    const handleClick = (/** @type {string} */ button) => {
      selectedButton = button;
    };
  </script>

  <div class="flex justify-center items-center">

    <ButtonGroup>
      <Button  outline color="dark" on:click={() => handleClick('A')}  checked = {selectedButton === 'A' }>
        Poster
      </Button>
      <Button disabled  outline color="dark" checked = {true}>
        Canvas
      </Button>
      <Button disabled  outline color="dark" checked = {true}>
        Glass
      </Button>
    </ButtonGroup>

  </div>
  
  
  