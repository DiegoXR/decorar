<script>
    import { onMount } from "svelte";
    import { frameConfigurationStore } from "../../../../lib/FrameConfigurationStore.js";
    import * as SetupUtilities from "../../../../lib/SetupUtilities.js";
    import Passpartout from "../../IconComponents/Passpartout.svelte";
    import TextSelector from "./TextSelector.svelte";

    /** @type {boolean} */
    let isInitialized = false;
    /** @type {string} */
    let selectedPasspartoutCutoutSizeType;
    /** @type {typeof import("../../../../lib/SceneConstants.js").startingFrameConfiguration} */
    let localFrameConfiguration;
    /** @type {boolean} */
    let isActive = false;

    // Subscribe to store
    const unsubscribe = frameConfigurationStore.subscribe(value => {
        localFrameConfiguration = value;
        
        // Determine if this component should be active based on frame and passpartout visibility
        isActive = value.FrameIsVisible && value.PasspartoutIsVisible;
        
        // Set the initial passpartout cutout size
        selectedPasspartoutCutoutSizeType = value.PasspartoutCutoutSize;
    });

    onMount(() => {
        isInitialized = true;
        
        // Ensure isActive is properly set on mount
        if (localFrameConfiguration) {
            isActive = localFrameConfiguration.FrameIsVisible && localFrameConfiguration.PasspartoutIsVisible;
        }
        
        return () => {
            unsubscribe();
        };
    });
    
    // Reactive statement to ensure isActive is always up to date
    $: if (localFrameConfiguration) {
        isActive = localFrameConfiguration.FrameIsVisible && localFrameConfiguration.PasspartoutIsVisible;
    }
    
    // Track previous state of passpartout cutout size
    /** @type {string | undefined} */
    let previousPasspartoutCutoutSize;
    
    // Watch for changes to selectedPasspartoutCutoutSizeType and update the store
    $: if (isInitialized && selectedPasspartoutCutoutSizeType && 
           previousPasspartoutCutoutSize !== selectedPasspartoutCutoutSizeType) {
        previousPasspartoutCutoutSize = selectedPasspartoutCutoutSizeType;
        handlePasspartoutCutoutSizeChange(selectedPasspartoutCutoutSizeType);
    }

    /**
     * @param {string} selectedSize
     */
    function handlePasspartoutCutoutSizeChange(selectedSize) {
        if (selectedSize != null) {
            // Create a new object to ensure reactivity
            const updatedConfig = { ...localFrameConfiguration, PasspartoutCutoutSize: selectedSize };
            frameConfigurationStore.set(updatedConfig);
        }
    }

    /**
     * @param {{ [s: string]: any; } | ArrayLike<any>} enumType
     */
    function ExtractOptionsFromEnum(enumType) {
        // Convert the enum object to an array of key-value pairs
        const enumDictionnary = Object.entries(enumType);
        // Extract the values and return them as an array of strings
        return enumDictionnary.map(kv => kv[1].toString());
    }
</script>

<!-- Control Layout -->
<div class="grid grid-cols-[10%_20%_70%] items-center w-full">
    
    <!-- Icon -->
    <div class="flex justify-start">
        <Passpartout />
    </div>
    
    <!-- Label -->
    <div class="flex justify-start">
        <p class="text-center body-3">Size</p>
    </div>
    
    <!-- Control Type -->
    <div class="flex justify-end">
        <TextSelector 
            bind:selectedOption={selectedPasspartoutCutoutSizeType}
            availableOptions={ExtractOptionsFromEnum(SetupUtilities.PasspartoutCutoutSize)}
            defaultOption={localFrameConfiguration.PasspartoutCutoutSize}
            isActive={isActive}
            on:change={() => {
                handlePasspartoutCutoutSizeChange(selectedPasspartoutCutoutSizeType);
            }}
        />
    </div>
</div>
