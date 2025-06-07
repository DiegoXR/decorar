<script>
  export let image = '';
  export let title = '';
  export let subtitle = '';
  export let location = '';
  export let tag = '';
</script>

<div class="designer-card relative">
  <!-- Image container with rounded corners and shadow - made less tall -->
  <div class="relative aspect-[8/10] rounded-xl overflow-hidden shadow-md">
    <!-- Main image -->
    <img 
      src={image} 
      alt={title} 
      class="w-full h-full object-cover"
    />
  </div>
  
  <!-- Card info section - more compact -->
  <div class="pt-2 pb-1 px-2 text-left">
    <!-- Title - more compact -->
    <h2 class="text-black text-base font-semibold tracking-wide uppercase mb-0.5 text-left">
      {title}
    </h2>
    
    <!-- Subtitle on second line -->
    <p class="text-xs text-gray-700 mb-1.5 text-left">{subtitle}</p>
    
    <!-- Location and category aligned left -->
    <div class="flex flex-col space-y-0.5 items-start">
      <div class="flex items-center space-x-1">
        <span class="text-xs text-gray-600 uppercase">{location}</span>
      </div>
      
      {#if tag}
        <span class="text-xs text-gray-500 uppercase">{tag}</span>
      {/if}
    </div>
  </div>
</div>

<style>
  /* Component-specific styles can be added here */
</style>
