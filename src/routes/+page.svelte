<script>
  import LoginForm from "$lib/components/UIComponents/LoginForm.svelte";
  import EmailIcon from "$lib/components/IconComponents/EmailIcon.svelte";
  import { goto } from "$app/navigation";

  let isVisible = false; // Initial visibility is set to false

  function navigateToPage() {
    goto("MainNavigation/Explore");
  }
</script>

<div class="container h-[90vh] flex flex-col px-4">
  <div class="bg-red-400 flex-grow">
    <div class="bg-blue-300 container h-full flex flex-col">
      <div class="bg-white h-1/6 flex items-center justify-center">
        <img src="/CompanyLogo.svg" alt="CompanyLogo" class="mx-2 h-10 w-10" />
        <p class="mx-2 font-bold text-black font-roboto">Decorar.io</p>
      </div>
      <div class="bg-custom flex-grow"></div>
    </div>
  </div>
  <div class=" flex flex-col items-center">
    <h2 class="mb-5 text-xl font-bold text-gray-900">Login With</h2>

    <div class="flex flex-row">
      <button
        class="delay-50 mx-2 mb-2 flex items-center justify-center space-x-2 rounded border border-slate-600 bg-white px-3 py-2.5 transition ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 focus:ring-offset-2"
      >
        <img src="GoogleLogo.svg" alt="googleLogo" class="h-6 w-6" />
        <!-- <span class=" font-medium text-gray-700">Continue with Google</span> -->
      </button>
      <button
        class="delay-50 mx-2 mb-2 flex items-center justify-center space-x-2 rounded border border-slate-600 bg-white px-3 py-2.5 transition ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 focus:ring-offset-2"
        on:click={() => (isVisible = !isVisible)}
      >
        <EmailIcon></EmailIcon>
      </button>
    </div>

    <!-- <span class="mb-2 text-gray-900">or</span> -->
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
      <a href="/signup" class="text-gray-600">Create one</a>
    </p>

    <p class="mt-3 text-center text-[13px]">
      By continuing, you agree to our <a href="/terms" class="text-gray-600"
        >Terms of Service</a
      >
      and <a href="/privacy" class="text-gray-600">Privacy Policy</a>.
    </p>
  </div>
  <!-- <div class = "h-[11vh] bg-slate-600"></div> -->
</div>

<!-- YourComponent.svelte -->
<style>
  .bg-custom {
    /* Assuming your static folder is at the root and the image is named 'background.jpg' */
    background-image: url("/LivingRoomIntro.gif");
    background-size: cover; /* Cover the entire screen */
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Prevent the image from repeating */
  }
</style>
