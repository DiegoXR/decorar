<script>
    import { onMount } from "svelte";
    import { frameConfigurationStore } from "../../../../lib/FrameConfigurationStore.js";
    import * as THREEJsConfiguration from "../../../../lib/SceneConstants.js";
    import NumberInput from "./NumberInput.svelte";
    import MeasureIcon from "../../IconComponents/MeasureIcon.svelte";

    /** @type {boolean} */
    let isInitialized = false;
    /** @type {number} */
    let selectedFrameWidth = 0;
    /** @type {typeof THREEJsConfiguration.startingFrameConfiguration} */
    let localFrameConfiguration;

    // Subscribe to store
    const unsubscribe = frameConfigurationStore.subscribe(value => {
        localFrameConfiguration = value;
    });

    onMount(() => {
        // Initialize values from configuration
        selectedFrameWidth = DefineFrameBorderWidthInitialSize();
        isInitialized = true;
        
        return () => {
            unsubscribe();
        };
    });

    // Track previous state of frame width
    /** @type {number | undefined} */
    let previousFrameWidth;
    
    // Watch for changes to selectedFrameWidth and update the store
    $: if (isInitialized && selectedFrameWidth !== undefined && previousFrameWidth !== selectedFrameWidth) {
        previousFrameWidth = selectedFrameWidth;
        handleFrameWidthChange(selectedFrameWidth);
    }

    /**
     * @param {number} selectedSize
     */
    function handleFrameWidthChange(selectedSize) {
        // Create a new object to ensure reactivity
        const updatedConfig = { ...localFrameConfiguration, FrameBorderWidth: selectedSize * 0.01 }; // convert to meters
        frameConfigurationStore.set(updatedConfig);
    }

    /**
     * @returns {number}
     */
    function DefineFrameBorderWidthInitialSize() {       
        return localFrameConfiguration.FrameBorderWidth === 0 
            ? THREEJsConfiguration.frameBorderWidthMinimalSize * 100 
            : localFrameConfiguration.FrameBorderWidth * 100;
    }
</script>

<!-- Control Layout -->
<div class="grid grid-cols-[10%_20%_70%] items-center w-full">
    
    <!-- Icon -->
    <div class="flex justify-start">
        <MeasureIcon/>
    </div>
    
    <!-- Label -->
    <div class="flex justify-start">
        <p class="text-center body-3">Width</p>
    </div>
    
    <!-- Control Type -->
    <div class="flex justify-end">
        <NumberInput 
            bind:selectedOption={selectedFrameWidth} 
            defaultValue={DefineFrameBorderWidthInitialSize()} 
            label=""
        />
    </div>
</div>
