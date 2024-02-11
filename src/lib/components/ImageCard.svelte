<script>
    // @ts-nocheck

    /**
     * @type {{ description: any;  }}
     */

    import { onMount, beforeUpdate, afterUpdate, onDestroy } from "svelte";

    export let image;
    let browserWidth;
    let targetImageContainerHeight;

    onMount(() => {
        let diego = image.description;
        console.log({ diego });
        browserWidth = window.innerWidth;
        // console.log( " component loaded my witdh is" + browserWidth);
        targetImageContainerHeight = Math.round(
            (image.height / image.width) * browserWidth,
        );
        console.log(" target height is" + targetImageContainerHeight);
    });
    // beforeUpdate(() => console.log("before update"));
    // afterUpdate(() => console.log("after update"));
    // onDestroy(() => console.log("destroyed"));

    function myFunction() {
        alert('Button was clicked!');
    }
</script>

<div class="flex flex-col mt-4">
    <div class="h-16 bg-gray-200">{image.description}</div>
    <div class="h-{targetImageContainerHeight} bg-gray-500">
        <img src={image.src} alt={image.alt} />
    </div>
    <div class="h-16 bg-gray-200 flex flex-row justify-end p-5">
        <button
        class="mx-2 mb-2 flex items-center justify-center  bg-white px-3 py-3" on:click={myFunction}>
        <img src="/GoogleLogo.svg" alt="googleLogo" class="h-6 w-6" />
        <!-- <span class=" font-medium text-gray-700">Continue with Google</span> -->
      </button>
        <div class="bg-red-100 h-6 w-6"> </div>
        <div class="bg-red-100 h-6 w-6"> </div>
    </div>
</div>
