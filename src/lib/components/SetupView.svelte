<!-- <div class="bg-blue-100 w- h-[50vh]" -->
<script>
import { onMount, onDestroy } from "svelte";
import { currentSelectedImageStore } from "../CurrentSelectedImageStore.js";
import { frameConfigurationStore } from "../FrameConfigurationStore.js";
import { getContext } from 'svelte';
import * as THREEJsUtilities from "../ThreeJsUtilities.js";

/**
* @type {import("svelte/store").Unsubscriber}
*/
let currentImageSubscription;

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


let localFrameConfiguration = THREEJsUtilities.startingFrameConfiguration;

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

CanvasWidthChangeSubscription();

onMount(() => {

    //console.log("Mounting VIEW");
    InitializeImageSubscription();
    InitialFrameConfigurationSubscription();

});

onDestroy(() => {
        
        if (currentImageSubscription) currentImageSubscription();
        if (currentCanvasWidthSubscription) currentCanvasWidthSubscription();

        // frameConfigurationStore.set(localFrameConfiguration);

    });

function InitializeImageSubscription() {
    currentImageSubscription = currentSelectedImageStore.subscribe(
        (value) => {
            
            currentImageProperties = value;        
            console.log("CANVAS/ I got the Image Update");
        },
    );

    currentImageSubscription();
}

function InitialFrameConfigurationSubscription(){
    
    currentImageSubscription = frameConfigurationStore.subscribe(
            (value) => {
                localFrameConfiguration = value;

                localFrameConfiguration.availableSizes = currentImageProperties.availableSizes;
                localFrameConfiguration.ImageSrc = currentImageProperties.src;
                localFrameConfiguration.ImageSize = currentImageProperties.defaultSize;

                imageRatio = localFrameConfiguration.ImageSize[0]/localFrameConfiguration.ImageSize[1];
                            
                //console.log(`from the image subscription the current parent width from child is: ${canvasWidth}`);
                
                // Based on the image ratio, we determinate the default space of the canvas that will occupy the image html element.
                let selectedPercentageOfCanvasOccupacy= GetPercentageOfCanvasOccupacy(imageRatio);

                // We calculate a converion factor meter to pixel
                meterToPixelconversionFactor =  (canvasWidth * selectedPercentageOfCanvasOccupacy) /localFrameConfiguration.ImageSize[0];
                
                // We apply these values to the image html element
                imageElement.style.width = ConvertToString(localFrameConfiguration.ImageSize[0] * meterToPixelconversionFactor);
                imageElement.style.height = ConvertToString(localFrameConfiguration.ImageSize[1] * meterToPixelconversionFactor);

                // We apply these values to the frame html element
                frameElement.style.width = ConvertToString(localFrameConfiguration.ImageSize[0] * meterToPixelconversionFactor);
                frameElement.style.height = ConvertToString(localFrameConfiguration.ImageSize[1] * meterToPixelconversionFactor);
                              
                console.log(
                    `CANVAS/frame Update/Image scr : ${localFrameConfiguration.ImageSrc}, Visi : ${localFrameConfiguration.FrameIsVisible}` ); 
            },
        );
        // By calling currentImageSubscription, we make sure the subscription only happens once
        //currentImageSubscription();
}

function CanvasWidthChangeSubscription(){
    currentCanvasWidthSubscription = canvasWidthStore.subscribe((value) => {
    canvasWidth = value;
    // console.log(`from parent width subscription the current parent width is: ${canvasWidth}`);
    // if (imageElement != null) imageElement.style.width = (canvasWidth/2).toString() + "px"; 
  });
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

<div class="relative bg-gray-200 h-full w-full ">

    <!-- Declaring Image Element -->
    <div bind:this={imageElement} class="bg-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <img src={currentImageProperties.src} alt="Description of the image" class="w-full h-full object-cover">
    </div>

     <!-- Declaring Frame Element -->
    <div bind:this={frameElement} class="frameElement">
        <!-- Content here -->
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
    z-index: 1;
    border:solid 10px rgb(0, 0, 0);
    border-radius:2px; 
    padding:0px;
    box-sizing: content-box;
}

</style>

<!-- <button on:click={printHello}>Click me</button> -->



