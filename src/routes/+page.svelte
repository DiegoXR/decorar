<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { fade } from 'svelte/transition';
  // Importaciones críticas para el hero section primero
  import PageHeader from '$lib/components/UIComponents/GroupComponents/PageHeader.svelte';
  import FakePageHeader from '$lib/components/UIComponents/CustomMadeComponents/FakePageHeader.svelte';
  import BaseButton from '$lib/components/UIComponents/CustomMadeComponents/BaseButton.svelte';
  
  // Importaciones no críticas después
  import GoogleAnalytics from "$lib/components/Analytics/GoogleAnalytics.svelte";
  import CloudfareAnalytics from "$lib/components/Analytics/CloudfareAnalytics.svelte";
  import InstagramBrowserPopup from "$lib/components/UIComponents/InstagramBrowserPopup.svelte";
  import Separator from "$lib/components/UIComponents/CustomMadeComponents/Separator.svelte";
  import ProjectCarousel from '$lib/components/UIComponents/GroupComponents/ProjectCarousel.svelte';
  import Footer from '$lib/components/UIComponents/GroupComponents/Footer.svelte';
  
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

</script>

{#if isInstagramBrowser}
  <InstagramBrowserPopup />
{/if}

<GoogleAnalytics></GoogleAnalytics>

<!-- Reducir la duración de la animación de entrada para mejorar el rendimiento inicial -->
<main class="min-h-screen flex flex-col" in:fade={{ duration: 300 }}>
  <!-- Header with logo y hamburger menu - optimizado para no bloquear el renderizado -->
  <header class="pt-8 pb-1 px-6 flex items-center justify-between">
    <PageHeader />
  </header>
  <FakePageHeader />
  
  <!-- Hero section - optimizado para carga rápida -->
  <section class="flex-grow flex flex-col px-6 sm:px-1 lg:px-6 2xl:px-28 text-center justify-center">
    <!-- Hero image -->
    <div class="w-full mx-auto mb-5">
      <div class="relative h-[50vh] sm:h-[50vh] md:h-[60vh] lg:h-[40vh] xl:h-[80vh] 2xl:h-[70vh] overflow-hidden rounded-3xl flex items-center justify-center">
        <img 
          src="/landingPage/ImageBackground_1536.webp"
          srcset="
            /landingPage/ImageBackground _720.webp 720w,
            /landingPage/ImageBackground _1280.webp 1280w,
            /landingPage/ImageBackground_1536.webp 1536w
          " 
          sizes="(max-width: 720px) 720px, (max-width: 1280px) 1280px, 1536px"
          alt="Framed artwork example" 
          class="absolute inset-0 w-full h-full object-cover object-center"
          fetchpriority="high"
          loading="eager"
          decoding="async"
        />
        <h1 class="relative z-10 text-white header-h1 text-center p-4">Art & Decor with Augmented Reality</h1>
      </div>
    </div>

  <!-- Title and Action Buttons Section -->
  <div class="mt-8 mb-2 text-center px-2">
    <p class=" subtitle-1 mb-6  mx-auto">
      We help you visualize your decorative ideas with AR. 
    </p>
      <div class="flex flex-row justify-center items-center space-x-3 px-10">
        <BaseButton 
          label="Get started" 
          variant="BasePrimary" 
          class="button-4"
          on:click={() => goto('/MainNavigation/Explore')} 
        />
        <!-- <BaseButton 
          label="Book a demo" 
          variant="BaseSecondary" 
          class="button-1"
          on:click={() => goto('/book-demo')}
        /> -->
      </div>
    </div>
  </section>
   
  <Separator width="full" margin="my-10 2xl:my-20" />
 
  <section class="px-4 lg:px-6 xl:px-20 2xl:pl-60">
    <p class="subtitle-1 text-gray-800">Made with decorar.space</p>
    <p class="body-1 text-gray-800">See the use cases of our platform</p> 

    <ProjectCarousel />
  </section>

  <footer>
    <Footer />
  </footer>
  
</main>

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

 <!-- <h1 class="header-h1">Switch Programa</h1>
    <h2 class="header-h2">Switch Programa</h2>
    <h3 class="header-h3">Switch Programa</h3>

    <br/>
    <br/>
    <br/>
    <p class="subtitle-1">Switch Programa</p>
    <p class="body-1">Switch Programa</p>
    <br/>
    <p class="subtitle-2">Switch Programa</p>  
    <p class="body-2">Switch Programa</p>
    <br/>
    <p class="subtitle-3">Switch Programa</p>  
    <p class="body-3">Switch Programa</p>
    <br/>
    <p class="subtitle-4">Switch Programa</p>  
    <p class="body-4">Switch Programa</p>
    <br/>
    <p class="button-1">Switch Programa</p>
    <p class="button-2">Switch Programa</p>
    <br/> -->