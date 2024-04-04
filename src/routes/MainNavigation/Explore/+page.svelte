<script>
// @ts-nocheck

    import ImageCard from "$lib/components/ImageCard.svelte";
    import { onMount } from "svelte";

    let images = [
        {
            src: "/referenceImages/1080_608.jpg",
            alt: "alt text",
            description: "Horizontal Landscape",
            width: 1080,
            height: 608,
        },
        {
            src: "/referenceImages/1080_1080.jpg",
            alt: "alt text",
            description: "Square",
            width: 1080,
            height: 1080,
        },
        {
            src: "/referenceImages/1080_1350.jpg",
            alt: "alt text",
            description: "Vertical Portrait",
            width: 1080,
            height: 1350,
        },
        {
            src: "/referenceImages/1080_1080_Green.jpg",
            alt: "alt text",
            description: "Vertical Portrait",
            width: 1080,
            height: 608,
        }
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
