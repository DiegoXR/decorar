<script>
    // @ts-nocheck
    import InputImage from "$lib/components/InputImage.svelte";
    import { galleryImages } from '$lib/data/galleryImages';
    import DynamicGallery from "$lib/components/UIComponents/GroupComponents/DynamicGallery.svelte";
</script>

<div class="relative w-full min-h-[50vh] mt-16">
    <InputImage />    
    <section class="py-8 w-full">
        <div class="w-full mx-auto px-4 lg:px-8">
            <DynamicGallery images={galleryImages} imagesPerPage={10} />
        </div>
    </section>
</div>



