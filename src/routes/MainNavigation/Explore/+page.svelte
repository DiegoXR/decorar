<script>
    // @ts-nocheck
    import InputImage from "$lib/components/InputImage.svelte";
    import { galleryImages } from '$lib/data/galleryImages';
    import DynamicGallery from "$lib/components/UIComponents/GroupComponents/DynamicGallery.svelte";
</script>

<div class="explore-page">
    <InputImage />
    
    <section class="py-8 w-full">
        <div class="container-fluid mx-auto px-4 lg:px-8">
            <DynamicGallery images={galleryImages} imagesPerPage={10} />
        </div>
    </section>
</div>

<style>
    .explore-page {
        position: relative;
        width: 100%;
        min-height: 50vh;
    }
</style>



