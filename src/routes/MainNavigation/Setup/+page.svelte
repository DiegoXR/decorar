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

   
    GetInitialWidth();
    setContext("parentWidth", canvasWidthStore);

    onMount(() => {
      
        InitializeSpaceResizing();
        console.log("SETUP SetuPage Mounting Completed");
    });

    onDestroy(() => {
        console.log("Destroying SETUP PAGE and saving frame configuration");
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
        <UiGroup></UiGroup>
    </div> 
        


</div>


<!-- flex items-center justify-center -->