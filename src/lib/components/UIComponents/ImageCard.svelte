<script>
    // @ts-nocheck
    import { onMount, beforeUpdate, afterUpdate, onDestroy } from "svelte";
    import NextIcon from "../IconComponents/NextIcon.svelte";
    import { currentSelectedImageStore } from '../../CurrentSelectedImageStore.js';
    import { goto } from "$app/navigation";
    import HeartIcon from "../IconComponents/HeartIcon.svelte";
    import { Avatar} from 'flowbite-svelte';
   
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

    onMount(() => {
        browserWidth = window.innerWidth;
        targetImageContainerHeight = Math.round(
            (image.defaultSize[1] / image.defaultSize[0]) * browserWidth,
        );

        console.log(targetImageContainerHeight);
    });

    function goToCustomize() {
        currentSelectedImageStore.set(image);
        goto("/MainNavigation/Setup");
    }

</script>

<div class="child-container on:click={goToCustomize}">
    <div class="flex flex-row items-start justify-start w-full pl-4 gap-2">
        <Avatar src="/referenceImages/steven-diaz-9lqOuSQhNCM-unsplash.webp" />
        <div>
            <h1 class="font-poppins font-medium text-sm">{image.author}</h1>
            <h1 class="font-poppins font-normal text-xs text-gray-500">Unsplash</h1>
        </div>            
    </div>
    
    <img src={image.src} alt={image.name} /> 
</div>
  
  <style>
    .child-container {
      width: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
    }
  
    img {
      width: 100%;
      height: auto;
    }
</style>


 <!-- <div class=" mx-auto bg-blue-400">
        <div class="w-full h-[100px] bg-green-500 mb-4">
            <div class="w-full h-full bg-gray-50" on:click={goToCustomize}>
                <img
                    class="hover:grow hover:shadow-lg"
                    src={image.src}
                    alt={image.alt}
                />
            </div>

            
        </div>
    </div> -->



<!-- src="https://images.unsplash.com/photo-1555982105-d25af4182e4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80"/> -->

<!-- <div class="pt-3 flex items-center justify-center flex-col sm:flex-row">
                <p class="mb-2 sm:mb-0">Unsplash - {image.author}</p>

                <button
                    class="mx-2 flex items-center justify-center bg-white px-3 py-3"
                    on:click={goToCustomize}>
                    <NextIcon></NextIcon>
                    <span class="font-medium text-gray-700">Customize</span>
                </button>
            </div> -->


            <!-- <style>
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
</style> -->