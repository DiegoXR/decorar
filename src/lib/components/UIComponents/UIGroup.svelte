<script>
    import Separator from "./CustomMadeComponents/Separator.svelte";
    import ImageSizeControl from "./GroupComponents/ImageSizeControl.svelte";
    import FrameControl from "./GroupComponents/FrameControl.svelte";
    import PasspartoutControl from "./GroupComponents/PasspartoutControl.svelte";
    import Generate3DButton from "./GroupComponents/Generate3DButton.svelte";
</script>

<!-- Unified UI Group with vertical alignment -->
<div class="flex flex-col justify-center items-center gap-6 w-full lg:px-40 xl:px-10 2xl:px-10 bg-ui-background p-4 rounded-2xl">
  
  <!-- Two-column layout for all UI controls -->
  <div class="grid grid-cols-2 w-full gap-x-6 gap-y-2">
    
    <!-- Row 1: Image Size -->
    <ImageSizeControl />
    
    <!-- Separator that spans both columns -->
    <div class="col-span-2">
      <Separator width="full" margin="my-0" />
    </div>
    
    <!-- Row 2: Frame -->
    <FrameControl />
    
    <!-- Separator that spans both columns -->
    <div class="col-span-2">
      <Separator width="full" margin="my-0" />
    </div>
    
    <!-- Row 3: Passepartout (ahora maneja su propio renderizado condicional) -->
    <PasspartoutControl />
    
    <!-- Generate 3D Button -->
    <div class="col-span-2">
      <Generate3DButton />
    </div>
  </div>
</div>