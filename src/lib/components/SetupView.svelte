<!-- <div class="bg-blue-100 w- h-[50vh]" -->
<script>
import { onMount, onDestroy, tick } from "svelte";
import { currentSelectedImageStore } from "../CurrentSelectedImageStore.js";
import { frameConfigurationStore } from "../FrameConfigurationStore.js";
import { getContext } from 'svelte';
import * as THREEJsConfiguration from  "../SceneConstants.js";
import * as SetupUtilities from '$lib/SetupUtilities.js';
import { preloadTextures } from '$lib/TextureLoaderUtilities.js';

/**
* @type {import("svelte/store").Unsubscriber}
*/
let currentImageSubscription;

/**
* @type {import("svelte/store").Unsubscriber}
*/
let currentFrameSubscription;

/**
* @type {import("svelte/store").Unsubscriber}
*/
let currentCanvasWidthSubscription;

/**
* @type {number}
*/
let canvasWidth;

/**
* @type {number}
*/
let meterToPixelconversionFactor;

 /**
     * @type {HTMLDivElement}
     */
let imageElement;

 /**
     * @type {HTMLDivElement}
     */
let frameElement;

 /**
     * @type {HTMLDivElement}
     */
let innerPasspartout;


let localFrameConfiguration = THREEJsConfiguration.startingFrameConfiguration;

let currentImageProperties = {
src: "",
alt: "",
description: "",
availableSizes: [[0, 0]],
defaultSize: [0, 0],
};

/**
 * @type {{ subscribe: (arg0: (value: number) => void) => import("svelte/store").Unsubscriber; }}
 */
let canvasWidthStore = getContext('parentWidth');

let isInitialized = false

let imageElementWidthPx;
let imageElementHeightPx;

let targetPasspartout;

/**
 * @type {number}
 */
let selectedPasspartoutPercentage;

// Cache for preloaded textures
/** @type {Record<string, HTMLImageElement>} */
let preloadedTextures = {};

// Cache for pre-tinted textures
/** @type {Record<string, string>} */
let tintedTextureCache = {};

// Extract unique texture URLs from FrameColor definition
const getUniqueTextureUrls = () => {
    const urls = Object.values(SetupUtilities.FrameColor).map(color => color.imageUrl);
    return [...new Set(urls)]; // Remove duplicates
};

// Pre-generate tinted textures for all frame colors
const preGenerateTintedTextures = async () => {
    const canvas = document.createElement('canvas');
    
    for (const [colorKey, colorData] of Object.entries(SetupUtilities.FrameColor)) {
        if (colorData.hex !== "transparent") {
            const tint = SetupUtilities.hexToRgb(colorData.hex);
            const cacheKey = `${colorData.imageUrl}_${colorData.hex}`;
            
            try {
                const tintedImageUrl = await SetupUtilities.tintImage(colorData.imageUrl, tint, canvas);
                tintedTextureCache[cacheKey] = tintedImageUrl;
            } catch (err) {
                console.error(`Failed to pre-generate tinted texture for ${colorKey}:`, err);
            }
        }
    }
};

onMount(async () => {
    // Preload all unique textures from FrameColor definition
    const uniqueTextureUrls = getUniqueTextureUrls();
    preloadedTextures = await preloadTextures(uniqueTextureUrls);
    
    // Pre-generate all tinted textures
    await preGenerateTintedTextures();
    
    isInitialized = true;
    CanvasWidthChangeSubscription();
    InitializeImageSubscription();
    InitialFrameConfigurationSubscription();
});

onDestroy(() => {
        
        if (currentImageSubscription) currentImageSubscription();
        if (currentCanvasWidthSubscription) currentCanvasWidthSubscription();
        if (currentFrameSubscription) currentFrameSubscription();

    });

function InitializeImageSubscription() {
    currentImageSubscription = currentSelectedImageStore.subscribe(
        (value) => {
            
            currentImageProperties = value;        
            // console.log("CANVAS/ I got the Image Update");
        },
    );

    currentImageSubscription();
}

function InitialFrameConfigurationSubscription(){
    
    currentFrameSubscription = frameConfigurationStore.subscribe(
            (value) => {
                localFrameConfiguration = value;

                updateHTMLElements();                   
            },
        );
}

function CanvasWidthChangeSubscription(){
    currentCanvasWidthSubscription = canvasWidthStore.subscribe((value) => {
    canvasWidth = value;
    updateHTMLElements();
    // console.log(`from parent width subscription the current parent width is: ${canvasWidth}`);
  });
}


