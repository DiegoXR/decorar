<script>
    import Scene from "$lib/components/scene.svelte";
    import {
        selectedImageObject,
        changeColorMessage,
    } from "../../../stores.js";
    import { onMount } from "svelte";
    import { Canvas } from "@threlte/core";
    import Scene2 from "$lib/components/scene2.svelte";
    import Model5 from "$lib/components/Model5.svelte";
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

<h1>Received data: {dataObject.description}</h1>
<p>This is the Page Customizew</p>
<div class="bg-gray-100 w-full h-[50vh]">
    
    
    <!-- <Canvas>
        <Scene></Scene>
    </Canvas> -->

<!-- This is the three.js version -->
    <Model5></Model5>
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
