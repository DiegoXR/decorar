<script>
    import { onMount, onDestroy } from "svelte";
    import ThreeJsScene from "$lib/components/ThreeJSscene.svelte";
    import * as THREEJsUtilities from "../../../lib/ThreeJsUtilities.js";
    import DropdownInitializable from "$lib/components/DropdownInitializable.svelte";
    import { currentSelectedImageStore } from "../../../lib/CurrentSelectedImageStore.js";
    import { currentGlobalPropertiesStore } from "../../../lib/GlobalPropertiesStore.js";
    import ToggleInitializable from "$lib/components/ToggleInitializable.svelte";


    /**
     * @type {boolean}
     */
     let isInitialized = false;

    /**
     * @type {boolean}
     */
     let isFrameVisible;

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
    let currentPropertiesUnsubscription;


    let currentSelectedImage = THREEJsUtilities.startingSelectedImage;
    let currentReferenceProperties = THREEJsUtilities.startingGlobalProperties;

    InitializePropertiesSubscription();
    InitializeImageSubscription();
    

    onMount(() => {
        console.log("Mounting Customize Page");
        isInitialized = true;
    });

    ////////////////////////////////// UPDATE FRAME VISIBILITY
    $: if (isInitialized) {
    handleFrameVisibilityChange(isFrameVisible);
  }

    /**
     * @param {boolean} isFrameVisible
     */
    function handleFrameVisibilityChange(isFrameVisible) {
        console.log(
            `CUSTOMIZE : Handle visibility change ${isFrameVisible}`,
        );
        currentReferenceProperties.FrameIsVisible = isFrameVisible;
        currentGlobalPropertiesStore.set(currentReferenceProperties);
    }

    ////////////////////////////////// UPDATE IMAGE SIZES

    $: if (isInitialized) {
        handleImageSizeChange(selectedImageSize);
  }

    /**
     * @param {number[]} selectedSize
     */
    function handleImageSizeChange(selectedSize) {
        if (selectedSize != null) {
            currentReferenceProperties.ImageSize = selectedSize;
            currentGlobalPropertiesStore.set(currentReferenceProperties);
        }
    }
    /////////////////////////////////

    onDestroy(() => {
        console.log("Destroying Customize Page");
        console.log(
            `CUSTOMIZE : Saving the properties before leaving the page ${currentReferenceProperties.ImageSize} - ${currentReferenceProperties.FrameIsVisible}`,
        );
        currentGlobalPropertiesStore.set(currentReferenceProperties);

        //if (currentImageSubscription) currentImageSubscription();

    });

    function InitializeImageSubscription() {
        currentImageSubscription = currentSelectedImageStore.subscribe(
            (value) => {
                currentSelectedImage = value;
                console.log(
                    `CUSTOMIZE :, Getting the current Image from the explorer ${currentSelectedImage.availableSizes}`,
                );
            },
        );
        currentImageSubscription();

    }

    function InitializePropertiesSubscription() {
        currentPropertiesUnsubscription = currentGlobalPropertiesStore.subscribe(
            (value) => {
                currentReferenceProperties = value;
                console.log(`CUSTOMIZE, Getting  the currentGlobal propeties, visibility is ${currentReferenceProperties.FrameIsVisible}`);
            },
        );
        currentPropertiesUnsubscription();
    }

    function DefineDropdownDefaultImageSize() {
        if (
            currentSelectedImage.availableSizes.some(
                (subArr) =>
                    subArr[0] === currentReferenceProperties.ImageSize[0] &&
                    subArr[1] === currentReferenceProperties.ImageSize[1],
            )
        ) {
            console.log(
                `CUSTOMIZE, Ignoring the default option and keeping the previous one :${currentReferenceProperties.ImageSize}`,
            );
            return currentReferenceProperties.ImageSize;
        } else {
            console.log(
                `CUSTOMIZE, Ignoring the previous option and selecting the new default option :${currentSelectedImage.defaultSize}`,
            );
            return currentSelectedImage.defaultSize;
        }
    }

    function DefineInitialToggleValue(){
        return currentReferenceProperties.FrameIsVisible;
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
<!-- <Toggle bind:isChecked={isFrameVisible} /> -->
<ToggleInitializable bind:isChecked={isFrameVisible} initialStatus = {currentReferenceProperties.FrameIsVisible}/>


<p>IMAGE SIZE</p>
<DropdownInitializable bind:selectedOption={selectedImageSize} availableSizes = {currentSelectedImage.availableSizes} defaultSize={DefineDropdownDefaultImageSize()}
/>

<!-- {#if isFrameVisible}
    <p>El toggle está activado en el componente padre.</p>
{/if} -->
