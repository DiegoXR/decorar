<script>
    import ToggleInitializable from "$lib/components/UIComponents/ToggleInitializable.svelte";
    import DropdownInitializable from "$lib/components/UIComponents/DropdownInitializable.svelte";
    import { onMount, onDestroy } from "svelte";
    import { frameConfigurationStore } from "../../../lib/FrameConfigurationStore.js";
    import * as THREEJsConfiguration from "../../../lib/SceneConstants.js";
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

     /**
     * @type {number}
     */
     let selectedFrameDepth;

    let localFrameConfiguration = THREEJsConfiguration.startingFrameConfiguration;

    /**
     * @type {import("svelte/store").Unsubscriber}
     */
    let FrameConfigurationUnsubscription;

    /**
     * @type {import("svelte/store").Unsubscriber}
     */
    let currentImageSubscription;

    let IsGroupMounted = false;

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
////////////////////////////////////////////////////////////////////
    function InitialFrameConfigurationSubscription() {
        FrameConfigurationUnsubscription = frameConfigurationStore.subscribe(
            (value) => {
                localFrameConfiguration = value;
                console.log(
                    `UI Group says that the current Depth  : ${localFrameConfiguration.FrameDepth}`
                );
             },
        );

        FrameConfigurationUnsubscription();
    }
///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
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
        console.log(`Frame Depyh is : ${localFrameConfiguration.FrameDepth}`);
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
            localFrameConfiguration.FrameBorderWidth = selectedSize * 0.01; //  /100 (convert to meters)
            
            console.log(`Define border width ${localFrameConfiguration.FrameBorderWidth}`);
            
            frameConfigurationStore.set(localFrameConfiguration);
        }
    }
    //////////////////////////////////////// UPDATE FRAME DEPTH

    $: if (isInitialized) {
        handleFrameDepthChange(selectedFrameDepth);
  }

    /**
     * @param {number} selectedSize
     */
    function handleFrameDepthChange(selectedSize) {
        if (selectedSize != null) {
            localFrameConfiguration.FrameDepth = selectedSize * 0.01; // /100 (convert to meters)
            
            console.log(`Define border depth ${localFrameConfiguration.FrameDepth}`);
            
            frameConfigurationStore.set(localFrameConfiguration);
        }
    }

    ////////////////////////////////////

    function DefineDropdownDefaultImageSize() {
        if (
            localImageProperties.availableSizes.some(
                (subArr) =>
                    subArr[0] === localFrameConfiguration.ImageSize[0] &&
                    subArr[1] === localFrameConfiguration.ImageSize[1],
            )
        ) {
            // console.log(
            //     `CUSTOMIZE, Ignoring the default option and keeping the previous one :${localFrameConfiguration.ImageSize}`,
            // );
            return localFrameConfiguration.ImageSize;
        } else {
            // console.log(
            //     `CUSTOMIZE, Ignoring the previous option and selecting the new default option :${localImageProperties.defaultSize}`,
            // );
            return localImageProperties.defaultSize;
        }
    }

    function DefineFrameBorderWidthInitialSize(){       
        return localFrameConfiguration.FrameBorderWidth === 0 ? THREEJsConfiguration.frameBorderWidthMinimalSize * 100 :  localFrameConfiguration.FrameBorderWidth * 100;
    }

    function DefineFrameBorderDepthInitialSize(){
        return localFrameConfiguration.FrameDepth === 0 ? THREEJsConfiguration.frameDepthMinimalSize * 100 :  localFrameConfiguration.FrameDepth * 100;
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
<SelectorNumberInitializable bind:selectedOption={selectedFrameWidth} defaultValue = {DefineFrameBorderWidthInitialSize()}></SelectorNumberInitializable>

<p>FRAME DEPTH (cm)</p>
<SelectorNumberInitializable bind:selectedOption={selectedFrameDepth} defaultValue = {DefineFrameBorderDepthInitialSize()}></SelectorNumberInitializable>

