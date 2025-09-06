<script>
    import { onMount } from "svelte";
    import { frameConfigurationStore } from "../../../../lib/FrameConfigurationStore.js";
    import Passpartout from "../../IconComponents/Passpartout.svelte";
    import TextSelector from "./TextSelector.svelte";
    
    /** @type {boolean} */
    let isFrameActive = false;

    /** @type {boolean} */
    let isInitialized = false;
    /** @type {string} */
    let selectedPasspartoutType = "";
    /** @type {typeof import("../../../../lib/SceneConstants.js").startingFrameConfiguration} */
    let localFrameConfiguration;

    // Available passpartout type options
    const passpartoutTypeOptions = ["No Passpartout", "Standard"];

    // Subscribe to store
    const unsubscribe = frameConfigurationStore.subscribe(value => {
        localFrameConfiguration = value;
        
        // Set whether frame is active
        isFrameActive = value.FrameIsVisible;
        
        // Set the initial passpartout type based on PasspartoutIsVisible
        if (isInitialized) {
            // Only update the UI selection if we've already initialized to avoid conflicts
            if (!value.FrameIsVisible) {
                selectedPasspartoutType = "No Passpartout";
            } else {
                selectedPasspartoutType = value.PasspartoutIsVisible ? "Standard" : "No Passpartout";
            }
        } else {
            // First-time initialization
            selectedPasspartoutType = value.PasspartoutIsVisible ? "Standard" : "No Passpartout";
        }
    });

    onMount(() => {
        isInitialized = true;
        return () => {
            unsubscribe();
        };
    });
    
    // Track previous state of passpartout type
    /** @type {string | undefined} */
    let previousPasspartoutType;
    
    // Watch for changes to selectedPasspartoutType and update the store
    $: if (isInitialized && previousPasspartoutType !== selectedPasspartoutType) {
        previousPasspartoutType = selectedPasspartoutType;
        handlePasspartoutTypeChange(selectedPasspartoutType);
    }
    
    // Always force "No Passpartout" when frame is not visible
    $: if (!isFrameActive) {
        // Always ensure selectedPasspartoutType is "No Passpartout" when frame is inactive
        // This ensures the text is shown correctly even when the component is disabled
        if (selectedPasspartoutType !== "No Passpartout") {
            selectedPasspartoutType = "No Passpartout";
        }
    }

    /**
     * @param {string} passpartoutType
     */
    function handlePasspartoutTypeChange(passpartoutType) {
        // If the frame is not visible, always set PasspartoutIsVisible to false
        // regardless of the selection
        if (!isFrameActive) {
            const updatedConfig = { ...localFrameConfiguration, PasspartoutIsVisible: false };
            frameConfigurationStore.set(updatedConfig);
            return;
        }
        
        // Set PasspartoutIsVisible based on the selected passpartout type
        const isPasspartoutVisible = passpartoutType === "Standard";
        
        // Create a new object to ensure reactivity
        const updatedConfig = { ...localFrameConfiguration, PasspartoutIsVisible: isPasspartoutVisible };
        frameConfigurationStore.set(updatedConfig);
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
        <p class="text-center body-3">Type</p>
    </div>
    
    <!-- Control Type -->
    <div class="flex justify-end">
        <TextSelector 
            bind:selectedOption={selectedPasspartoutType}
            availableOptions={passpartoutTypeOptions}
            defaultOption={!isFrameActive ? "No Passpartout" : selectedPasspartoutType}
            isActive={isFrameActive}
            on:change
        />
    </div>
</div>



 <!-- Control Type -->
 <!-- <div class="flex justify-center">
    <Toggle 
        bind:isChecked={isPasspartoutVisible} 
        initialStatus={localFrameConfiguration.PasspartoutIsVisible} 
        id="passepartout-toggle"
        variant="primary"
        on:change={e => {
            handlePasspartoutVisibilityChange();
        }}
    />
</div> -->