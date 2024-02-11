<script>
    // @ts-nocheck

    /**
     * @type {{ description: any;  }}
     */

    import { onMount, beforeUpdate, afterUpdate, onDestroy } from "svelte";
    import NextIcon from "./NextIcon.svelte";
    // import { selectedImage } from  "$src/stores.js";
    import { selectedImage } from '../../stores.js';
    import { selectedImageObject } from '../../stores.js';
   

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

    function myFunction() {
        alert('Button was clicked!');
        selectedImage.set(image.description);
        selectedImageObject.set(image);
    }
</script>

<div class="flex flex-col mt-4">
    <div class="h-16 bg-gray-200">{image.description}</div>
    <div class="h-{targetImageContainerHeight} bg-gray-500">
        <img src={image.src} alt={image.alt} />
    </div>
    <div class="h-16 bg-gray-200 flex flex-row justify-end p-5">
        <button
        class="mx-2 mb-2 flex items-center justify-center  bg-white px-3 py-3" on:click={myFunction}>
        <NextIcon></NextIcon>
        <span class=" font-medium text-gray-700">Customize</span>
      </button>

    </div>
</div>
