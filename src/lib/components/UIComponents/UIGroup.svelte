<script>
    import ToggleInitializable from "$lib/components/UIComponents/ToggleInitializable.svelte";
    import DropdownInitializable from "$lib/components/UIComponents/DropdownInitializable.svelte";
    import { onMount, onDestroy } from "svelte";
    import { frameConfigurationStore } from "../../../lib/FrameConfigurationStore.js";
    import * as THREEJsUtilities from "../../../lib/ThreeJsUtilities.js";
    import { currentSelectedImageStore } from "../../../lib/CurrentSelectedImageStore.js";
    import SelectorNumberInitializable from "$lib/components/UIComponents/SelectorNumberInitializable.svelte";

    /**
     * @type {boolean}
     */
    let isInitialized = false;

    /**
     * @type {boolean}
     */
    let isFrameVisible;

      /**
     * @type {number[]}
     */
     let selectedImageSize;

      /**
     * @type {number}
     */
     let selectedFrameWidth;

    let localFrameConfiguration = THREEJsUtilities.startingFrameConfiguration;

    /**
     * @type {import("svelte/store").Unsubscriber}
     */
    let FrameConfigurationUnsubscription;

    /**
     * @type {import("svelte/store").Unsubscriber}
     */
    let currentImageSubscription;

    let localImageProperties = {
        src: "",
        alt: "",
        description: "",
        availableSizes: [[0, 0]],
        defaultSize: [0, 0],
    };

    InitializeImageSubscription();
    InitialFrameConfigurationSubscription();
    
    
    onMount(() => {
        isInitialized = true;
    });

    onDestroy(() => {});

    function InitialFrameConfigurationSubscription() {
        FrameConfigurationUnsubscription = frameConfigurationStore.subscribe(
            (value) => {
                localFrameConfiguration = value;
                console.log(
                    `UI Group says that the current available sizes in the config are : ${localFrameConfiguration.ImageSize}, Visi : ${localFrameConfiguration.availableSizes}`,
                );
                console.log(
                    `UI Group says that the current available sizes in the selected image are : ${localImageProperties.defaultSize}, Visi : ${localImageProperties.availableSizes}`,
                );
            },
        );

        FrameConfigurationUnsubscription();
    }

    function InitializeImageSubscription() {
        currentImageSubscription = currentSelectedImageStore.subscribe(
            (value) => {
                localImageProperties = value;
            },
        );

        currentImageSubscription();
    }

    ////////////////////////////////// UPDATE FRAME VISIBILITY
    $: if (isInitialized) {
        handleFrameVisibilityChange(isFrameVisible);
    }

    /**
     * @param {boolean} isFrameVisible
     */
    function handleFrameVisibilityChange(isFrameVisible) {
        localFrameConfiguration.FrameIsVisible = isFrameVisible;
        frameConfigurationStore.set(localFrameConfiguration);
    }

     ///////////////////////////////////// UPDATE IMAGE SIZE

     $: if (isInitialized) {
        handleImageSizeChange(selectedImageSize);
  }

    /**
     * @param {number[]} selectedSize
     */
    function handleImageSizeChange(selectedSize) {
        if (selectedSize != null) {
            localFrameConfiguration.ImageSize = selectedSize;
            frameConfigurationStore.set(localFrameConfiguration);
        }
    }
    ///////////////////////////////////////// UPDATE FRAME WIDTH

    $: if (isInitialized) {
        handleFrameWidthChange(selectedFrameWidth);
  }

    /**
     * @param {number} selectedSize
     */
    function handleFrameWidthChange(selectedSize) {
        if (selectedSize != null) {
            localFrameConfiguration.FrameBorderWidth = selectedSize/100;
            frameConfigurationStore.set(localFrameConfiguration);
        }
    }
    ////////////////////////////////////////






    function DefineDropdownDefaultImageSize() {
        if (
            localImageProperties.availableSizes.some(
                (subArr) =>
                    subArr[0] === localFrameConfiguration.ImageSize[0] &&
                    subArr[1] === localFrameConfiguration.ImageSize[1],
            )
        ) {
            console.log(
                `CUSTOMIZE, Ignoring the default option and keeping the previous one :${localFrameConfiguration.ImageSize}`,
            );
            return localFrameConfiguration.ImageSize;
        } else {
            console.log(
                `CUSTOMIZE, Ignoring the previous option and selecting the new default option :${localImageProperties.defaultSize}`,
            );
            return localImageProperties.defaultSize;
        }
    }
</script>

<ToggleInitializable
    bind:isChecked={isFrameVisible}
    initialStatus={localFrameConfiguration.FrameIsVisible}
/>

<p>IMAGE SIZE</p>
<DropdownInitializable bind:selectedOption={selectedImageSize} availableSizes = {localImageProperties.availableSizes} defaultSize={DefineDropdownDefaultImageSize()}
/>
<p>FRAME BORDER WIDTH (cm)</p>
<SelectorNumberInitializable bind:selectedOption={selectedFrameWidth} defaultValue = "5"></SelectorNumberInitializable>
<!-- <input type="number" id="quantity" name="quantity" min="1" max="10" step="1" value="1"> -->
