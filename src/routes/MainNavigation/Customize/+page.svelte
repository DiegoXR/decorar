<script>
    import {selectedImageObject, changeColorMessage} from "../../../stores.js";
    import { onMount } from "svelte";
    import Model5 from "$lib/components/ThreeJSscene.svelte";

    let dataObject = {
        width: 1,
        height: 1,
        src: "",
        description: "",
        alt: "",
    };

    selectedImageObject.subscribe((value) => {
        dataObject = value;
    });

    onMount(() => {     
        console.log("Mouning Customize Page");
    });

</script>

<div class="bg-gray-100 w-full h-[50vh]">
    <Model5></Model5>
</div>

<h1>Received data: {dataObject.description}</h1>

<button
    on:click={() => {
        $changeColorMessage = !$changeColorMessage;
    }}>Cambiar Color del Material</button
>

<button
    class="mx-2 mb-2 h-10 w-10 bg-cyan-950"
    on:click={() => {
        $changeColorMessage = !$changeColorMessage;
        console.log("Button has been pressed");
    }}
>
</button>
