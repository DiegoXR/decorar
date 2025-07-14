<script>
    import SetupView from "$lib/components/SetupView.svelte";
    import TestingComponent from "$lib/components/UIComponents/TestingComponent.svelte";
    import { setContext } from "svelte";
    import { onMount, onDestroy } from "svelte";
    import { writable } from "svelte/store";
    import UiGroup from "$lib/components/UIComponents/UIGroup.svelte";


    /**
     * @type {HTMLDivElement}
     */
    let parentElement;


    // Create a writable store for the width
    const canvasWidthStore = writable(0);
    canvasWidthStore.set(window.innerWidth);

   
    //GetInitialWidth();
    setContext("parentWidth", canvasWidthStore);

    onMount(() => {
      
        InitializeSpaceResizing();
        // console.log("SETUP SetuPage Mounting Completed");
        UpdateWidth();
    });

    onDestroy(() => {
        // console.log("Destroying SETUP PAGE and saving frame configuration");
    });

    function InitializeSpaceResizing() {
        window.addEventListener("resize", UpdateWidth);
    }

    function UpdateWidth() {
        if (parentElement != null) {
            canvasWidthStore.set(parentElement.clientWidth);
            // console.log("width sent to store");
       }
    }
</script>

<div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[60%_40%] lg:grid-cols-1 xl:grid-cols-[60%_40%] 2xl:grid-cols-[60%_40%] bg-white w-full h-full">
    <!-- 3D VIEW -->
    <div bind:this={parentElement} class="bg-white h-[50vh] md:h-auto lg:h-auto xl:h-auto">
        <SetupView></SetupView>
    </div>
       
    <!-- UI GROUP -->
    <div class="flex items-start lg:items-center justify-center h-min-[50vh] md:h-auto lg:h-auto w-full">
        <div class="w-full p-2 mb-10 m-0 lg:ml-40 lg:mr-40 xl:m-0 "> 
            <UiGroup></UiGroup> 
        </div>       
    </div>
</div>