<script>
  import DesignerCard from "$lib/components/UIComponents/GroupComponents/DesignerCard.svelte";
  // Designer data for easier management
  const designers = [
    {
      image: "/referenceImages/jorge-bermudez-9u7Xv3veu4c-unsplash.webp",
      title: "Paintings",
      subtitle: "Made with Programa",
      location: "CALIFORNIA, USA",
      tag: "MULTIDISCIPLINARY"
    },
    {
      image: "/referenceImages/laura-chouette-g6Ny4dvHlE0-unsplash_0.67.webp",
      title: "Wall papers",
      subtitle: "Curated Spaces",
      location: "PARIS, FRANCE",
      tag: "RESIDENTIAL"
    },
    {
      image: "/referenceImages/oladimeji-odunsi-br7vCg8693o-unsplash_0.8.webp",
      title: "Street Art",
      subtitle: "Contemporary Art Spaces",
      location: "LAGOS, NIGERIA",
      tag: "CONTEMPORARY"
    },
    {
      image: "/referenceImages/oladimeji-odunsi-br7vCg8693o-unsplash_0.8.webp",
      title: "Carpets",
      subtitle: "Contemporary Art Spaces",
      location: "LAGOS, NIGERIA",
      tag: "CONTEMPORARY"
    }
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