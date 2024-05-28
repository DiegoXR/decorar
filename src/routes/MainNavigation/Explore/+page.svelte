<script>
// @ts-nocheck

    import ImageCard from "$lib/components/UIComponents/ImageCard.svelte";
    import { onMount } from "svelte";

    let images = [
        {
            src: "/referenceImages/1080_1080.jpg",
            alt: "alt text",
            description: "Square",
            availableSizes: [
            [0.1, 0.1],
            [0.2, 0.2],
            [0.3, 0.3]
            ],
            defaultSize: [0.2, 0.2]
        },
        {
            src: "/referenceImages/1080_1080_v2.jpg",
            alt: "alt text",
            description: "Square",
            availableSizes: [
            [0.3, 0.3],
            [0.4, 0.4],
            [0.5, 0.5]
            ],
            defaultSize: [0.4, 0.4]
        },
        {
            src: "/referenceImages/446_595.jpg",
            alt: "alt text",
            description: "Vertical Portrait",
            availableSizes: [
            [0.2286, 0.3048],
            [0.3048, 0.4064],
            [0.381, 0.508],
            [0.4572, 0.6096]
            ],
            defaultSize: [0.381, 0.508]
        },
        {
            src:"/referenceImages/644_429.jpg",
            alt: "alt text",
            description: "Horizontal Landscape",
            availableSizes: [
            [0.3048, 0.2032],
            [0.4572, 0.3048],
            [0.6096, 0.4064],
            [0.762, 0.508],
            [0.9144, 0.6096],
            ],
            defaultSize: [0.6096, 0.4064]
        }
                // {
        //     src: "/referenceImages/1080_608.jpg",
        //     alt: "alt text",
        //     description: "Horizontal Landscape",
        //     width: 1080,
        //     height: 608,
        // },
    ];

    onMount(() => {     
        console.log("page loaded my browser");
    });
</script>

<div class="w-full bg-slate-600 h-[150vh]">
    <div class="image-gallery">
        {#each images as image}
            <ImageCard {image}/> 
        {/each}
    </div>
</div>
