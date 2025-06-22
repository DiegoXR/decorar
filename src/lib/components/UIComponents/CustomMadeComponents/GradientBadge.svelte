<!-- GradientBadge.svelte -->
<script>
  export let size = '30px';
</script>

<div class="gradient-badge" style="width: {size}; height: {size};"></div>

<style>
  .gradient-badge {
    border-radius: 100%;
    background-image: 
      radial-gradient(circle at 60% 60%, #F0C27B, transparent 100%);
      /* radial-gradient(circle at 50% 50%, #4B1248, transparent 40%); */
    background-blend-mode: screen;
    filter: blur(2px);
  }
</style>
