<script>
    import { onMount } from "svelte";
    import { frameConfigurationStore } from "../../../../lib/FrameConfigurationStore.js";
    import * as SetupUtilities from "../../../../lib/SetupUtilities.js";
    import TextSelector from "$lib/components/UIComponents/GroupComponents/TextSelector.svelte";
    import MaterialIcon from "../../IconComponents/MaterialIcon.svelte";

    /** @type {boolean} */
    let isInitialized = false;
    /** @type {string} */
    let selectedFrameMaterial;
    /** @type {typeof import("../../../../lib/SceneConstants.js").startingFrameConfiguration} */
    let localFrameConfiguration;

    // Available frame material options
    const frameMaterialOptions = Object.values(SetupUtilities.FrameMaterial);

    // Subscribe to store
    const unsubscribe = frameConfigurationStore.subscribe(value => {
        localFrameConfiguration = value;
        selectedFrameMaterial = value.FrameMaterial;
    });

    onMount(() => {
        isInitialized = true;
        return () => {
            unsubscribe();
        };
    });

    // Track previous state of frame material
    /** @type {string | undefined} */
    let previousFrameMaterial;
    
    // Watch for changes to selectedFrameMaterial and update the store
    $: if (isInitialized && selectedFrameMaterial && previousFrameMaterial !== selectedFrameMaterial) {
        previousFrameMaterial = selectedFrameMaterial;
        handleFrameMaterialChange(selectedFrameMaterial);
    }

    /**
     * @param {string} material
     */
    function handleFrameMaterialChange(material) {
        // Create a new object to ensure reactivity
        const updatedConfig = { ...localFrameConfiguration, FrameMaterial: material };
        frameConfigurationStore.set(updatedConfig);
    }
</script>

<!-- Control Layout -->
<div class="grid grid-cols-[10%_20%_70%] items-center w-full">
    
    <!-- Icon -->
    <div class="flex justify-start">
        <MaterialIcon/>
    </div>
    
    <!-- Label -->
    <div class="flex justify-start">
        <p class="text-center body-3">Material</p>
    </div>
    
    <!-- Control Type -->
    <div class="flex justify-end">
        <TextSelector 
            availableOptions={frameMaterialOptions}
            defaultOption={localFrameConfiguration?.FrameMaterial || "Wood"}
            bind:selectedOption={selectedFrameMaterial}
            isActive={true}
        />
    </div>
</div>
