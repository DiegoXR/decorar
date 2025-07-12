<script>
    import { onMount } from "svelte";
    import { frameConfigurationStore } from "../../../../lib/FrameConfigurationStore.js";
    import { currentSelectedImageStore } from "../../../../lib/CurrentSelectedImageStore.js";
    import Dropdown from "$lib/components/UIComponents/CustomMadeComponents/Dropdown.svelte";
    import ImageSize from "../../IconComponents/ImageSize.svelte";

    /** @type {boolean} */
    let isInitialized = false;
    /** @type {number[]} */
    let selectedImageSize;
    /** @type {typeof import("../../../../lib/SceneConstants.js").startingFrameConfiguration} */
    let localFrameConfiguration;
    /** @type {{src: string, alt: string, description: string, availableSizes: number[][], defaultSize: number[]}} */
    let localImageProperties = {
        src: "",
        alt: "",
        description: "",
        availableSizes: [[0, 0]],
        defaultSize: [0, 0],
    };

    // Subscribe to stores
    const unsubscribeFrame = frameConfigurationStore.subscribe(value => {
        localFrameConfiguration = value;
    });

    const unsubscribeImage = currentSelectedImageStore.subscribe(value => {
        localImageProperties = value;
    });

    onMount(() => {
        isInitialized = true;
        return () => {
            unsubscribeFrame();
            unsubscribeImage();
        };
    });

    // Track previous state of selected image size
    /** @type {number[] | undefined} */
    let previousSelectedImageSize;
    
    // Watch for changes to selectedImageSize and update the store
    $: if (isInitialized && selectedImageSize && 
          (!previousSelectedImageSize || 
           previousSelectedImageSize[0] !== selectedImageSize[0] || 
           previousSelectedImageSize[1] !== selectedImageSize[1])) {
        previousSelectedImageSize = [...selectedImageSize];
        handleImageSizeChange(selectedImageSize);
    }

    /**
     * @param {number[]} selectedSize
     */
    function handleImageSizeChange(selectedSize) {
        if (selectedSize != null) {
            // Create a new object to ensure reactivity
            const updatedConfig = { ...localFrameConfiguration, ImageSize: selectedSize };
            frameConfigurationStore.set(updatedConfig);
        }
    }

    /**
     * @returns {number[]}
     */
    function DefineDropdownDefaultImageSize() {
        if (
            localImageProperties.availableSizes.some(
                (subArr) =>
                    subArr[0] === localFrameConfiguration.ImageSize[0] &&
                    subArr[1] === localFrameConfiguration.ImageSize[1],
            )
        ) {
            return localFrameConfiguration.ImageSize;
        } else {
            return localImageProperties.defaultSize;
        }
    }
</script>

<div class="grid grid-cols-[20%_60%_20%] items-center">
    <div class="flex justify-center">
        <ImageSize/>
    </div>
    <div class="flex justify-start">
        <p class="text-center body-3">Image</p>
    </div>
    <div></div>
</div>
<div class="flex items-center justify-center">
    <Dropdown 
        bind:selectedOption={selectedImageSize} 
        availableSizes={localImageProperties.availableSizes} 
        defaultSize={DefineDropdownDefaultImageSize()} 
    />
</div>
