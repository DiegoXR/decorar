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

    // function GetInitialWidth(){
    //     // canvasWidthStore.set(window.innerWidth);
        
    //     if (parentElement != null) {
    //         canvasWidthStore.set(parentElement.clientWidth);
    //         console.log("width sent to store FIRST TIME");
    //    }
    // }

    function UpdateWidth() {
        if (parentElement != null) {
            canvasWidthStore.set(parentElement.clientWidth);
            console.log("width sent to store");
       }
    }
</script>

<div
    class="container mx-0 flex flex-wrap pt-4 bg-red-600 h-[100vh] items-stretch"
>
    <div bind:this={parentElement} class=" w-full md:w-1/2 p-6 flex flex-col bg-orange-500">
        <!-- {console.log('HTML Parent section rendered')} -->
        <SetupView></SetupView>
    </div>
    
     <div class="bg-blue-500 w-full md:w-1/2  p-6 flex flex-col ">
        <UiGroup></UiGroup>
    </div> 
        
</div>


<!-- container mx-auto flex items-center flex-wrap pt-4 pb-12

bg-yellow-800 w-full h-full flex flex-col lg:flex-row -->