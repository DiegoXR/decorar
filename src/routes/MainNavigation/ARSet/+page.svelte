<p>This is the Page AR Set</p>

 <script>



    
</script> 
  
 <div class="w-full h-full bg-slate-500"> 
Hello 
<model-viewer src="/ModelExample.glb" ar ar-placement="wall" camera-controls touch-action="pan-y" alt="A 3D model of some wall art"></model-viewer>

<model-viewer ar camera-controls touch-action="pan-y" src="/ModelExample.glb" alt="A 3D model of an astronaut">
  <button slot="ar-button" style="background-color: white; border-radius: 4px; border: none; position: absolute; top: 16px; right: 16px; ">
      👋 Activate AR
  </button>
</model-viewer>
</div>
