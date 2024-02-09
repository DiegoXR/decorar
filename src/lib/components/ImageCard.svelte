<script>
    // @ts-nocheck

    /**
     * @type {{ description: any;  }}
     */

    import { onMount, beforeUpdate, afterUpdate, onDestroy } from "svelte";

    export let image;
    let color = "red";
    const toggleColor = () => (color = color === "red" ? "blue" : "red");
    onMount(() => {

        console.log("mounted");      
        let diego = image.description;
        console.log({diego});
    });
    // beforeUpdate(() => console.log("before update"));
    // afterUpdate(() => console.log("after update"));
    // onDestroy(() => console.log("destroyed"));
</script>

<div class="flex flex-col mt-4">
    <header class="h-16 bg-gray-200">{image.description}</header>
    <div class="h-80 bg-gray-500">
        <img src={image.src} alt={image.alt} />
        <p>{image.src}</p>
    </div>
    <footer class="h-16 bg-gray-200">Footer</footer>
</div>
