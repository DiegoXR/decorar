<script>
    import SetupView from "$lib/components/SetupView.svelte";
    import TestingComponent from "$lib/components/UIComponents/TestingComponent.svelte";
    import { setContext } from "svelte";
    import { onMount, onDestroy } from "svelte";
    import { writable } from "svelte/store";
    import ToggleInitializable from "$lib/components/UIComponents/ToggleInitializable.svelte";
    import { frameConfigurationStore } from "../../../lib/FrameConfigurationStore.js"
    import * as THREEJsUtilities from "../../../lib/ThreeJsUtilities.js";


    /**
     * @type {HTMLDivElement}
     */
    let parentElement;

     /**
     * @type {boolean}
     */
     let isFrameVisible;

     let localFrameConfiguration = THREEJsUtilities.startingFrameConfiguration;

    /**
    * @type {import("svelte/store").Unsubscriber}
    */
    let FrameConfigurationUnsubscription;

     /**
     * @type {boolean}
     */
     let isInitialized = false;

    // Create a writable store for the width
    const canvasWidthStore = writable(0);
    canvasWidthStore.set(window.innerWidth);

   
    GetInitialWidth();
    setContext("parentWidth", canvasWidthStore);


    InitialFrameConfigurationSubscription();
    onMount(() => {
      
        InitializeSpaceResizing();

        
        isInitialized = true;
        console.log("SETUP SetuPage Mounting Completed");
    });

    onDestroy(() => {
        console.log("Destroying SETUP PAGE and saving frame configuration");

        // frameConfigurationStore.set(localFrameConfiguration);
    });

    function InitializeSpaceResizing() {
        window.addEventListener("resize", UpdateWidth);
    }

    function GetInitialWidth(){
        canvasWidthStore.set(window.innerWidth);       
    }

    function UpdateWidth() {
        if (parentElement != null) {
            canvasWidthStore.set(parentElement.clientWidth);
            console.log("width sent to store");
       }
    }

    function InitialFrameConfigurationSubscription(){
    
        FrameConfigurationUnsubscription = frameConfigurationStore.subscribe(
            (value) => {
                localFrameConfiguration = value;
                console.log(
                    `SET UP Page/frame Update/Image scr : ${localFrameConfiguration.ImageSrc}, Visi : ${localFrameConfiguration.FrameIsVisible}` );               
            },
        );

        FrameConfigurationUnsubscription();
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

</script>

<div
    bind:this={parentElement}
    class="bg-yellow-800 w-full h-full flex flex-col"
>
    <div class="bg-orange-800 flex-1">
        <!-- {console.log('HTML Parent section rendered')} -->
        <SetupView></SetupView>
    </div>

     <div class="bg-blue-500 flex-1">
        <p>FRAME VISIBILITY</p>
        <ToggleInitializable bind:isChecked={isFrameVisible} initialStatus = {localFrameConfiguration.FrameIsVisible}/>
    </div> 


</div>


<!-- flex items-center justify-center -->