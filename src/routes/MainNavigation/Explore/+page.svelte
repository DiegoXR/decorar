<script>
    // @ts-nocheck

    import ImageCard from "$lib/components/UIComponents/ImageCard.svelte";
    import { onMount } from "svelte";
    import { currentSelectedImageStore } from '../../../lib/CurrentSelectedImageStore';
    import InputImage from "$lib/components/InputImage.svelte";
    import { galleryImages } from '$lib/data/galleryImages';

    let images = galleryImages;

    onMount(() => {
        // Preselect the first image
        currentSelectedImageStore.set(images[0]);
    });
</script>

<InputImage></InputImage>

<section class="py-8 w-full">
    <div class="parent-container">
       {#each images as image}
            <ImageCard {image}/> 
        {/each}
    </div>
</section>

<style>
    /* Masonry effect using CSS columns */
    .parent-container {
      column-count: 1;
      column-gap: 2rem; /* controls the gap between columns */
    }
  
    @media (min-width: 768px) {
      .parent-container {
        column-count: 2;
      }
    }

    /* Desktop mode (or larger screens) using three columns */
  @media (min-width: 1024px) {
    .parent-container {
      column-count: 3;
    }
  }
  
    /* Ensure that each child is treated as a whole block in the columns */
    .child-container {
      display: inline-block;
      width: 100%;
      margin-bottom: 2rem;
      break-inside: avoid; /* Prevents the child from breaking across columns */
      vertical-align: top; /* Ensures proper alignment */
      -webkit-column-break-inside: avoid; /* WebKit-specific */
      page-break-inside: avoid;   
    }
  
    /* Optional: ensure images are responsive */
    img {
      width: 100%;
      height: auto;
    }
</style>



<!-- <section class="bg-yellow-500 py-8 w-full">
    <div class="mx-auto flex items-center flex-col pt-4 pb-12">
       {#each images.slice(0, 2) as image}
            <ImageCard {image}/> 
        {/each}
    </div>
</section> -->


