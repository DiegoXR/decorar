<script>
    import { currentFrameProperties } from "../../../lib/FrameStore.js";
    import { onMount, onDestroy } from "svelte";
    import ThreeJsScene from "$lib/components/ThreeJSscene.svelte";
    import Toggle from "$lib/components/Toggle.svelte";
    import * as THREEJsUtilities from "../../../lib/ThreeJsUtilities.js";
    import DropdownInitializable from "$lib/components/DropdownInitializable.svelte";
    import { currentImageProperties } from "../../../lib/ImageStore.js";

    let isFrameVisible = false;

    /**
     * @type {number[]}
     */
    let selectedInnerSizeV2;
    /**
     * @type {import("svelte/store").Unsubscriber}
     */
    let currentImageSubscription;

    let currentImage = {
        src: "",
        alt: "",
        description: "",
        availableSizes: [[0, 0]],
        defaultSize: [0, 0],
    };

    let frameObject = THREEJsUtilities.emptyFrame;

    InitializeImageSubscription();

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
        currentFrameProperties.set(frameObject);
    }

    ////////////////////////////////// UPDATE INNER SIZES v2 OF FRAME

    $: handleInnerSizesChangeV2(selectedInnerSizeV2);

    /**
     * @param {number[]} selectedSize
     */
    function handleInnerSizesChangeV2(selectedSize) {
        if (selectedSize != null) {
            frameObject.innerWidth = selectedSize[0];
            frameObject.innerHeight = selectedSize[1];
            currentFrameProperties.set(frameObject);
        }
    }
    /////////////////////////////////

    onDestroy(() => {
        console.log("Destroying Customize Page");
        if (currentImageSubscription) {
            currentImageSubscription();
        }
    });

    function InitializeImageSubscription() {
        currentImageSubscription = currentImageProperties.subscribe((value) => {
            currentImage = value;
            console.log(
                `From customize, the selecte image is ${currentImage.availableSizes}`,
            );
        });
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

<Toggle bind:isChecked={isFrameVisible} />
<DropdownInitializable
    bind:selectedOption={selectedInnerSizeV2}
    availableSizes={currentImage.availableSizes}
    defaultSize={currentImage.defaultSize}
/>

<!-- {#if isFrameVisible}
    <p>El toggle está activado en el componente padre.</p>
{/if} -->
