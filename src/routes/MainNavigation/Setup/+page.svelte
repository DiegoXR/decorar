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

<div
    class="flex flex-wrap bg-white h-[100vh] w-[100vw]"
>
    <div bind:this={parentElement} class=" w-full md:w-1/2 p-6 flex flex-col h-1/2">
        <!-- {console.log('HTML Parent section rendered')} -->
        <SetupView></SetupView>
    </div>
       
     <div class="bg-white w-full md:w-1/2 p-4 flex flex-col">      
        <div class="bg-white w-full h-full"> 
             <UiGroup></UiGroup> 
         </div>       
     </div> 
     <div class=" w-full h-[150px]">
     </div>        
</div>