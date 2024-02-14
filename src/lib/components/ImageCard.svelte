<script>
    // @ts-nocheck

    /**
     * @type {{ description: any;  }}
     */

    import { onMount, beforeUpdate, afterUpdate, onDestroy } from "svelte";
    import NextIcon from "./NextIcon.svelte";
    import { selectedImageObject } from '../../stores.js';
    import { goto } from "$app/navigation";
   

    export let image;
    let browserWidth;
    let targetImageContainerHeight;

    onMount(() => {
        let diego = image.description;
        console.log({ diego });
        browserWidth = window.innerWidth;
        targetImageContainerHeight = Math.round(
            (image.height / image.width) * browserWidth,
        );
        console.log(" target height is" + targetImageContainerHeight);
    });

    function goToCustomize() {
        selectedImageObject.set(image);
        goto("/MainNavigation/Customize");
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
