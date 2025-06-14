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

<div class="dynamic-gallery-wrapper">
    <div class="dynamic-gallery">
        <div class="gallery-content">
            <div class="parent-container">
                {#each images as image}
                    <div class="image-card-wrapper">
                        <ImageCard {image}/>
                    </div>
                {/each}
            </div>
        </div>
    </div>
    <!-- <div class="gallery-footer-spacer"></div> -->
</div>

<style>
    .dynamic-gallery-wrapper {
        position: relative;
        width: 100%;
        display: block;
        clear: both;
        overflow: hidden;
    }

    .dynamic-gallery {
        position: relative;
        width: 100%;
        margin-bottom: 2rem;
        display: block;
        clear: both;
    }

    .gallery-content {
        position: relative;
        width: 100%;
        display: block;
        clear: both;
    }

    /* Masonry effect using CSS columns */
    .parent-container {
        column-count: 1;
        column-gap: 2rem; /* controls the gap between columns */
        position: relative;
        display: block;
        width: 100%;
        overflow: hidden;
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
    .image-card-wrapper {
        display: inline-block;
        width: 100%;
        margin-bottom: 2rem;
        break-inside: avoid; /* Prevents the child from breaking across columns */
        vertical-align: top; /* Ensures proper alignment */
        -webkit-column-break-inside: avoid; /* WebKit-specific */
        page-break-inside: avoid;
    }

</style>
