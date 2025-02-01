<script>
    // @ts-nocheck
    import { onMount, beforeUpdate, afterUpdate, onDestroy } from "svelte";
    import NextIcon from "../IconComponents/NextIcon.svelte";
    import { currentSelectedImageStore } from '../../CurrentSelectedImageStore.js';
    import { goto } from "$app/navigation";
    import HeartIcon from "../IconComponents/HeartIcon.svelte";
    import { getSupportedSizes } from "../../FrameSizesDataSet.js";
   
     /**
     * @type {{ 
     *          author: string;
     *          src: string;
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
    let imageWidth;
    let imageHeight;

    onMount(() => {
        browserWidth = window.innerWidth;
        targetImageContainerHeight = Math.round(
            (image.defaultSize[1] / image.defaultSize[0]) * browserWidth,
        );
    });

    function goToCustomize() {

        currentSelectedImageStore.set(image);

        goto("/MainNavigation/Setup");
    }

    function handleImageLoad(event) {
        const img = event.target;
        imageWidth = img.naturalWidth;
        imageHeight = img.naturalHeight;
        // console.log(`Image Size: ${imageWidth} x ${imageHeight}`);      
        
        // If the image predefined in the gallery does not have available sizes, we calculate the supported sizes
        // automatically the same way we do it by the image provided by the user from its personal phone gallery
        if (image.availableSizes.length === 0){
            image.availableSizes = getSupportedSizes(imageWidth / imageHeight);
            image.defaultSize = image.availableSizes[0];  
        }            
    }

</script>

<div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col bg-white mb-2">
        <div class=" w-full h-[300px] bg-gray-50" on:click={goToCustomize}>
            <img
            class="hover:grow hover:shadow-lg"
            src={image.src}
            alt={image.alt}
            on:load={handleImageLoad}
        />
        </div>

        <div class="pt-3 flex items-center justify-center">
            <p class="">Unsplash - {image.author}</p>
            
            <button
            class="mx-2 flex items-center justify-center  bg-white px-3 py-3" on:click={goToCustomize}>
            <NextIcon></NextIcon>
            <span class=" font-medium text-gray-700">Customize</span>
            </button>
            <!-- <HeartIcon></HeartIcon> -->
        </div>
</div>

<style>
    img
    {
        width: 100%;
        height: 100%;
        object-fit: contain;        
    }
</style>


<!-- src="https://images.unsplash.com/photo-1555982105-d25af4182e4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80"/> -->