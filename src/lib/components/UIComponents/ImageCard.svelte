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
    let imageRef;
    let isLoading = true;
    let isIntersecting = false;
    let observer;
    let imageLoaded = false;

    onMount(() => {
        observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            // Solo actualizamos isIntersecting si la imagen aún no se ha cargado
            if (!imageLoaded) {
                isIntersecting = entry.isIntersecting;
            }
        }, {
            rootMargin: '100px 0px',
            threshold: 0.1
        });

        if (imageRef) {
            observer.observe(imageRef);
        }

        return () => {
            if (imageRef && observer) {
                observer.unobserve(imageRef);
                observer.disconnect();
            }
        };
    });

    function handleImageLoad() {
        isLoading = false;
        imageLoaded = true;
        // Una vez que la imagen está cargada, podemos desconectar el observer
        if (imageRef && observer) {
            observer.unobserve(imageRef);
            observer.disconnect();
        }
    }

    function goToCustomize() {

        currentSelectedImageStore.set(image);

        goto("/MainNavigation/Setup");
    }

    // function handleImageLoad(event) {
    //     const img = event.target;
    //     imageWidth = img.naturalWidth;
    //     imageHeight = img.naturalHeight;
    //     // console.log(`Image Size: ${imageWidth} x ${imageHeight}`);      
        
    //     // If the image predefined in the gallery does not have available sizes, we calculate the supported sizes
    //     // automatically the same way we do it by the image provided by the user from its personal phone gallery
    //     if (image.availableSizes.length === 0){
    //         image.availableSizes = getSupportedSizes(imageWidth / imageHeight);
    //         image.defaultSize = image.availableSizes[0];  
    //     }            
    // }

    function handleKeyDown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            goToCustomize();
        }
    }
</script>

<div class="child-container mb-10">
    <div class="flex flex-row items-start justify-start w-full pl-4 gap-2 mb-2">
        <Avatar src="/referenceImages/steven-diaz-9lqOuSQhNCM-unsplash.webp" />
        <div>
            <h1 class="body-3">{image.author}</h1>
            <h1 class="body-4 text-gray-500">Unsplash</h1>
        </div>            
    </div>
    <button 
        type="button"
        on:click={goToCustomize}
        on:keydown={handleKeyDown}
        class="relative overflow-hidden w-full text-left"
        bind:this={imageRef}
        aria-label="View {image.author}'s artwork in AR setup"
    >
        {#if isIntersecting || imageLoaded}
            <div class="w-full h-full">
                <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    class="w-full transition-opacity duration-500"
                    class:opacity-0={isLoading}
                    class:opacity-100={!isLoading}
                    on:load={handleImageLoad}
                />
                {#if isLoading}
                    <div class="absolute inset-0 bg-gray-100 animate-pulse"></div>
                {/if}
            </div>
        {:else}
            <div class="w-full aspect-[3/4] bg-gray-100"></div>
        {/if}
    </button>
</div>

<style>
    img {
        display: block;
        width: 100%;
        height: auto;
        will-change: opacity;
        backface-visibility: hidden;
        transform: translateZ(0);
    }

    .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: .5;
        }
    }

    button {
        appearance: none;
        border: none;
        padding: 0;
        background: none;
        cursor: pointer;
    }

    button:focus {
        outline: 2px solid #4F46E5;
        outline-offset: 2px;
    }

    button:focus:not(:focus-visible) {
        outline: none;
    }
</style>
