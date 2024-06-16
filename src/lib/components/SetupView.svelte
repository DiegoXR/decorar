<!-- <div class="bg-blue-100 w- h-[50vh]" -->
<script>
import { onMount, onDestroy,tick  } from "svelte";
import { currentSelectedImageStore } from "../CurrentSelectedImageStore.js";
import { frameConfigurationStore } from "../FrameConfigurationStore.js";
import { getContext } from 'svelte';
import * as THREEJsConfiguration from  "../SceneConstants.js";
import * as SetupUtilities from "../SetupUtilities.js"

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
let imageWidth = 10;

/**
* @type {number[]}
*/
let imageScreenSpaceRatios = [0.5, 0.5, 0.7]; // Square, Portrait, Landscape

/**
* @type {number}
*/
let imageRatio = 0;

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
     let testBox;


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




onMount(async () => {

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
    console.log(`from parent width subscription the current parent width is: ${canvasWidth}`);
  });
}

 function updateHTMLElements(){
    
   if (!isInitialized)   return;
 
    console.log("Updating HTML ELEMENTS");
    localFrameConfiguration.ImageSrc = currentImageProperties.src;
                localFrameConfiguration.availableSizes = currentImageProperties.availableSizes;

                imageRatio = localFrameConfiguration.ImageSize[0]/localFrameConfiguration.ImageSize[1];
                            
                
                // Based on the image ratio, we determinate the default space of the canvas that will occupy the image html element.
                let selectedPercentageOfCanvasOccupacy= GetPercentageOfCanvasOccupacy(imageRatio);

                // We calculate a converion factor meter to pixel
                if (localFrameConfiguration.FrameIsVisible){
                    meterToPixelconversionFactor =  (canvasWidth * selectedPercentageOfCanvasOccupacy) /((localFrameConfiguration.ImageSize[0] + (2 * localFrameConfiguration.FrameBorderWidth)));
                    // console.log(`MY CONVERSION IS : ${meterToPixelconversionFactor}:`);
                }                
                else{
                    meterToPixelconversionFactor =  (canvasWidth * selectedPercentageOfCanvasOccupacy) /localFrameConfiguration.ImageSize[0];
                    // console.log(`MY CONVERSION IS : ${meterToPixelconversionFactor}:`);
                }
                
                // We apply size values to the image html element
                imageElement.style.width = ConvertToString(localFrameConfiguration.ImageSize[0] * meterToPixelconversionFactor);
                imageElement.style.height = ConvertToString(localFrameConfiguration.ImageSize[1] * meterToPixelconversionFactor);


                // We apply size values to the frame html element
                frameElement.style.width = ConvertToString(localFrameConfiguration.ImageSize[0] * meterToPixelconversionFactor);
                frameElement.style.height = ConvertToString(localFrameConfiguration.ImageSize[1] * meterToPixelconversionFactor);

                // We apply visibility values to the frame html element
                frameElement.style.visibility = localFrameConfiguration.FrameIsVisible ? "visible" : "hidden";
                 
                let borderWidthPx = ConvertToString(localFrameConfiguration.FrameBorderWidth * meterToPixelconversionFactor);

                let color = "#ffffff";

                let lightColor = SetupUtilities.lightenColor(color, 10);
                 
                frameElement.style.border= `${borderWidthPx} solid`;
                
                // frameElement.style.border= `${borderWidthPx} solid ${color}`;
                // frameElement.style.borderBottomColor = lightColor;
                // frameElement.style.borderTopColor = lightColor;

                // console.log(`The current canvas width is ${canvasWidth}`);
 }

/**
 * @param {number} numberToConvert
 */
function ConvertToString(numberToConvert){
    return  numberToConvert.toString() +"px";
}


/**
 * @param {number} imageRatio
 */
 function GetPercentageOfCanvasOccupacy(imageRatio){
    
    if (imageRatio === 1) return imageScreenSpaceRatios[0];
    else if (imageRatio < 1) return imageScreenSpaceRatios[1];
    else if (imageRatio > 1) return imageScreenSpaceRatios[2];
    else return imageScreenSpaceRatios[0]
}


</script>    

<div class="relative h-full w-full ">

    <!-- Declaring Frame Element -->
    <div bind:this={testBox} class="bg-red-500 testBox">
        <p>hola</p>
    </div>


    <!-- Declaring Image Element -->
    <div bind:this={imageElement} class="bg-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 imageElement">
        <img src={currentImageProperties.src} alt="Description of the image" class="w-full h-full object-cover">
    </div>

     <!-- Declaring Frame Element -->
    <div bind:this={frameElement} class="frameElement">
    </div>
</div>


<style>

.frameElement{
    width: 10px;
    height: 10px;
    background-color: rgba(26, 72, 139, 1);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    z-index: 2;
    border-radius:2px; 
    padding: 0px;
    box-sizing: content-box;
    box-shadow: 2.9px 5.8px 5.8px hsl(0deg 0% 0% / 0.41) inset, 2.9px 5.8px 5.8px hsl(0deg 0% 0% / 0.41);   
}

.frameElement::after{
    border-image-source: url("/referenceTextures/Oak_512.png"); /* Replace with your image URL */
    border-image-slice: 100; /* Slices the image */
    border-image-width: 30px; /* Width of the border image */
    border-image-outset: 10px; /* Extends the border image beyond the border box */
    border-image-repeat: stretch; /* How the border image is repeated */
}

.imageElement{
    visibility: visible;
}

.testBox{
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
}
</style>

<!-- <button on:click={printHello}>Click me</button> -->


