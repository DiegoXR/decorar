<script lang="ts">
    import { T, asyncWritable, useTask } from "@threlte/core";
    import { Float, interactivity } from "@threlte/extras";
    import { MeshToonMaterial, TextureLoader } from "three";
    import { useLoader } from "@threlte/core";
    import { selectedImageObject } from "../../stores.js";
    import { onMount } from "svelte";
    import { onDestroy } from "svelte";

    let texture = null;
    let ratio = null;

    let imageSize = [1, 1, 1];

    let dataObject = {
        width: 1,
        height: 1,
        src: "",
        description: "",
        alt: "",
    };

    function calculateRatio(width: number, height: number) {
        ratio = width / height;

        if (ratio > 1) imageSize[0] = ratio; // Portrait Image (Horizontal)
        else if (ratio < 1) imageSize[1] = 1 + (1 - ratio); // Landscape Image (Vertical)
    }

    // texture = useLoader(TextureLoader).load(dataObject.src);

    onMount(() => {
        console.log("Model 4 Mounted");

        let unsubscribe = selectedImageObject.subscribe((value) => {
            dataObject = value;

            console.log(dataObject.description + "From Model4");
            calculateRatio(dataObject.width, dataObject.height);
            // console.log(dataObject.src);
         
        });

        // onDestroy(bye);
    });
</script>

<T.Mesh>
    <T.PlaneGeometry args={imageSize} />
    <!-- {#if $texture}
        <T.MeshStandardMaterial map={$texture} color = {"#ff0000"}/>
    {/if} -->
    <!-- <T.MeshBasicMaterial color="red" /> -->
</T.Mesh>
