<script>
    import { onMount } from "svelte";
    import { frameConfigurationStore } from "../../../../lib/FrameConfigurationStore.js";
    import * as THREEJsConfiguration from "../../../../lib/SceneConstants.js";
    import Frame from "../../IconComponents/Frame.svelte";
    import Toggle from "./Toggle.svelte";
    import NumberInput from "./NumberInput.svelte";

    /** @type {boolean} */
    let isFrameVisible = false;   
    /** @type {boolean} */
    let isInitialized = false;
    /** @type {number} */
    let selectedFrameWidth = 0;
    /** @type {number} */
    let selectedFrameDepth = 0;
    /** @type {typeof THREEJsConfiguration.startingFrameConfiguration} */
    let localFrameConfiguration;

    // Subscribe to store
    const unsubscribe = frameConfigurationStore.subscribe(value => {
        localFrameConfiguration = value;
        isFrameVisible = value.FrameIsVisible;
    });

    onMount(() => {
        // Initialize values from configuration
        selectedFrameWidth = DefineFrameBorderWidthInitialSize();
        selectedFrameDepth = DefineFrameBorderDepthInitialSize();
        isInitialized = true;
        
        return () => {
            unsubscribe();
        };
    });
    
    // Variable to track the previous value of isFrameVisible
    let previousFrameVisibleState = isFrameVisible;
    
    // Watch for changes to isFrameVisible and update the store
    $: if (isInitialized && previousFrameVisibleState !== isFrameVisible) {
        previousFrameVisibleState = isFrameVisible;
        
        // Create a new object to ensure reactivity
        const updatedConfig = { ...localFrameConfiguration, FrameIsVisible: isFrameVisible };
        frameConfigurationStore.set(updatedConfig);
    }

    // Track previous state of frame width
    /** @type {number | undefined} */
    let previousFrameWidth;
    
    // Watch for changes to selectedFrameWidth and update the store
    $: if (isInitialized && selectedFrameWidth !== undefined && previousFrameWidth !== selectedFrameWidth) {
        previousFrameWidth = selectedFrameWidth;
        handleFrameWidthChange(selectedFrameWidth);
    }

    // Track previous state of frame depth
    /** @type {number | undefined} */
    let previousFrameDepth;
    
    // Watch for changes to selectedFrameDepth and update the store
    $: if (isInitialized && selectedFrameDepth !== undefined && previousFrameDepth !== selectedFrameDepth) {
        previousFrameDepth = selectedFrameDepth;
        handleFrameDepthChange(selectedFrameDepth);
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
     * @param {number} selectedSize
     */
    function handleFrameDepthChange(selectedSize) {
        // Create a new object to ensure reactivity
        const updatedConfig = { ...localFrameConfiguration, FrameDepth: selectedSize * 0.01 }; // convert to meters
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

    /**
     * @returns {number}
     */
    function DefineFrameBorderDepthInitialSize() {
        return localFrameConfiguration.FrameDepth === 0 
            ? THREEJsConfiguration.frameDepthMinimalSize * 100 
            : localFrameConfiguration.FrameDepth * 100;
    }
</script>

<div class="grid grid-cols-[20%_60%_20%] items-center">
    <div class="flex justify-center">
        <Frame/>
    </div>
    <div class="flex justify-start">
        <p class="text-center body-3">Frame</p>
    </div>
    <div class="flex justify-center">
        <Toggle 
            bind:isChecked={isFrameVisible} 
            initialStatus={localFrameConfiguration.FrameIsVisible} 
            id="frame-toggle"
            variant="primary"
            on:change
        />
    </div>      
</div>
<div class="flex flex-col gap-1 bg-white items-center justify-center w-full">
    <div class="flex justify-center w-full">
        <NumberInput 
            bind:selectedOption={selectedFrameWidth} 
            defaultValue={DefineFrameBorderWidthInitialSize()} 
            label="Width"
        />
    </div>
    <div class="flex justify-center w-full">
        <NumberInput 
            bind:selectedOption={selectedFrameDepth} 
            defaultValue={DefineFrameBorderDepthInitialSize()} 
            label="Thickness"
        />
    </div>
</div>
