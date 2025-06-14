<script lang="ts">
  interface GalleryImage {
    src: string;
    alt: string;
  }

  export let title = '';
  export let images: GalleryImage[] = [];
  export let marginBottom = 'mb-4';
</script>

<div class="w-full px-0 {marginBottom}">
  <h3 class="text-center font-medium text-lg tracking-widest mb-2">{title}</h3>
  
  <div class="flex flex-row gap-1 w-full">
    {#each images as image}
      <div class="flex-none w-1/4 overflow-hidden" style="aspect-ratio: 3/4;">
        <img 
          src={image.src} 
          alt={image.alt} 
          class="w-full h-full object-cover"
        />
      </div>
    {/each}
  </div>
</div>
