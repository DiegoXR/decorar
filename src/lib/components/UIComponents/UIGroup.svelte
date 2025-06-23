<script>
    import Dropdown from "$lib/components/UIComponents/CustomMadeComponents/Dropdown.svelte";
    import { onMount, onDestroy } from "svelte";
    import { frameConfigurationStore } from "../../../lib/FrameConfigurationStore.js";
    import * as THREEJsConfiguration from "../../../lib/SceneConstants.js";
    import * as SetupUtilities from "../../../lib/SetupUtilities.js"
    import { currentSelectedImageStore } from "../../../lib/CurrentSelectedImageStore.js";
    import FB_CustomButtonGroup from "$lib/components/UIComponents/FB_CustomButtonGroup.svelte";
    import NumberInput from "$lib/components/UIComponents/GroupComponents/NumberInput.svelte";
    import Toggle from "$lib/components/UIComponents/GroupComponents/Toggle.svelte";
    import TextSelector from "$lib/components/UIComponents/GroupComponents/TextSelector.svelte";
    import ScreenSizeDebugger from "./CustomMadeComponents/ScreenSizeDebugger.svelte";
    import Separator from "./CustomMadeComponents/Separator.svelte";
    import ImageSize from "../IconComponents/ImageSize.svelte";
    import Frame from "../IconComponents/Frame.svelte";
    import Passpartout from "../IconComponents/Passpartout.svelte";
    import BaseButton from "$lib/components/UIComponents/CustomMadeComponents/BaseButton.svelte";

    /**
     * @type {boolean}
     */
    let isInitialized = false;

    /**
     * @type {boolean}
     */
    let isFrameVisible;

    /**
     * @type {boolean}
     */
    let isPasspartoutVisible;

      /**
     * @type {number[]}
     */
     let selectedImageSize;


     /**
     * @type {string}
     */
     let selectedPasspartoutType;

      /**
     * @type {string}
     */
     let selectedPasspartoutCutoutSizeType;

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
        
        // If Frame is not visible the passPartout disappear by default
        if (!isFrameVisible)
         isPasspartoutVisible = false;

        
        frameConfigurationStore.set(localFrameConfiguration);       
        // console.log(`Frame Depyh is : ${localFrameConfiguration.FrameDepth}`);
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
            
            // console.log(`Define border width ${localFrameConfiguration.FrameBorderWidth}`);
            
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
            
            // console.log(`Define border depth ${localFrameConfiguration.FrameDepth}`);
            
            frameConfigurationStore.set(localFrameConfiguration);
        }
    }

     ////////////////////////////////// UPDATE PASSPARTOUT VISIBILITY
     $: if (isInitialized) {
        handlePassPartoutVisibilityChange(isPasspartoutVisible);
    }

    /**
     * @param {boolean} isPasspartoutVisible
     */
    function handlePassPartoutVisibilityChange(isPasspartoutVisible) {
        
        
        
        // If passPartout is enabled and the frame is not visible, the frame will become visible by default
        // if (isPasspartoutVisible && !isFrameVisible){
        //     isPasspartoutVisible = false;
        //     //frameConfigurationStore.set(localFrameConfiguration);
        //     return;
        // }
        if (isPasspartoutVisible != undefined){

            localFrameConfiguration.PasspartoutIsVisible = isPasspartoutVisible;
            frameConfigurationStore.set(localFrameConfiguration);
        }
        
    }

     ///////////////////////////////////// UPDATE PASSPARTOUT CUTOUT SIZE

     $: if (isInitialized) {
        handlePasspartoutCutoutSizeChange(selectedPasspartoutCutoutSizeType);
    }

    /**
     * @param {string} selectedSize
     */
    function handlePasspartoutCutoutSizeChange(selectedSize) {
        if (selectedSize != null) {
            localFrameConfiguration.PasspartoutCutoutSize = selectedSize;
            frameConfigurationStore.set(localFrameConfiguration);
        }
    }

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

    /**
   * @param {{ [s: string]: any; } | ArrayLike<any>} enumType
   */
    function ExtractOptionsFromEnum(enumType){
        // Convert the enum object to an array of key-value pairs
        const enumDictionnary =  Object.entries(enumType);
        // Extract the values and return them as an array of strings
        return enumDictionnary.map(kv => kv[1].toString());
    }

    function DefineFrameBorderWidthInitialSize(){       
        return localFrameConfiguration.FrameBorderWidth === 0 ? THREEJsConfiguration.frameBorderWidthMinimalSize * 100 :  localFrameConfiguration.FrameBorderWidth * 100;
    }

    function DefineFrameBorderDepthInitialSize(){
        return localFrameConfiguration.FrameDepth === 0 ? THREEJsConfiguration.frameDepthMinimalSize * 100 :  localFrameConfiguration.FrameDepth * 100;
    }
</script>



<!-- <FB_CustomButtonGroup></FB_CustomButtonGroup> -->

<!-- Unified UI Group with vertical alignment -->
<div class="flex flex-col justify-center items-center mt-4 gap-6 w-full lg:px-40 xl:px-10 2xl:px-10 ">
  <!-- Two-column layout for all UI controls -->
  <div class="grid grid-cols-2 w-full gap-x-6 gap-y-2">
    
    <!-- Row 1: Image Size -->
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
    
    <!-- Separator that spans both columns -->
    <div class="col-span-2">
      <Separator width="full" margin="my-0" />
    </div>
    
    <!-- Row 2: Frame -->
    <div class="grid grid-cols-[20%_60%_20%] items-center">
      <div class="flex justify-center">
          <Frame/>
      </div>
        <div class="flex justify-start">
          <p class="text-center body-3">Frame</p>
        </div>
        <div class="flex justify-center">
          <Toggle 
            bind:isChecked={isFrameVisible} 
            initialStatus={localFrameConfiguration.FrameIsVisible} 
            id="frame-toggle"
            variant="primary"
          />
        </div>      
    </div>
    <div class="flex flex-col gap-1 bg-white items-center justify-center w-full">
      <div class="flex justify-center w-full">
        <NumberInput 
          bind:selectedOption={selectedFrameWidth} 
          defaultValue={DefineFrameBorderWidthInitialSize()} 
          label="Width"
        />
      </div>
      <div class="flex justify-center w-full">
        <NumberInput 
          bind:selectedOption={selectedFrameDepth} 
          defaultValue={DefineFrameBorderDepthInitialSize()} 
          label="Thickness"
        />
      </div>
    </div>
    
    <!-- Separator that spans both columns -->
    <div class="col-span-2">
      <Separator width="full" margin="my-0" />
    </div>
    
    <!-- Row 3: Passepartout (conditionally rendered) -->
    {#if isFrameVisible}
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
      />
    </div>
    {/if}
    {/if}
    
    <!-- <div class="col-span-2 mt-4">
      <Separator width="full" margin="my-2" />
    </div> -->
    
    <!-- Generate 3D Button -->
    <div class="col-span-2 flex justify-center mt-10">
      <BaseButton 
        label="Generate 3D"
        variant="BaseHighlighted"
        class="button-4 hidden sm:block"
        on:click={async () => {
          const { goto } = await import('$app/navigation');
          await goto('/MainNavigation/3DPage');
        }}
      />
    </div>
    
    <!-- <ScreenSizeDebugger /> -->
      
  </div>
</div>