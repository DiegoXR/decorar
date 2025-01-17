<script>
    import ToggleInitializable from "$lib/components/UIComponents/ToggleInitializable.svelte";
    import DropdownInitializable from "$lib/components/UIComponents/DropdownInitializable.svelte";
    import { onMount, onDestroy } from "svelte";
    import { frameConfigurationStore } from "../../../lib/FrameConfigurationStore.js";
    import * as THREEJsConfiguration from "../../../lib/SceneConstants.js";
    import * as SetupUtilities from "../../../lib/SetupUtilities.js"
    import { currentSelectedImageStore } from "../../../lib/CurrentSelectedImageStore.js";
    import SelectorNumberInitializable from "$lib/components/UIComponents/SelectorNumberInitializable.svelte";
    import DropdownStringInitializable from "./DropdownStringInitializable.svelte";
    import FB_CustomButtonGroup from "$lib/components/UIComponents/FB_CustomButtonGroup.svelte";
    import FB_Dropdown from "$lib/components/UIComponents/FB_Dropdown.svelte";
    import FB_NumberInput from "$lib/components/UIComponents/FB_NumberInput.svelte";
    import FB_Toggle from "$lib/components/UIComponents/FB_Toggle.svelte";
    import FB_PasspartoutDropdown from "$lib/components/UIComponents/FB_PasspartoutDropdown.svelte";
    import {Label, Toast} from 'flowbite-svelte';
    import { PaperPlaneOutline } from 'flowbite-svelte-icons';
    import FrameIcon from "../IconComponents/FrameIcon.svelte";



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

                console.log( "mira Diego" +  localFrameConfiguration.PasspartoutIsVisible);
                // console.log(
                //     `UI Group says that the current Depth  : ${localFrameConfiguration.FrameDepth}`
                // );
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
            console.log("Passpartout is :" + isPasspartoutVisible)
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



<FB_CustomButtonGroup></FB_CustomButtonGroup>


<div class="flex flex-col justify-evenly items-center content-between mt-4" >
    <Toast dismissable={false}>    
         <div class="flex content-between justify-start ml-5 gap-16">
            <div class="flex flex-col justify-evenly items-center content-between gap-2">
                <FrameIcon imageColor="#000000" frameColor="#d3d3d3" passpartoutColor="#d3d3d3"/>
                <p>Image</p>
            </div> 
            <FB_Dropdown bind:selectedOption={selectedImageSize} availableSizes = {localImageProperties.availableSizes} defaultSize={DefineDropdownDefaultImageSize()} ></FB_Dropdown>                   
         </div>
    </Toast>    
</div>

<div class="flex flex-col justify-evenly items-center content-between  mt-4  gap-[10px]" >
    <!-- <Label for="textarea-id" class="mb-2">Image Size</Label> -->
    <Toast dismissable={false}>           
         <div class="flex content-between justify-start ml-5 gap-4">
            <div class="flex flex-col justify-evenly items-center content-between gap-2">
                <FrameIcon imageColor="#d3d3d3" frameColor="#000000" passpartoutColor="#d3d3d3"/>
                <p>Frame</p>
                <FB_Toggle bind:isChecked={isFrameVisible} initialStatus={localFrameConfiguration.FrameIsVisible} id = a></FB_Toggle>
            </div>
            <div class=" flex flex-col items-center content-between justify-evenly gap-1">              
                <FB_NumberInput bind:selectedOption={selectedFrameWidth} defaultValue = {DefineFrameBorderWidthInitialSize()} label = {"Width"}></FB_NumberInput>
                <FB_NumberInput bind:selectedOption={selectedFrameDepth} defaultValue = {DefineFrameBorderDepthInitialSize()} label = {"Depth"}></FB_NumberInput>

            </div>           
         </div>
    </Toast>    
</div>

{#if isFrameVisible}
<div class="flex flex-col justify-evenly items-center content-between  mt-4  gap-[10px]" >
    <Toast dismissable={false}>    
         <div class="flex content-between justify-start ml-1 gap-16">
            <div class="flex flex-col justify-evenly items-center content-between gap-2">
                <FrameIcon imageColor="#d3d3d3" frameColor="#d3d3d3" passpartoutColor="#000000"/>
                <p>Passepartout</p>
                <FB_Toggle bind:isChecked={isPasspartoutVisible} initialStatus={localFrameConfiguration.PasspartoutIsVisible} id = b></FB_Toggle>
            </div>
            <div class=" flex flex-col items-center content-between justify-evenly gap-[10px]">              
                 <FB_PasspartoutDropdown isActive = {isPasspartoutVisible}  bind:selectedOption={selectedPasspartoutCutoutSizeType} availableOptions = {ExtractOptionsFromEnum(SetupUtilities.PasspartoutCutoutSize)} defaultOption={localFrameConfiguration.PasspartoutCutoutSize}></FB_PasspartoutDropdown>
            </div>           
         </div>
    </Toast>    
</div>
{/if}