function updateHTMLElements(){
    
   if (!isInitialized)   return;
 
    localFrameConfiguration.ImageSrc = currentImageProperties.src;
            
    localFrameConfiguration.availableSizes = currentImageProperties.availableSizes;

    meterToPixelconversionFactor = SetupUtilities.meterToPixelConversion(canvasWidth, 
    localFrameConfiguration.ImageSize[0], 
    localFrameConfiguration.ImageSize[1],
    localFrameConfiguration.FrameIsVisible, 
    localFrameConfiguration.FrameBorderWidth, 
    localFrameConfiguration.PasspartoutIsVisible, 
    localFrameConfiguration.PasspartoutCutoutSize);
    
    // We apply size values to the image html element

    imageElementWidthPx = localFrameConfiguration.ImageSize[0] * meterToPixelconversionFactor;
    imageElementHeightPx = localFrameConfiguration.ImageSize[1] * meterToPixelconversionFactor;

    imageElement.style.width = ConvertToString(imageElementWidthPx);
    imageElement.style.height = ConvertToString(imageElementHeightPx);

    // We apply size values to the frame html element
    frameElement.style.width = ConvertToString(imageElementWidthPx);
    frameElement.style.height = ConvertToString(imageElementHeightPx);

    // We apply visibility values to the frame html element
    frameElement.style.visibility = localFrameConfiguration.FrameIsVisible ? "visible" : "hidden";               
    let borderWidthPx = ConvertToString(localFrameConfiguration.FrameBorderWidth * meterToPixelconversionFactor);

                                    
    const borderWidthPxConcat = `${borderWidthPx} ${borderWidthPx} ${borderWidthPx} ${borderWidthPx}`;
    frameElement.style.borderWidth = borderWidthPxConcat;

    // We set the pass partout configuration
        if (localFrameConfiguration.PasspartoutIsVisible){
                    
        innerPasspartout.style.visibility = "visible";
      
        if (localFrameConfiguration.PasspartoutType == SetupUtilities.PasspartoutType.OUTTER){                       
            // Outter mode
            innerPasspartout.style.visibility = "hidden";
            
            // Make a switch case based on the size type
            switch(localFrameConfiguration.PasspartoutCutoutSize){

                case SetupUtilities.PasspartoutCutoutSize.NARROW:                                                  
                selectedPasspartoutPercentage = SetupUtilities.narrowPasspartoutPercentage;
                    break;
                case SetupUtilities.PasspartoutCutoutSize.MEDIUM:
                selectedPasspartoutPercentage = SetupUtilities.mediumPasspartoutPercentage;
                    break;
                case SetupUtilities.PasspartoutCutoutSize.WIDE:
                selectedPasspartoutPercentage = SetupUtilities.widePasspartoutPercentage;
                    break;
            }

            targetPasspartout = ((selectedPasspartoutPercentage)/(1 - 2*(selectedPasspartoutPercentage))*imageElementWidthPx);

            frameElement.style.padding = ConvertToString(targetPasspartout);

        }else{
            // Inner mode
            frameElement.style.padding = "0px";
            // Make a switch case based on the size type
            innerPasspartout.style.borderWidth= "40px";   /* This value controls the pass partout of type inner */
            innerPasspartout.style.visibility = "visible";

        }
        }else{
        innerPasspartout.style.visibility = "hidden";
        frameElement.style.padding = "0px";
        }   


  // Get the image URL directly from the frame color configuration
  const imageUrl = localFrameConfiguration.FrameColor?.imageUrl || "/referenceTextures/2D/BaseOak.png";
 
    console.log("the selected url is", imageUrl);
    console.log("the selected color is", localFrameConfiguration.FrameColor?.hex);
    
    // Use pre-generated tinted texture if available
    const cacheKey = `${imageUrl}_${localFrameConfiguration.FrameColor?.hex}`;
    let finalImageUrl = imageUrl;
    
    if (localFrameConfiguration.FrameColor?.hex !== "transparent" && tintedTextureCache[cacheKey]) {
        finalImageUrl = tintedTextureCache[cacheKey];
    }
    
    // Apply the texture (either original or pre-tinted)
    frameElement.style.borderImageSource = `url("${finalImageUrl}")`;
    frameElement.style.borderImageSlice = "200 200";
 }

/**
 * @param {number} numberToConvert
 */
function ConvertToString(numberToConvert){
    return  numberToConvert.toString() +"px";
}

</script>    

<div class="relative h-full w-full">

    <!-- Declaring Frame Element -->
    <!-- <div bind:this={testBox} class="bg-red-500 testBox">
        <p>hola</p>
    </div> -->

    <!-- Declaring Image Element -->
    <div bind:this={imageElement} class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 imageElement">
        <img src={currentImageProperties.src} alt={currentImageProperties.alt || "Framed artwork"} class="w-full h-full object-cover">
    </div>

     <!-- Declaring Frame Element -->
    <div bind:this={frameElement} class="frameElement">
    </div>

     <!-- Declaring Inner Passpartout -->
     <div bind:this={innerPasspartout} class="innerPasspartout">
    </div>
</div>


<style>

.frameElement{
    /* background-color: rgba(255, 0, 0, 0); */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    z-index: 2;
    border-radius:2px; 
    /* padding: 10px;  This value controls the pass partout of type outter */
    box-sizing: content-box;
    box-shadow: 2.9px 5.8px 5.8px hsl(0deg 0% 0% / 0.41) inset, 2.9px 5.8px 5.8px hsl(0deg 0% 0% / 0.41);
    visibility: visible;    
}

.imageElement{
    visibility: visible;
    z-index: 3;
}

.innerPasspartout{
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    z-index: 4;
    width: 150px;
    height: 100px;
    /* background-color: blue; */
    /* border-width: 40px;   This value controls the pass partout of type inner */
    border-color: rgb(255, 255, 255);
    /* box-sizing: content-box; */
}

/* .testBox{
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    z-index: 40;
    padding:0px;
    width: 208px;
    height: 208px;
    visibility: hidden;
    opacity: 50%;
    background-image: url('/referenceTextures/Oak_512.png');
} */

/* .frameImage{
    visibility: hidden;
    width: 995px;
    height: 995px;
} */
</style>

<!-- <button on:click={printHello}>Click me</button> -->


