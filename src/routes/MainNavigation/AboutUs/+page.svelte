<section class="bg-gray-900">
    <div class="container py-8 px-6 mx-auto">
        <p
            class="uppercase tracking-wide no-underline hover:no-underline font-bold text-white text-xl mb-8"
          >
            About Us
    </p>
  
        <p class="mt-8 mb-8 text-white">
          This project is inspired by our passion in technology and art. We bring artwork beyond the screen, turning it into a vibrant content that enhances your physical space!
            <br />
            <br />          
            <a
                class="text-white underline hover:text-gray-900"
                href="https://eltiempo.com/">Feedback Form</a
            >
            <br />
            <a
                class="text-white underline hover:text-gray-900"
                href="https://www.linkedin.com/in/diegomillanxr"
                target="_blank">Diego Profile</a
            >
            <br />
            <a
                class="text-white underline hover:text-gray-900"
                href="https://www.linkedin.com/in/sinddy-carreno/"
                target="_blank">Sinddy Profile</a
            >
            <br/>
            
        </p>
        <p class=" text-white">App version 13 June 4H10 </p>
    </div>
    
  </section>

  <button class="inline-block text-white font-bold py-2 px-4 rounded-full bg-gray-900 border border-transparent transform hover:scale-110 hover: transition-transform duration-1000 ease-in-out" on:click={handdleLikeButton}>
    YES
  </button>

  <script>
     import { browser} from '$app/environment';

    function handdleLikeButton(){
        if (browser && window.gtag) {
      window.gtag("event", "tutorial_complete");
      console.log('Custom event sent');
    }  
    }
  </script>