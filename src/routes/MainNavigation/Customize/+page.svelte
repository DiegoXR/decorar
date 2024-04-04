<script>
    import {currentFrameProperties} from "../../../lib/FrameStore.js";
    import { onMount } from "svelte";
    import ThreeJsScene from "$lib/components/ThreeJSscene.svelte";
    import Toggle from "$lib/components/Toggle.svelte";

    let isCheckedInParent = false;



    onMount(() => {     
        console.log("Mouning Customize Page");
    });

//////////////////////////////////
    $: if (isCheckedInParent) {
    console.log('El toggle está ON');

    const FrameObject = {
    isVisible: true,
    innerWidth: 1,
    innerHeight: 1,
    framewidth: 1,
    frameDepth: 1
}

    currentFrameProperties.set(FrameObject);

  } 
  else
  {
    console.log('El toggle está OFF');
    const FrameObject2 = {
    isVisible: false,
    innerWidth: 1,
    innerHeight: 1,
    framewidth: 1,
    frameDepth: 1
}
currentFrameProperties.set(FrameObject2);
  }
//////////////////////////////////
</script>

<div class="bg-gray-100 w-full h-[50vh]">
    <ThreeJsScene></ThreeJsScene>
</div>

 <!-- <button
    on:click={() => {
        $changeColorMessage = !$changeColorMessage;
    }}>Cambiar Color del Material</button
> -->

<Toggle bind:isChecked={isCheckedInParent} />

{#if isCheckedInParent}
  <p>El toggle está activado en el componente padre.</p>
{/if} 