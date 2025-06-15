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

<div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-4 bg-white w-full">
    <!-- 3D VIEW -->
    <div bind:this={parentElement} class="p-4 lg:p-6 bg-red-100">
        <SetupView></SetupView>
    </div>
       
    <!-- UI GROUP -->
    <div>
        <div class="bg-green-100 w-full h-full p-4"> 
            <UiGroup></UiGroup> 
        </div>       
    </div>
</div>