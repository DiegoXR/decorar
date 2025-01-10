<script>
    import { Button, Dropdown, DropdownItem, Checkbox } from 'flowbite-svelte';
    import ChevronDownOutline from 'flowbite-svelte-icons/ChevronDownOutline.svelte';
    
    const handleClick = (/** @type {{ preventDefault: () => void; target: string; }} */ e) => {
      e.preventDefault();
      alert('Clicked on: ' + e.target);
    };
  </script>
  
  <Button>Dropdown button<ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white" /></Button>
  <Dropdown>
    <!-- <DropdownItem href="/link" on:click={handleClick}>Rendered as link</DropdownItem>
    <DropdownItem on:click={handleClick}>Rendered as button</DropdownItem> -->
    <DropdownItem>30 cm X  40 cm</DropdownItem>
    <DropdownItem>30 cm X  40 cm</DropdownItem>
    <DropdownItem>30 cm X  40 cm</DropdownItem>
    <DropdownItem>30 cm X  40 cm</DropdownItem>
  </Dropdown>