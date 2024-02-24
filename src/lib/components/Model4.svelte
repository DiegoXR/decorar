<script lang="ts">
    import { T, asyncWritable, useTask } from "@threlte/core";
    import { Float, interactivity } from "@threlte/extras";
    import { TextureLoader } from "three";
    import { useLoader } from "@threlte/core";
    import { selectedImageObject } from "../../stores.js";

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

    selectedImageObject.subscribe((value) => {
        dataObject = value;

        console.log(dataObject.description + "From Model4");
        let ratio = calculateRatio(dataObject.width, dataObject.height);
    });

    function calculateRatio(width: number, height: number) {
        console.log(
            `Width is : ${width}, Height is : ${height} and the ratio is ${
                width / height
            }`,
        );

        ratio = width / height;

        if (ratio > 1) imageSize[0] = ratio;
        else if (ratio < 1) imageSize[1] = 1 + (1 - ratio);


        console.log(imageSize);
    }
</script>

<T.Mesh>
    <T.PlaneGeometry args={imageSize} />
    {#if $texture}
        <T.MeshStandardMaterial map={$texture} />
    {/if}
    <!-- <T.MeshBasicMaterial color="red" /> -->
</T.Mesh>
