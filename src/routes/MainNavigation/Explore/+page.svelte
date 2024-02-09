<script>
    import ImageCard from "$lib/components/ImageCard.svelte";
    import { goto } from "$app/navigation";

    let images = [
    { src: 'path/to/image1.jpg', alt: 'alt text', description: 'Image 1 Descriptione' },
    { src: 'path/to/image2.jpg', alt: 'alt text', description: 'Image 2 Descriptionn' },
    // Añade más imágenes según sea necesario
  ];


</script>


<div class="w-full bg-slate-600 h-[150vh]">

    <div class="image-gallery">
        {#each images as image}
          <ImageCard {image} />
        {/each}
      </div> 
</div>


