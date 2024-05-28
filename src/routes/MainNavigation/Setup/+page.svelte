<script>
    import SetupView from "$lib/components/SetupView.svelte";
    import TestingComponent from "$lib/components/UIComponents/TestingComponent.svelte";
    import { setContext } from "svelte";
    import { onMount, onDestroy } from "svelte";
    import { writable } from "svelte/store";

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
        console.log("Mounting SetuPpAGE");
        InitializeSpaceResizing();
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
    class="bg-yellow-100 w-full h-[50vh]"
>
    <div class="bg-red-100 w-full h-[50vh]">
        <!-- {console.log('HTML Parent section rendered')} -->
        <SetupView></SetupView>
    </div>

    <div class="bg-blue-500 w-full">

    </div>


</div>


<!-- flex items-center justify-center -->