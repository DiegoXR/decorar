<script>
    import { onMount } from "svelte";
    import { frameConfigurationStore } from "../../../../lib/FrameConfigurationStore.js";
    import Passpartout from "../../IconComponents/Passpartout.svelte";
    import Toggle from "./Toggle.svelte";
    
    /** @type {boolean} */
    let shouldRender = false;

    /** @type {boolean} */
    let isPasspartoutVisible = false;

    /** @type {boolean} */
    let isInitialized = false;
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
    });

    onMount(() => {
        isInitialized = true;
        return () => {
            unsubscribe();
        };
    });

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
<!-- Control Layout -->
<div class="grid grid-cols-[10%_20%_70%] items-center w-full">
    
    <!-- Icon -->
    <div class="flex justify-start">
        <Passpartout />
    </div>
    
    <!-- Label -->
    <div class="flex justify-start">
        <p class="text-center body-3">Visibility</p>
    </div>
    
    <!-- Control Type -->
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
{/if}
