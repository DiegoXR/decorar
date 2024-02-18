<script>
    import Scene from "$lib/components/scene.svelte";
    import { selectedImageObject } from "../../../stores.js";
    import { onMount } from "svelte";
    import { Canvas } from '@threlte/core'
    let data = "initial value";

    let dataObject = {
        width: "",
        height: "",
        src: "",
        description: "",
        alt: "",
    };

    selectedImageObject.subscribe((value) => {
        dataObject = value;
    });

    onMount(() => {
        console.log(dataObject);
    });
</script>

<p>Received data: {dataObject}</p>
<p>This is the Page Customizew</p>
<div class="bg-gray-500 w-full h-[50vh]">
    hello
    <Canvas>
        <Scene></Scene>
    </Canvas>
</div>
