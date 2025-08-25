<script>
    import { onMount } from "svelte";
    import { frameConfigurationStore } from "../../../../lib/FrameConfigurationStore.js";
    import * as SetupUtilities from "../../../../lib/SetupUtilities.js";
    import TextSelector from "$lib/components/UIComponents/GroupComponents/TextSelector.svelte";

    /** @type {boolean} */
    let isInitialized = false;
    /** 
     * @type {{ name: string, hex: string, hexIndicator: string } | undefined}
     */
    let selectedColor;
    /** @type {typeof import("../../../../lib/SceneConstants.js").startingFrameConfiguration} */
    let localFrameConfiguration;
    /** @type {boolean} */
    let isFrameActive = false;

    // Extract color names for the dropdown
    const colorOptions = Object.values(SetupUtilities.FrameColor).map(color => color.name);

    // Subscribe to store
    const unsubscribe = frameConfigurationStore.subscribe(value => {
        localFrameConfiguration = value;
        selectedColor = value.FrameColor;
        isFrameActive = value.FrameIsVisible;
    });

    onMount(() => {
        isInitialized = true;
        
        // Initialize the selected color name from the store
        if (localFrameConfiguration && localFrameConfiguration.FrameColor) {
            selectedColorName = localFrameConfiguration.FrameColor.name;
        }
        
        return () => {
            unsubscribe();
        };
    });

    // Selected color name from the dropdown
    /** @type {string} */
    let selectedColorName = "";
    
    // When selectedColor changes from the store, update the name for the dropdown
    $: if (selectedColor && selectedColor.name !== selectedColorName) {

        selectedColorName = selectedColor.name;
    }

    /**
     * @param {string} colorName - The display name of the color
     */
    function handleColorChange(colorName) {
        

        
        // Find the color object that matches the selected name
        const colorObject = Object.values(SetupUtilities.FrameColor).find(c => c.name === colorName);
        if (colorObject) {
            // Create a new object to ensure reactivity
            const updatedConfig = { ...localFrameConfiguration, FrameColor: colorObject };
            frameConfigurationStore.set(updatedConfig);
        }
    }
</script>

<!-- Control Layout -->
<div class="grid grid-cols-[10%_20%_70%] items-center w-full">
    
    <!-- Icon -->
    <div class="flex justify-start">
        <div class="w-6 h-6 flex items-center justify-center">
            <div class="w-4 h-4 rounded-full" style="background-color: #{selectedColor?.hexIndicator || 'FFFF00'};"></div>
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
            defaultOption={selectedColor?.name || "Blue"}
            bind:selectedOption={selectedColorName}
            isActive={isFrameActive}
            on:change={(event) => {

                handleColorChange(event.detail);
            }}
        />
    </div>
</div>
