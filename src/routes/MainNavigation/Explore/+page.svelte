<script>
    import ImageCard from "$lib/components/ImageCard.svelte";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let images = [
    { src: '/referenceImages/1080_608.jpg', alt: 'alt text', description: 'Horizontal Landscape', width : 1080 , height  : 608},
    { src: '/referenceImages/1080_1080.jpg', alt: 'alt text', description: 'Square' , width : 1080 , height  : 1080},
    { src: '/referenceImages/1080_1350.jpg', alt: 'alt text', description: 'Vertical Portrait' , width : 1080 , height  : 1350},
    // Añade más imágenes según sea necesario
  ];


  onMount(() => {
    console.log('The explorer page has loaded');
    // You can place your "on page load" logic here
  });


</script>


<div class="w-full bg-slate-600 h-[150vh]">

    <div class="image-gallery">
        {#each images as image}
          <ImageCard {image} />
        {/each}
      </div> 
</div>


