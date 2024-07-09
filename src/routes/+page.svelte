<script>
  import LoginForm from "$lib/components/UIComponents/LoginForm.svelte";
  import EmailIcon from "$lib/components/IconComponents/EmailIcon.svelte";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import {GA4_ID} from "../projectConstants.js"

  let isVisible = false; // Initial visibility is set to false


  onMount(() => {
        // Add Google Analytics script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
        document.head.appendChild(script);

        // Initialize Google Analytics
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        gtag('js', new Date());
        // gtag('config', 'G-46424JX940');
        gtag('config', `${GA4_ID}`);
        
        // Replace with your Google Analytics tracking ID
    });

  function navigateToPage() {
    goto("MainNavigation/Explore");
  }
</script>

<div
  class="parentContainer w-screen h-screen flex flex-col md:flex-row p-1"
>
  <!-- BRAND SECTION -->
  <div class=" flex-[6]  text-white h-full p-1">
    <div class="flex flex-col  items-center justify-center h-full p-1">
      <!-- BRAND SECTION - HEADER -->
      <div class="bg-white items-center justify-center h-1/5 w-full p-1 flex flex-row">
        <img src="/CompanyLogoV2.svg" alt="CompanyLogo" class="mx-2 h-10 w-10" />
        <!-- <p class="mx-2 font-bold text-black font-roboto">Decorar.io</p> -->
      </div>
       <!-- BRAND SECTION - IMG -->
      <!-- <div class=" bg-custom bg-orange-300 h-4/5 w-full"> -->
       <div class=" bg-[url('/landingPage/BG_1080.webp')]  bg-cover bg-center   h-4/5 w-full">
        <!-- <img src="/landingPage/BG_1080.webp" alt = "Backgroung Image" class="w-100% h-100%"> -->
      </div>

    </div>
      
  </div>

  <!-- LOGIN SECTION -->
  <!-- <div class="flex-[4]  text-white h-full p-[5%]">
    <div class="flex flex-col items-center justify-center bg-slate-600 w-full h-full">
      <h2 class="mb-5 text-xl font-bold text-gray-900">Login With</h2>
      <div class="flex flex-row">
        <button
          class="delay-50 mx-2 mb-2 flex items-center justify-center space-x-2 rounded border border-slate-600 bg-white px-3 py-2.5 transition ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 focus:ring-offset-2"
        >
          <img src="GoogleLogo.svg" alt="googleLogo" class="h-6 w-6" />
        </button>
        <button
          class="delay-50 mx-2 mb-2 flex items-center justify-center space-x-2 rounded border border-slate-600 bg-white px-3 py-2.5 transition ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 focus:ring-offset-2"
          on:click={() => (isVisible = !isVisible)}
        >
          <EmailIcon></EmailIcon>
        </button>
      </div>

      {#if isVisible}
      <LoginForm />
      {/if}

      <div class="w-full mt-2 flex justify-end">
        <button class="text-primary font-bold mx-3" on:click={navigateToPage}
          >Skip</button
        >
      </div>
      <p class=" mt-3 text-center text-[14px]">
        Don&#x27;t have an account?
        <a href="/signup" class="text-gray-900">Create one</a>
      </p>

      <p class="mt-3 text-center text-[13px]">
        By continuing, you agree to our <a href="/terms" class="text-gray-900"
          >Terms of Service</a
        >
        and <a href="/privacy" class="text-gray-600">Privacy Policy</a>.
      </p>
    </div>
  </div>
</div> -->

<div class="flex-[4]  text-white h-full p-[5%]">
  <div class="flex flex-col items-center justify-center  w-full h-full">
    <h2 class="mb-5 text-xl font-bold text-gray-900">Artwork in Augmented Reality</h2>

    {#if isVisible}
    <LoginForm />
    {/if}

    <button class="inline-block text-white font-bold py-2 px-4 rounded-full bg-gray-900 border border-transparent transform hover:scale-110 hover: transition-transform duration-1000 ease-in-out" on:click={navigateToPage}>
      Continue
    </button>
    <p class=" mt-3 text-center text-[14px] text-gray-900">
      This experience is optimized on high-end phones with LiDAR technology.
      <!-- <a href="/signup" class="text-gray-900">Create one</a> -->
    </p>
  </div>
</div>
</div>



<!-- YourComponent.svelte -->
<style>
  .bg-custom {
    /* Assuming your static folder is at the root and the image is named 'background.jpg' */
    background-image: url("/LivingRoomIntro.gif");
    background-size: cover; /* Cover the entire screen */
    background-position: center; /* Center the image */
    background-repeat: no-repeat;
  }
</style>
