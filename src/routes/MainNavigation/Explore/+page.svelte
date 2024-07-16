<script>
    // @ts-nocheck

    import ImageCard from "$lib/components/UIComponents/ImageCard.svelte";
    import { onMount } from "svelte";
    import { currentSelectedImageStore } from '../../../lib/CurrentSelectedImageStore';

    let images = [
        {
            author : "Oladimeji Odunsi",
            src: "/referenceImages/oladimeji-odunsi-br7vCg8693o-unsplash_0.8.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.508, 0.635],
                [0.6096, 0.762],
            ],
            defaultSize: [0.6096, 0.762],
        },
        {
            author : "Pexels Steve",
            src: "/referenceImages/pexels-steve-1292241_1.5.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.762, 0.508],
                [0.9144, 0.6096],
            ],
            defaultSize: [0.9144, 0.6096],
        },
        {
            author : "Jocelyn Morales",
            src: "/referenceImages/jocelyn-morales-R3Mi_Y1JQ4-unsplash_0.67.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.508, 0.762],
                [0.6096, 0.9144],
            ],
            defaultSize: [0.6096, 0.9144],
        },
        {
            author : "laura Chouette",
            src: "/referenceImages/laura-chouette-g6Ny4dvHlE0-unsplash_0.67.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.508, 0.762],
                [0.6096, 0.9144],
            ],
            defaultSize: [0.6096, 0.9144],
        },
        {
            author : "alex Rainer",
            src: "/referenceImages/alex_rainer-2_f83Sqwdrg-unsplash_0.67.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.508, 0.762],
                [0.6096, 0.9144],
            ],
            defaultSize: [0.6096, 0.9144],
        },
        {
            author : "Giorgio Trovato",
            src: "/referenceImages/giorgio-trovato-EI-bSCZ17o-unsplash_1.5.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.762, 0.508],
                [0.9144, 0.6096],
            ],
            defaultSize: [0.9144, 0.6096],
        }      
    ];

    onMount(() => {
        console.log("page loaded my browser");
        // Preselect the first image
        currentSelectedImageStore.set(images[0]);
    });

</script>

<section class="bg-white py-8">
    <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
       {#each images as image}
            <ImageCard {image}/> 
        {/each}
    </div>
</section>


