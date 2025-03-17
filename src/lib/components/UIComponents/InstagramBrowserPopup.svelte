// InstagramBrowserPopup.svelte
<script>
  export let isOpen = true;
</script>

{#if isOpen}
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-4">
    <div class="text-center">
      <h2 class="text-xl font-poppins font-medium mb-4">Abrir en navegador</h2>
      <p class="text-gray-600 mb-6 font-poppins text-sm">
        Para experimentar la realidad aumentada, por favor abre esta página en tu navegador predeterminado (Safari o Chrome).
      </p>
      <button
        on:click={() => window.open(window.location.href, '_system')}
        class="w-full bg-black text-white py-2 px-4 rounded-full font-poppins text-sm hover:bg-gray-800"
      >
        Abrir en navegador
      </button>
    </div>
  </div>
</div>
{/if}