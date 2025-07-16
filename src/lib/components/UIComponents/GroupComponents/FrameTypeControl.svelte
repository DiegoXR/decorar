<script>
    import { onMount } from "svelte";
    import { frameConfigurationStore } from "../../../../lib/FrameConfigurationStore.js";
    import * as THREEJsConfiguration from "../../../../lib/SceneConstants.js";
    import FrameIcon from "../../IconComponents/FrameIcon.svelte";
    import TextSelector from "./TextSelector.svelte";

    /** @type {boolean} */
    let isInitialized = false;
    /** @type {string} */
    let selectedFrameType = "";
    /** @type {typeof THREEJsConfiguration.startingFrameConfiguration} */
    let localFrameConfiguration;

    // Available frame type options
    const frameTypeOptions = ["No Frame", "Standard Frame"];

    // Subscribe to store
    const unsubscribe = frameConfigurationStore.subscribe(value => {
        localFrameConfiguration = value;
        // Set the initial frame type based on FrameIsVisible
        selectedFrameType = value.FrameIsVisible ? "Standard Frame" : "No Frame";
    });

    onMount(() => {
        isInitialized = true;
        
        return () => {
            unsubscribe();
        };
    });
    
    // Track previous state of frame type
    /** @type {string | undefined} */
    let previousFrameType;
    
    // Watch for changes to selectedFrameType and update the store
    $: if (isInitialized && previousFrameType !== selectedFrameType) {
        previousFrameType = selectedFrameType;
        handleFrameTypeChange(selectedFrameType);
    }

    /**
     * @param {string} frameType
     */
    function handleFrameTypeChange(frameType) {
        // Set FrameIsVisible based on the selected frame type
        const isFrameVisible = frameType === "Standard Frame";
        
        // Create a new object to ensure reactivity
        const updatedConfig = { ...localFrameConfiguration, FrameIsVisible: isFrameVisible };
        frameConfigurationStore.set(updatedConfig);
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
        <p class="text-center body-3">Type</p>
    </div>
    
    <!-- Control Type -->
    <div class="flex justify-end">
        <TextSelector 
            bind:selectedOption={selectedFrameType}
            availableOptions={frameTypeOptions}
            defaultOption={selectedFrameType}
            isActive={true}
            on:change
        />
        
    </div>
</div>
