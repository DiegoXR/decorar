<script>
  // Get the current year for copyright
  import BaseButton from '$lib/components/UIComponents/CustomMadeComponents/BaseButton.svelte';
  
  const currentYear = new Date().getFullYear();
  
  // Define the footer link class in one place for easy modification
  const footerLinkClass = 'body-4 text-gray-600 hover:text-black transition-colors';
</script>

<!-- Desktop and Tablet Footer -->
<footer class="mt-16 border-t border-gray-200 bg-white">
  <!-- Main Footer Content -->
  <div class="container mx-auto px-20 py-12">
    <div class="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8">
      <!-- Primera columna: Tres secciones en flex -->
      <div class="flex flex-col justify-between md:flex-row gap-8">
        <!-- Product -->
        <div class="flex-1">
          <h3 class="subtitle-3 mb-4 text-center md:text-left">Product</h3>
          <ul class="space-y-1">
            <li class="text-center md:text-left"><a href="/tools/specification" class={footerLinkClass}>Specifications</a></li>
            <li class="text-center md:text-left"><a href="/tools/management" class={footerLinkClass}>Best Practices</a></li>
            <li class="text-center md:text-left"><a href="/tools/creative" class={footerLinkClass}>Our Roadmap</a></li>
          </ul>
        </div>
        
        <!-- Resources -->
        <div class="flex-1">
          <h3 class="subtitle-3 mb-4 text-center md:text-left">Resources</h3>
          <ul class="space-y-1">
            <li class="text-center md:text-left"><a href="/resources/blog" class={footerLinkClass}>Blog</a></li>
            <li class="text-center md:text-left"><a href="/resources/made-with-programa" class={footerLinkClass}>Made with Decorar</a></li>
            <li class="text-center md:text-left"><a href="/resources/testimonials" class={footerLinkClass}>Testimonials</a></li>
          </ul>
        </div>
        
        <!-- About -->
        <div class="flex-1">
          <h3 class="subtitle-3 mb-4 text-center md:text-left">About</h3>
          <ul class="space-y-1">
            <li class="text-center md:text-left"><a href="/about/company" class={footerLinkClass}>Company</a></li>
            <li class="text-center md:text-left"><a href="/about/contact" class={footerLinkClass}>Contact</a></li>
            <li class="text-center md:text-left"><a href="/about/privacy" class={footerLinkClass}>Instagram</a></li>
          </ul>
        </div>
      </div>
      
      <!-- Segunda columna: Newsletter -->
      <div class="flex flex-col items-center lg:items-start">
        <h3 class="subtitle-3 mb-4 text-center lg:text-left w-full">Subscribe to our newsletter</h3>
        <p class="body-4 text-gray-600 mb-4 text-center lg:text-left">Stay updated with our latest features and design tips.</p>
        <form class="relative w-full max-w-md">
          <input 
            type="email" 
            placeholder="Enter your email" 
            class="w-full py-3 px-4 pr-32 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300"
            aria-label="Email for newsletter"
          />
          <BaseButton 
            label="Get started"
            variant="BasePrimary"
            class="absolute right-1.5 top-1/2 -translate-y-1/2 py-2 px-4 text-sm font-medium rounded-md"
          />
        </form>
      </div>
    </div>
  </div>
  
  <!-- Bottom Footer -->
  <div class="border-t border-gray-200 bg-gray-50">
    <div class="container mx-auto px-6 py-6">
      <div class="flex flex-col items-center text-center">
        <!-- Logo and Copyright -->
        <div class="flex items-center mb-4 md:mb-0">
          <img src="/CompanyLogo_V3.webp" alt="Decorar Logo" class="h-8 w-8" />
          <span class="ml-2 text-sm text-gray-600">© {currentYear} decorar.space. All rights reserved.</span>
        </div>
        
        <!-- Legal Links -->
        <div class="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4">
          <a href="/terms" class={footerLinkClass}>Terms of Service</a>
          <a href="/privacy" class={footerLinkClass}>Privacy Policy</a>
          <a href="/cookies" class={footerLinkClass}>Cookie Policy</a>
          <p class="text-sm text-gray-500">
            This experience is optimized for mobile devices with AR capabilities.
          </p>
        </div>
      </div>
    </div>
  </div>
</footer>
        