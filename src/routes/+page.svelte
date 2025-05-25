<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { fade } from 'svelte/transition';
  import GoogleAnalytics from "$lib/components/Analytics/GoogleAnalytics.svelte";
  import CloudfareAnalytics from "$lib/components/Analytics/CloudfareAnalytics.svelte";
  import InstagramBrowserPopup from "$lib/components/UIComponents/InstagramBrowserPopup.svelte";
  import DesignerCard from "$lib/components/UIComponents/DesignerCard.svelte";
  import ImageGallery from "$lib/components/UIComponents/ImageGallery.svelte";

  let isInstagramBrowser = false;
  let email = '';

  onMount(() => {
  //       // Add Google Analytics script
  //       const script = document.createElement('script');
  //       script.async = true;
  //       script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  //       document.head.appendChild(script);

  //       // Initialize Google Analytics
  //       window.dataLayer = window.dataLayer || [];
  //       function gtag() {
  //           window.dataLayer.push(arguments);
  //       }
  //       gtag('js', new Date());
  //       gtag('config', `${GA4_ID}`);   

    // Check if the user is using Instagram
    if (window.navigator.userAgent.includes('Instagram')) {
      isInstagramBrowser = true;
    }
  });

  function navigateToPage() {
    goto("MainNavigation/Explore");
  }

  function handleSubmit() {
    // Store email if needed or proceed directly
    navigateToPage();
  }
</script>

{#if isInstagramBrowser}
  <InstagramBrowserPopup />
{/if}

<GoogleAnalytics></GoogleAnalytics>

<main class="min-h-screen flex flex-col" in:fade={{ duration: 800 }}>
  <!-- Header with logo and hamburger menu -->
  <header class="pt-8 pb-4 px-6 flex items-center justify-between">
    <div class="flex items-center">
      <img src="/CompanyLogo_V3.webp" alt="Decorar Logo" class="h-8 w-8" />
      <h1 class="text-black font-poppins font-semibold text-lg ml-2">decorar.space</h1>
    </div>
    <button class="p-2" aria-label="Menu">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </header>

  <!-- Hero section -->
  <section class="flex-grow flex flex-col px-6 py-12 md:py-16 text-center justify-center">
    <h2 class="text-4xl sm:text-5xl font-bold leading-tight mb-6 text-center">
      Beautiful frames for your artwork
    </h2>
    
    <p class="text-xl mb-10 text-gray-700 max-w-lg mx-auto">
      Visualize how your art will look in different frames and environments with augmented reality.
    </p>
    
    <!-- Hero image with overlay -->
    <!-- <div class="relative rounded-xl overflow-hidden shadow-xl mx-auto w-full max-w-md mb-12">
      <img 
        src="/landingPage/BG_1080.webp" 
        alt="Framed artwork example" 
        class="w-full h-auto"
      />
      <div class="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
      </div>
    </div>
      -->
   <div class="flex flex-col items-center">
  <form class="w-full max-w-md mb-6" on:submit|preventDefault={handleSubmit}>
    <div class="relative">
      <input
        type="email"
        bind:value={email}
        placeholder="Enter your email"
        class="w-full py-3 px-4 pr-32 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Email address"
      />
      <button 
        type="submit"
        class="absolute right-1.5 top-1/2 -translate-y-1/2 bg-yellow-400 text-black py-2 px-4 rounded-md font-medium hover:bg-yellow-500 transition-colors text-sm"
      >
        Get started
      </button>
    </div>
  </form>
  </div> 
    <!-- Featured Designers section -->
    <div class="w-full px-0 mt-6 mb-6">
      <h3 class="text-center font-medium text-lg tracking-widest mb-4">FEATURED DESIGNERS</h3>
      
      <div class="flex overflow-x-auto pb-4 px-4 gap-4 snap-x no-scrollbar">
        <div class="flex-none w-56 snap-start">
          <DesignerCard 
            image="/referenceImages/jorge-bermudez-9u7Xv3veu4c-unsplash.webp"
            title="HOMMEBOYS INTERIORS"
            subtitle="Made with Programa"
            location="CALIFORNIA, USA"
            flagCode="us"
            tag="MULTIDISCIPLINARY"
          />
        </div>
        
        <div class="flex-none w-56 snap-start">
          <DesignerCard 
            image="/referenceImages/laura-chouette-g6Ny4dvHlE0-unsplash_0.67.webp"
            title="STUDIO ALEXANDRA"
            subtitle="Curated Spaces"
            location="PARIS, FRANCE"
            flagCode="fr"
            tag="RESIDENTIAL"
          />
        </div>
        
        <div class="flex-none w-56 snap-start">
          <DesignerCard 
            image="/referenceImages/oladimeji-odunsi-br7vCg8693o-unsplash_0.8.webp"
            title="ODUNSI DESIGN"
            subtitle="Contemporary Art Spaces"
            location="LAGOS, NIGERIA"
            flagCode="ng"
            tag="CONTEMPORARY"
          />
        </div>
      </div>
    </div>
  </section>
</main>

<footer class="pt-2 pb-4 px-6 text-center">
  <p class="text-xs text-gray-600 mb-4">
    By continuing, you agree to our <a href="/terms" class="text-primary hover:underline">Terms of Service</a>
    and <a href="/privacy" class="text-primary hover:underline">Privacy Policy</a>.
  </p>
  
  <p class="text-xs text-gray-500">
    This experience is optimized for mobile devices with AR capabilities.
  </p>
</footer>

<CloudfareAnalytics></CloudfareAnalytics>

<style>
  /* Hide scrollbar but keep functionality */
  .no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;     /* Firefox */
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;             /* Chrome, Safari and Opera */
  }
</style>

 <!-- Call to action section with embedded button -->
 <!-- <div class="flex flex-col items-center">
  <form class="w-full max-w-md mb-6" on:submit|preventDefault={handleSubmit}>
    <div class="relative">
      <input
        type="email"
        bind:value={email}
        placeholder="Enter your email"
        class="w-full py-3 px-4 pr-32 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Email address"
      />
      <button 
        type="submit"
        class="absolute right-1.5 top-1/2 -translate-y-1/2 bg-yellow-400 text-black py-2 px-4 rounded-md font-medium hover:bg-yellow-500 transition-colors text-sm"
      >
        Get started
      </button>
    </div>
  </form>
  
  <p class="text-sm text-gray-600 mb-2">No account needed. Try it out first!</p>
  
  <button 
    class="underline text-primary font-medium text-base mb-8"
    on:click={navigateToPage}
  >
    Skip & explore now
  </button>
</div> -->