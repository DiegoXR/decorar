<script>
  import SceneToGltf from "$lib/components/SceneToGltf.svelte";
  import "@google/model-viewer";
  import { getContext } from "svelte";
  import { onMount, onDestroy } from "svelte";

  let testTextAR = getContext("testTextM5");

  onMount(() => {
    console.log("Mouning AR Page");
  });
</script>

<p>This is the Page AR Set</p>

<div class="w-full h-[50vh] bg-green-300">
  <h1>AR Says {testTextAR}</h1>
  <SceneToGltf></SceneToGltf>
</div>
