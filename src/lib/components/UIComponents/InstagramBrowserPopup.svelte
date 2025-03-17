<script>
  import ExternalBrowserIcon from '$lib/components/IconComponents/ExternalBrowserIcon.svelte';
  export let isOpen = true;
</script>

<style>
  .blur-background {
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);
  }
  
  .popup-animation {
    animation: fadeIn 0.3s ease-out;
  }
  
  @keyframes fadeIn {
    from {
      transform: scale(0.98);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>

{#if isOpen}
<div class="fixed inset-0 z-40 bg-black/2">
  <div class="blur-background w-full h-full flex items-center justify-center">
    <div class="w-full max-h-screen p-2">
      <div class="popup-animation mx-auto max-w-lg bg-white rounded-xl shadow-lg p-4 border border-gray-50">
        <div class="flex flex-col items-center justify-center text-center gap-2">
          <div class="text-black">
            <ExternalBrowserIcon />
          </div>
          <p class="text-black font-poppins text-sm tracking-wide">
            To experience augmented reality (AR), please open this page in an external browser
          </p>
          <p class="text-black/50 font-poppins text-xs">This page is optimized on high-end phones with LiDAR technology.</p>
        </div>
      </div>
    </div>
  </div>
</div>
{/if}