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
      <Button outline color="dark" on:click={() => handleClick('A')}  checked = {selectedButton === 'A' }>
        Poster
      </Button>
      <Button outline color="dark" on:click={() => handleClick('B')} checked = {selectedButton === 'B' }>
        Canvas
      </Button>
      <Button outline color="dark" on:click={() => handleClick('C')} checked = {selectedButton === 'C' }>
        Glass
      </Button>
    </ButtonGroup>

  </div>
  
  
  