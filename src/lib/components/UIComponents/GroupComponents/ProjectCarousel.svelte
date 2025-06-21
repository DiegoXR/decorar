<script>
  import DesignerCard from "$lib/components/UIComponents/GroupComponents/DesignerCard.svelte";
  // Project data for carousel display
  const designers = [
    {
      image: "/landingPage/Paintings.webp",
      title: "Paintings",
      subtitle: "Any artwork anywhere",
      location: "LIVE NOW",
      tag: "FINE ART"
    },
    {
      image: "/landingPage/Wallpapers.webp",
      title: "Wallpapers",
      subtitle: "Test wallpapers before buying",
      location: "JULY 2025",
      tag: "DECORATIVE"
    },
    {
      image: "/landingPage/StreetArt.webp",
      title: "Street Art",
      subtitle: "AR for urban art planning",
      location: "JULY 2025",
      tag: "URBAN"
    },
    {
      image: "/landingPage/Carpets.webp",
      title: "Rugs",
      subtitle: "Rugs visualization",
      location: "OCTOBER 2025",
      tag: "TEXTILE"
     }
     //,
    // {
    //   image: "/landingPage/Pillows.webp",
    //   title: "Pillows",
    //   subtitle: "Accent Pieces",
    //   location: "HOME ACCESSORIES",
    //   tag: "SOFT FURNISHING"
    // }
  ];
</script>

<div class="mt-6 mb-8"> 
  <!-- Horizontal scroll for all screen sizes -->
  <div class="flex overflow-x-auto pb-4 gap-4 snap-x no-scrollbar">
    {#each designers as designer}
      <div class="flex-none w-56 md:w-64 lg:w-72 snap-start">
        <DesignerCard 
          image={designer.image}
          title={designer.title}
          subtitle={designer.subtitle}
          location={designer.location}
          tag={designer.tag}
        />
      </div>
    {/each}
  </div>
</div>

<style>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  .no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
</style>