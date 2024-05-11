<script>
    import { currentSelectedFrameDimensionsStore } from "../../../lib/CurrentSelectedFrameStore.js";
    import { onMount, onDestroy } from "svelte";
    import ThreeJsScene from "$lib/components/ThreeJSscene.svelte";
    import Toggle from "$lib/components/Toggle.svelte";
    import * as THREEJsUtilities from "../../../lib/ThreeJsUtilities.js";
    import DropdownInitializable from "$lib/components/DropdownInitializable.svelte";
    import {currentSelectedImageStore } from "../../../lib/CurrentSelectedImageStore.js";
    import {currentGlobalPropertiesStore } from "../../../lib/GlobalPropertiesStore.js";

    let isFrameVisible = false;

    /**
     * @type {number[]}
     */
    let selectedImageSize;
    /**
     * @type {import("svelte/store").Unsubscriber}
     */
    let currentImageSubscription;

     /**
     * @type {import("svelte/store").Unsubscriber}
     */
    let currentPropertiesSubscription;

    let currentSelectedImage = {
        src: "",
        alt: "",
        description: "",
        availableSizes: [[0, 0]],
        defaultSize: [0, 0],
    };

    // let startingProperties = {
    //     ImageWidth: 0,
    //     ImageHeigh:  0,
    //     FrameIsVisible: true
    // }

    let currentReferenceProperties = THREEJsUtilities.startingThreeJSGlobalProperties;

    let frameObject = THREEJsUtilities.emptyFrame;

    InitializeImageSubscription();
    InitializePropertiesSubscription();

    onMount(() => {
        console.log("Mounting Customize Page");
    });

    ////////////////////////////////// UPDATE FRAME VISIBILITY
    $: handleFrameVisibilityChange(isFrameVisible);

    /**
     * @param {boolean} newValue
     */
    function handleFrameVisibilityChange(newValue) {
        frameObject.isVisible = newValue;
        currentSelectedFrameDimensionsStore.set(frameObject);
    }

    ////////////////////////////////// UPDATE INNER SIZES v2 OF FRAME

    $: handleImageSizeChange(selectedImageSize);

    /**
     * @param {number[]} selectedSize
     */
    function handleImageSizeChange(selectedSize) {
        if (selectedSize != null) {
            // frameObject.innerWidth = selectedSize[0];
            // frameObject.innerHeight = selectedSize[1];
            // currentSelectedFrameDimensionsStore.set(frameObject);
            currentReferenceProperties.ImageSize = selectedSize;
            currentGlobalPropertiesStore.set(currentReferenceProperties);
        }
    }
    /////////////////////////////////

    onDestroy(() => {
        console.log("Destroying Customize Page");      
        console.log(`CUSTOMIZE : Saving the properties before leaving the page ${currentReferenceProperties.ImageSize}`);
        currentGlobalPropertiesStore.set(currentReferenceProperties);
        
        if (currentImageSubscription) currentImageSubscription();
            
        if (InitializePropertiesSubscription) InitializePropertiesSubscription();


    });

    function InitializeImageSubscription() {
        currentImageSubscription = currentSelectedImageStore.subscribe((value) => {
            currentSelectedImage = value;
            console.log(
                `CUSTOMIZE :, Getting the current Image from the explorer ${currentSelectedImage.availableSizes}`,
            );
        });
    }

    function InitializePropertiesSubscription() {
        currentPropertiesSubscription = currentGlobalPropertiesStore.subscribe((value) => {
            currentReferenceProperties = value;
            console.log(
                `CUSTOMIZE, Getting  the currentGlobal propeties`,
            );
        });
    }

    function DefineDropdownDefaultImageSize(){

        if (currentSelectedImage.availableSizes.some(subArr => subArr[0] === currentReferenceProperties.ImageSize[0] && 
             subArr[1] === currentReferenceProperties.ImageSize[1])){
                console.log(`CUSTOMIZE, Ignoring the default option and keeping the previous one :${currentReferenceProperties.ImageSize}`);
                return currentReferenceProperties.ImageSize;
             }else{
                console.log(`CUSTOMIZE, Ignoring the previous option and selecting the new default option :${currentSelectedImage.defaultSize}`);
                return currentSelectedImage.defaultSize;
             }

    }
</script>

<div class="bg-gray-100 w-full h-[50vh]">
    <ThreeJsScene></ThreeJsScene>
</div>

<!-- <button
    on:click={() => {
        $changeColorMessage = !$changeColorMessage;
    }}>Cambiar Color del Material</button
> -->
<p>FRAME VISIBILITY</p>
<Toggle bind:isChecked={isFrameVisible} />

<p>IMAGE SIZE</p>
<DropdownInitializable
    bind:selectedOption={selectedImageSize}
    availableSizes={currentSelectedImage.availableSizes}
    defaultSize={DefineDropdownDefaultImageSize()}
/>

<!-- {#if isFrameVisible}
    <p>El toggle está activado en el componente padre.</p>
{/if} -->
