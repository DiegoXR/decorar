<script>
    // @ts-nocheck
    import ImageCard from "$lib/components/UIComponents/ImageCard.svelte";
    import BaseButton from "$lib/components/UIComponents/CustomMadeComponents/BaseButton.svelte";
    import { onMount } from "svelte";
    import { currentSelectedImageStore } from '$lib/CurrentSelectedImageStore';
    
    // Props
    export let images = [];
    export let imagesPerPage = 10; // Default to 10 images per page for mobile
    
    // Pagination state
    let currentPage = 1;
    let totalPages = Math.ceil(images.length / imagesPerPage);
    
    // Reactive statement to get current page images
    $: paginatedImages = images.slice(
        (currentPage - 1) * imagesPerPage,
        currentPage * imagesPerPage
    );
    
    // Update total pages when images or imagesPerPage changes
    $: totalPages = Math.ceil(images.length / imagesPerPage);
    
    // Navigation functions
    function goToPage(page) {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    
    function nextPage() {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    }
    
    function prevPage() {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    }

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
                {#each paginatedImages as image}
                    <div class="image-card-wrapper">
                        <ImageCard {image}/>
                    </div>
                {/each}
            </div>
            
            <!-- Pagination Controls -->
            {#if totalPages > 1}
                <div class="pagination-controls flex justify-center items-center gap-4 py-8 border-t border-gray-100 mt-8 mb-16">
                    <BaseButton 
                        label="Previous"
                        variant={currentPage === 1 ? 'BaseDisabled' : 'BaseSecondary'}
                        disabled={currentPage === 1}
                        on:click={prevPage}
                        class="pagination-button"
                    />
                    
                    <div class="flex gap-2 flex-wrap justify-center max-w-xs">
                        {#each Array(totalPages) as _, i}
                            <button 
                                on:click={() => goToPage(i + 1)}
                                class="w-10 h-10 flex items-center justify-center rounded-lg transition-colors
                                    {currentPage === i + 1 ? 'bg-black text-white' : 'hover:bg-gray-100'}"
                            >
                                {i + 1}
                            </button>
                        {/each}
                    </div>
                    
                    <BaseButton 
                        label="Next"
                        variant={currentPage === totalPages ? 'BaseDisabled' : 'BaseSecondary'}
                        disabled={currentPage === totalPages}
                        on:click={nextPage}
                        class="pagination-button"
                    />
                </div>
            {/if}
        </div>
    </div>
    <div class="gallery-footer-spacer"></div>
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
  
    /* Pagination controls styling */
    .pagination-controls {
        position: relative;
        clear: both;
        width: 100%;
        display: block;
    }

    /* Add a spacer at the bottom to ensure footer doesn't overlap */
    .gallery-footer-spacer {
        height: 5rem;
        width: 100%;
        clear: both;
        display: block;
    }
</style>
