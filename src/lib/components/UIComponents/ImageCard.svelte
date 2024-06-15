<script>
    // @ts-nocheck
    import { onMount, beforeUpdate, afterUpdate, onDestroy } from "svelte";
    import NextIcon from "../IconComponents/NextIcon.svelte";
    import { currentSelectedImageStore } from '../../CurrentSelectedImageStore.js';
    import { goto } from "$app/navigation";
    import HeartIcon from "../IconComponents/HeartIcon.svelte";
   
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
        browserWidth = window.innerWidth;
        targetImageContainerHeight = Math.round(
            (image.defaultSize[1] / image.defaultSize[0]) * browserWidth,
        );
    });

    function goToCustomize() {
        currentSelectedImageStore.set(image);
        goto("/MainNavigation/Setup");
    }

</script>

<div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col bg-white mb-2">
        <div class=" w-full h-[300px] bg-gray-50">
            <img
            class="hover:grow hover:shadow-lg"
            src={image.src}
            alt={image.alt}
        />
        </div>

        <div class="pt-3 flex items-center justify-between">
            <p class="">Product Name</p>
            
            <button
            class="mx-2 mb-2 flex items-center justify-center  bg-white px-3 py-3" on:click={goToCustomize}>
            <NextIcon></NextIcon>
            <span class=" font-medium text-gray-700">Customize</span>
            </button>

            <HeartIcon></HeartIcon>
        </div>
        <!-- <p class="pt-1 text-gray-900">£9.99</p> -->
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