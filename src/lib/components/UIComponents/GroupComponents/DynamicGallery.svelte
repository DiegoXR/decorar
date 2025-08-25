<script>
    // @ts-nocheck
    import ImageCard from "$lib/components/UIComponents/ImageCard.svelte";
    import { onMount } from "svelte";
    import { currentSelectedImageStore } from '$lib/CurrentSelectedImageStore';
    
    // Props
    export let images = [];

    onMount(() => {
        // Preselect the first image if there are images
        if (images.length > 0) {
            currentSelectedImageStore.set(images[0]);
        }
    });
</script>

<div class="dynamic-gallery">
    <div class="gallery-grid w-full">
        {#each images as image}
            <div class="image-card-wrapper">
                <ImageCard {image}/>
            </div>
        {/each}
    </div>
</div>

<style>
    .dynamic-gallery {
        position: relative;
        width: 100%;
        margin-bottom: 2rem;
        display: block;
        clear: both;
        overflow: hidden;
    }

    /* Responsive masonry layout using CSS Grid */
    .gallery-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        width: 100%;
    }
    
    /* Use your custom breakpoints for responsive grid */
    @media (min-width: 830px) { /* lg breakpoint */
        .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }
  
    /* Grid item styling */
    .image-card-wrapper {
        display: block;
        width: 100%;
    }

</style>
