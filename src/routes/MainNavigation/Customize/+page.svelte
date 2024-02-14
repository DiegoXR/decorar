<script>
    import { selectedImageObject } from "../../../stores.js";
    import { onMount } from "svelte";
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
<p>This is the Page Customize</p>
