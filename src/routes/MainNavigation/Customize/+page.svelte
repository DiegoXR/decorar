<script>
    import Scene from "$lib/components/scene.svelte";
    import {
        selectedImageObject,
        changeColorMessage,
    } from "../../../stores.js";
    import { onMount } from "svelte";
    import { Canvas } from "@threlte/core";
    let data = "initial value";

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
        // console.log(dataObject);
        console.log("Customize Page Mounted" + dataObject.description);
    });
</script>

<p>Received data: {dataObject}</p>
<p>This is the Page Customizew</p>
<div class="bg-gray-100 w-full h-[50vh]">
    hello
    <Canvas>
        <Scene></Scene>
    </Canvas>
</div>
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
