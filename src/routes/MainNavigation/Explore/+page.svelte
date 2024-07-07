<script>
    // @ts-nocheck

    import ImageCard from "$lib/components/UIComponents/ImageCard.svelte";
    import { onMount } from "svelte";
    import { currentSelectedImageStore } from '../../../lib/CurrentSelectedImageStore';

    let images = [
        {
            src: "/referenceImages/1080_1080.jpg",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.1, 0.1],
                [0.2, 0.2],
                [0.3, 0.3],
            ],
            defaultSize: [0.2, 0.2],
        },
        {
            src: "/referenceImages/1080_1080_v2_w.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.3, 0.3],
                [0.4, 0.4],
                [0.5, 0.5],
            ],
            defaultSize: [0.4, 0.4],
        },
        {
            src: "/referenceImages/446_595.jpg",
            alt: "alt text",
            description: "Vertical Portrait",
            availableSizes: [
                [0.2286, 0.3048],
                [0.3048, 0.4064],
                [0.381, 0.508],
                [0.4572, 0.6096],
            ],
            defaultSize: [0.381, 0.508],
        },
        {
            src: "/referenceImages/644_429.jpg",
            alt: "alt text",
            description: "Horizontal Landscape",
            availableSizes: [
                [0.3048, 0.2032],
                [0.4572, 0.3048],
                [0.6096, 0.4064],
                [0.762, 0.508],
                [0.9144, 0.6096],
            ],
            defaultSize: [0.6096, 0.4064],
        }, 
        {
            src: "/referenceImages/sinddy_w.webp",
            alt: "alt text",
            description: "Vertical Portrait",
            availableSizes: [
                [0.2286, 0.3048],
                [0.3048, 0.4064],
                [0.381, 0.508],
                [0.4572, 0.6096],
            ],
            defaultSize: [0.381, 0.508],
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

<section class="bg-white py-8">
    <div class="container py-8 px-6 mx-auto">
        <a
            class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl mb-8"
            href="#"
        >
            About
        </a>

        <p class="mt-8 mb-8">
            This template is inspired by the stunning nordic minimalist design -
            in particular:
            <br />
            <a
                class="text-gray-800 underline hover:text-gray-900"
                href="http://savoy.nordicmade.com/"
                target="_blank">Savoy Theme</a
            >
            created by
            <a
                class="text-gray-800 underline hover:text-gray-900"
                href="https://nordicmade.com/">https://nordicmade.com/</a
            >
            and
            <a
                class="text-gray-800 underline hover:text-gray-900"
                href="https://www.metricdesign.no/"
                target="_blank">https://www.metricdesign.no/</a
            >
        </p>

        <p class="mb-8">
            Lorem ipsum dolor sit amet, consectetur <a href="#">random link</a> adipiscing
        </p>
    </div>
</section>
