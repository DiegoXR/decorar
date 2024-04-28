<script>
    import { currentFrameProperties } from "../../../lib/FrameStore.js";
    import { onMount, onDestroy } from "svelte";
    import ThreeJsScene from "$lib/components/ThreeJSscene.svelte";
    import Toggle from "$lib/components/Toggle.svelte";
    import Dropdown from "$lib/components/Dropdown.svelte";
    import {extractDimensionFromString} from '../../../lib/FormatConversionUtilities.js';
    import * as THREEJsUtilities from "../../../lib/ThreeJsUtilities.js";

    let isFrameVisible = false;

    /**
     * @type {string}
     */
    let selectedInnerSize = '1 x 1';

    let frameObject = THREEJsUtilities.emptyFrame;
    
    onMount(() => {
        console.log("Mounting Customize Page");
    });

    ////////////////////////////////// UPDATE FRAME VISIBILITY
    $: handleFrameVisibilityChange(isFrameVisible);

    /**
     * @param {boolean} newValue
     */
    function handleFrameVisibilityChange(newValue){
        frameObject.isVisible = newValue;
        currentFrameProperties.set(frameObject);
        console.log("Frame Visibility Updated");
    }

    ////////////////////////////////// UPDATE INNER SIZES OF FRAME
    
    $: handleInnerSizesChange(selectedInnerSize);

    /**
     * @param {string} newValue
     */
     function handleInnerSizesChange(newValue){
        frameObject.innerWidth = extractDimensionFromString(newValue, true);
        frameObject.innerHeight = extractDimensionFromString(newValue, false);
        currentFrameProperties.set(frameObject);
        console.log("Inner sizes Updated");
    }   
    /////////////////////////////////

    // onDestroy(unsubscribe);
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
<Dropdown bind:selectedOption={selectedInnerSize}></Dropdown>

<!-- {#if isFrameVisible}
    <p>El toggle está activado en el componente padre.</p>
{/if} -->
