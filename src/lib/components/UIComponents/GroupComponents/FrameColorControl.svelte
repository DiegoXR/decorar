<script>
    import { onMount } from "svelte";
    import { frameConfigurationStore } from "../../../../lib/FrameConfigurationStore.js";
    import * as SetupUtilities from "../../../../lib/SetupUtilities.js";
    import TextSelector from "$lib/components/UIComponents/GroupComponents/TextSelector.svelte";

    /** @type {boolean} */
    let isInitialized = false;
    /** @type {string} */
    let selectedColor;
    /** @type {typeof import("../../../../lib/SceneConstants.js").startingFrameConfiguration} */
    let localFrameConfiguration;

    // Available color options
    const colorOptions = Object.values(SetupUtilities.FrameColor);

    // Subscribe to store
    const unsubscribe = frameConfigurationStore.subscribe(value => {
        localFrameConfiguration = value;
        selectedColor = value.FrameColor;
    });

    onMount(() => {
        isInitialized = true;
        return () => {
            unsubscribe();
        };
    });

    // Track previous state of color
    /** @type {string | undefined} */
    let previousColor;
    
    // Watch for changes to selectedColor and update the store
    $: if (isInitialized && selectedColor && previousColor !== selectedColor) {
        previousColor = selectedColor;
        handleColorChange(selectedColor);
    }

    /**
     * @param {string} color
     */
    function handleColorChange(color) {
        // Create a new object to ensure reactivity
        const updatedConfig = { ...localFrameConfiguration, FrameColor: color };
        frameConfigurationStore.set(updatedConfig);
    }
</script>

<!-- Control Layout -->
<div class="grid grid-cols-[10%_20%_70%] items-center w-full">
    
    <!-- Icon -->
    <div class="flex justify-start">
        <div class="w-6 h-6 flex items-center justify-center">
            <div class="w-4 h-4 rounded-full" style="background-color: {selectedColor.toLowerCase()};"></div>
        </div>
    </div>
    
    <!-- Label -->
    <div class="flex justify-start">
        <p class="text-center body-3">Color</p>
    </div>
    
    <!-- Control Type -->
    <div class="flex justify-end">
        <TextSelector 
            availableOptions={colorOptions}
            defaultOption={localFrameConfiguration?.FrameColor || "Yellow"}
            bind:selectedOption={selectedColor}
            isActive={true}
        />
    </div>
</div>
