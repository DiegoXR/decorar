<script>
    import { onMount } from "svelte";
    import { frameConfigurationStore } from "../../../../lib/FrameConfigurationStore.js";
    import * as SetupUtilities from "../../../../lib/SetupUtilities.js";
    import Passpartout from "../../IconComponents/Passpartout.svelte";
    import Toggle from "./Toggle.svelte";
    import TextSelector from "./TextSelector.svelte";
    
    /** @type {boolean} */
    let shouldRender = false;

    /** @type {boolean} */
    let isPasspartoutVisible = false;

    /** @type {boolean} */
    let isInitialized = false;
    /** @type {string} */
    let selectedPasspartoutCutoutSizeType;
    /** @type {typeof import("../../../../lib/SceneConstants.js").startingFrameConfiguration} */
    let localFrameConfiguration;

    // Subscribe to store
    const unsubscribe = frameConfigurationStore.subscribe(value => {
        localFrameConfiguration = value;
        
        // Determine if this component should be rendered based on frame visibility
        shouldRender = value.FrameIsVisible;
        
        // If the frame is not visible, the passepartout should also be hidden
        if (!value.FrameIsVisible) {
            isPasspartoutVisible = false;
            // Update the store to maintain consistency
            if (value.PasspartoutIsVisible) {
                const updatedConfig = { ...value, PasspartoutIsVisible: false };
                frameConfigurationStore.set(updatedConfig);
                return; // Avoid an infinite loop by exiting here
            }
        } else {
            // Only update if the frame is visible
            isPasspartoutVisible = value.PasspartoutIsVisible;
        }
        
        selectedPasspartoutCutoutSizeType = value.PasspartoutCutoutSize;
    });

    onMount(() => {
        isInitialized = true;
        return () => {
            unsubscribe();
        };
    });

    // Track previous state of passepartout cutout size
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

    function handlePasspartoutVisibilityChange() {
        if (isPasspartoutVisible !== undefined) {
            // Create a new object to ensure reactivity
            const updatedConfig = { ...localFrameConfiguration, PasspartoutIsVisible: isPasspartoutVisible };
            frameConfigurationStore.set(updatedConfig);
        }
    }

    // Track previous state of passepartout visibility
    let previousPasspartoutVisibleState = isPasspartoutVisible;
    
    // Watch for changes to isPasspartoutVisible and update the store
    $: if (isInitialized && previousPasspartoutVisibleState !== isPasspartoutVisible) {
        previousPasspartoutVisibleState = isPasspartoutVisible;
        handlePasspartoutVisibilityChange();
    }
</script>

{#if shouldRender}
    <div class="grid grid-cols-[20%_60%_20%] items-center">
        <div class="flex justify-center">
            <Passpartout/>
        </div>
        <div class="flex justify-start">
            <p class="text-center body-3">Passepartout</p>
        </div>
        <div class="flex justify-center">
            <Toggle 
                bind:isChecked={isPasspartoutVisible} 
                initialStatus={localFrameConfiguration.PasspartoutIsVisible} 
                id="passepartout-toggle"
                variant="primary"
                on:change={e => {
                    handlePasspartoutVisibilityChange();
                }}
            />
        </div>
    </div>
    {#if isPasspartoutVisible}
    <div class="flex items-center justify-center bg-white">
        <TextSelector 
            isActive={true} 
            bind:selectedOption={selectedPasspartoutCutoutSizeType} 
            availableOptions={ExtractOptionsFromEnum(SetupUtilities.PasspartoutCutoutSize)} 
            defaultOption={localFrameConfiguration.PasspartoutCutoutSize}
            on:change={() => {
                handlePasspartoutCutoutSizeChange(selectedPasspartoutCutoutSizeType);
            }}
        />
    </div>
    {/if}
{/if}
