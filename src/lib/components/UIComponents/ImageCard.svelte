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
    // let browserWidth;
    // let targetImageContainerHeight;

    // onMount(() => {
    //     // browserWidth = window.innerWidth;
    //     // targetImageContainerHeight = Math.round(
    //     //     (image.defaultSize[1] / image.defaultSize[0]) * browserWidth,
    //     // );

    //     // console.log(targetImageContainerHeight);
    // });

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

<div class="child-container mb-10 ">
    <div class="flex flex-row items-start justify-start w-full pl-4 gap-2 mb-2">
        <Avatar src="/referenceImages/steven-diaz-9lqOuSQhNCM-unsplash.webp" />
        <div >
            <h1 class="font-poppins font-medium text-sm">{image.author}</h1>
            <h1 class="font-poppins font-normal text-xs text-gray-500">Unsplash</h1>
        </div>            
    </div>
    <div on:click={goToCustomize} >
        <img src={image.src} alt={image.name} /> 
    </div>
    
</div>






