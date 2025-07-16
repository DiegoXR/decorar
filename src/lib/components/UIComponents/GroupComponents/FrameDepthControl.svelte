<script>
    import { onMount } from "svelte";
    import { frameConfigurationStore } from "../../../../lib/FrameConfigurationStore.js";
    import * as THREEJsConfiguration from "../../../../lib/SceneConstants.js";
    import NumberInput from "./NumberInput.svelte";
    import FrameIcon from "../../IconComponents/FrameIcon.svelte";

    /** @type {boolean} */
    let isInitialized = false;
    /** @type {number} */
    let selectedFrameDepth = 0;
    /** @type {typeof THREEJsConfiguration.startingFrameConfiguration} */
    let localFrameConfiguration;

    // Subscribe to store
    const unsubscribe = frameConfigurationStore.subscribe(value => {
        localFrameConfiguration = value;
    });

    onMount(() => {
        // Initialize values from configuration
        selectedFrameDepth = DefineFrameBorderDepthInitialSize();
        isInitialized = true;
        
        return () => {
            unsubscribe();
        };
    });

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
    function handleFrameDepthChange(selectedSize) {
        // Create a new object to ensure reactivity
        const updatedConfig = { ...localFrameConfiguration, FrameDepth: selectedSize * 0.01 }; // convert to meters
        frameConfigurationStore.set(updatedConfig);
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

<!-- Control Layout -->
<div class="grid grid-cols-[10%_20%_70%] items-center w-full">
    
    <!-- Icon -->
    <div class="flex justify-start">
        <FrameIcon/>
    </div>
    
    <!-- Label -->
    <div class="flex justify-start">
        <p class="text-center body-3">Frame Depth</p>
    </div>
    
    <!-- Control Type -->
    <div class="flex justify-end">
        <NumberInput 
            bind:selectedOption={selectedFrameDepth} 
            defaultValue={DefineFrameBorderDepthInitialSize()} 
            label=""
        />
    </div>
</div>


<!-- <div class="flex justify-center">
    <Toggle 
        bind:isChecked={isFrameVisible} 
        initialStatus={localFrameConfiguration.FrameIsVisible} 
        id="frame-toggle"
        variant="primary"
        on:change
    />
</div>      -->