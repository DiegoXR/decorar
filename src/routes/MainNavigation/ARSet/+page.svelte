<script>
import GltfExporter from "$lib/components/GLTFExporter.svelte";
import "@google/model-viewer";
</script>

<p>This is the Page AR Set</p>

<!-- <div class="w-full h-full bg-slate-500"> -->
  Hello
  <!-- <model-viewer
    src="/ModelExample.glb"
    ar
    ar-placement="wall"
    camera-controls
    touch-action="pan-y"
    alt="A 3D model of some wall art"
  >
  <button slot="ar-button" class="h-100 w-100 bg bg-blue-600 position: static top-0 left-0">
    👋 Activate AR
  </button>

  <button slot="ar-button" style="background-color: red; border-radius: 4px; border: none; position: absolute; top: 16px; right: 16px; ">
    👋 Activate AR
</button>
  </model-viewer> -->


  <div class="w-full h-[50vh] bg-green-300">
    <GltfExporter></GltfExporter>
  </div>

  
<!-- </div> -->
