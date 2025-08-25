<script>
  import { goto } from '$app/navigation';
  
  export let image = '';
  export let title = '';
  export let subtitle = '';
  export let location = '';
  export let tag = '';
  
  function handleClick() {
    goto('/MainNavigation/Explore');
  }
</script>

<button class="designer-card relative cursor-pointer w-full text-left" on:click={handleClick} aria-label="Navigate to explore page">
  <!-- Image container with rounded corners and shadow - made less tall -->
  <div class="relative aspect-[8/10] rounded-xl overflow-hidden shadow-md">
    <!-- Main image -->
    <img 
      src={image} 
      alt={title} 
      class="w-full h-full object-cover"
      loading="lazy"
      decoding="auto"
    />
  </div>
  
  <!-- Card info section - more compact -->
  <div class="pt-2 pb-1 text-left">
    <!-- Title - more compact -->
    <h4 class="subtitle-2 uppercase text-left">
      {title}
    </h4>
    
    <!-- Subtitle on second line -->
    <p class="body-2 text-left">{subtitle}</p>
    
    <!-- Location and category aligned left -->
    <div class="mt-0 flex flex-col space-y-0.5 items-start">
      <div class="flex items-center">
        <span class="body-4 text-gray-600 uppercase">{location}</span>
      </div>
      
      {#if tag}
        <!-- <span class="body-4 text-gray-500 uppercase">{tag}</span> -->
      {/if}
    </div>
  </div>
</button>

