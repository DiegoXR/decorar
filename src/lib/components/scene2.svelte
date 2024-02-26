<script lang="ts">
    import { T } from "@threlte/core";
    import { onMount } from "svelte";
    import { selectedImageObject } from "../../stores.js";
    import { useLoader } from "@threlte/core";
    import { Texture, TextureLoader } from "three";

    let texture: Texture | null = null;
    let ratio = null;

    let imageSize = [1, 1, 1];

    let dataObject = {
        width: 1,
        height: 1,
        src: "",
        description: "",
        alt: "",
    };

    const textureLoader = new TextureLoader();
    $: texture = textureLoader.load(dataObject.src);

    function calculateRatio(width: number, height: number) {
        ratio = width / height;

        if (ratio > 1) imageSize[0] = ratio; // Portrait Image (Horizontal)
        else if (ratio < 1) imageSize[1] = 1 + (1 - ratio); // Landscape Image (Vertical)
    }

    let unsubscribe = selectedImageObject.subscribe((value) => {
        dataObject = value;

        console.log(dataObject.description + "From scene2");
        calculateRatio(dataObject.width, dataObject.height);
    });
</script>

<!-- Camera and Lights -->
<T.PerspectiveCamera
    fov={60}
    makeDefault
    position={[0, 0, 2]}
    rotation={[0, 0, 0]}
/>
<T.DirectionalLight position={[0, 0, 1]} intensity="0" />
<T.AmbientLight color={"white"} intensity="1.2" />

<T.Mesh>
    <T.PlaneGeometry args={imageSize} />
    <T.MeshStandardMaterial map={texture} />
</T.Mesh>
