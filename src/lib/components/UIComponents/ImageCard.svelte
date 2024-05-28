<script>
    // @ts-nocheck
    import { onMount, beforeUpdate, afterUpdate, onDestroy } from "svelte";
    import NextIcon from "../IconComponents/NextIcon.svelte";
    import { currentSelectedImageStore } from '../../CurrentSelectedImageStore.js';
    import { goto } from "$app/navigation";
   
     /**
     * @type {{ src: string;
                alt: string;
                description: string;
                hr: string;
                availableSizes: number [][];
                defaultSize: number [];
            }}
     */
  
    export let image;
    let browserWidth;
    let targetImageContainerHeight;

    onMount(() => {
        // let diego = image.description;
        browserWidth = window.innerWidth;
        targetImageContainerHeight = Math.round(
            (image.defaultSize[1] / image.defaultSize[0]) * browserWidth,
        );
        // console.log(" target height is" + targetImageContainerHeight);
    });

    function goToCustomize() {
        currentSelectedImageStore.set(image);
        goto("/MainNavigation/Setup");
    }

</script>

<div class="flex flex-col mt-4">
    <div class="h-16 bg-gray-200">{image.description}</div>
    <div class="h-{targetImageContainerHeight} bg-gray-500">
        <img src={image.src} alt={image.alt} />
    </div>
    <div class="h-16 bg-gray-200 flex flex-row justify-end p-5">
        <button
        class="mx-2 mb-2 flex items-center justify-center  bg-white px-3 py-3" on:click={goToCustomize}>
        <NextIcon></NextIcon>
        <span class=" font-medium text-gray-700">Customize</span>
      </button>

    </div>
</div>
