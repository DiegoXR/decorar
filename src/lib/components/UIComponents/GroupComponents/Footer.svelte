<script lang="ts">
  // Get the current year for copyright
  import BaseButton from '$lib/components/UIComponents/CustomMadeComponents/BaseButton.svelte';
  
  const currentYear = new Date().getFullYear();
  
  // Define the footer link class in one place for easy modification
  const footerLinkClass = 'body-4 text-gray-600 hover:text-black transition-colors';
  
  // Footer navigation sections with links
  const footerSections = [
    {
      title: 'Product',
      links: [
        { href: '/SecondaryNavigation/Product/OurProduct', label: 'What is decorar.space', external: false },  
        { href: '/SecondaryNavigation/Product/UserGuide', label: 'User Guide', external: false },
        { href: '/SecondaryNavigation/Product/Roadmap', label: 'Roadmap', external: false },
        
      ]
    },
    {
      title: 'Resources',
      links: [
        { href: '/SecondaryNavigation/Resources/Blog', label: 'Blog', external: false },
        { href: '/SecondaryNavigation/Resources/Testimonials', label: 'Testimonials', external: false }
      ]
    },
    {
      title: 'About',
      links: [
        { href: '/SecondaryNavigation/About/Company', label: 'Our Story', external: false },
        { href: '/SecondaryNavigation/About/Contact', label: 'Contact', external: false }
      ]
    }
  ];
</script>

<footer class="footer-container border-t border-gray-200 bg-white">
  <div class="footer-spacer"></div>
  <!-- Main Footer Content -->
  <div class="container mx-auto px-4 lg:px-4 xl:px-20 py-10 lg:py-12">
    <div class="grid grid-cols-1 lg:grid-cols-[60%] gap-y-8">
      <!-- First column: Navigation sections -->
      <div class="px-4 sm:px-6 mb-8 lg:mb-0">
        <div class="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {#each footerSections as section}
            <div>
              <h3 id="footer-{section.title.toLowerCase()}-heading" class="subtitle-3 mb-3 text-left">{section.title}</h3>
              <ul class="space-y-2" aria-labelledby="footer-{section.title.toLowerCase()}-heading">
                {#each section.links as link}
                  <li class="text-left">
                    <a 
                      href={link.href} 
                      class={footerLinkClass}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      target={link.external ? '_blank' : undefined}
                    >
                      {link.label}
                      {#if link.external}
                        <span class="sr-only">(opens in new window)</span>
                      {/if}
                    </a>
                  </li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
  
  <!-- Bottom Footer -->
  <div class="border-t border-gray-200 bg-gray-50">
    <div class="container mx-auto px-4 sm:px-6 py-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
       <!-- <div>
         <img 
            src="/CompanyLogo_V3.webp" 
            alt="Decorar Logo" 
            class="h-8 w-8" 
            width="32" 
            height="32"
            loading="lazy"
          />
       </div>         -->
        <!--Copyright -->
        <div class="flex items-center justify-center sm:justify-start mb-4 sm:mb-0">        
          <span class="ml-2 body-4 text-gray-600">© {currentYear} decorar.space. <br/>All rights reserved.</span>
        </div>
        
        <!-- Social Media Links -->
        <div class="flex flex-col md:flex-row justify-center items-center gap-y-2 gap-x-6">
          <a href="https://www.instagram.com/decorar.space?igsh=MXkwY3ZwbHpkZ2Y2aw%3D%3D" target="_blank" rel="noopener noreferrer" class="body-4 text-gray-600 hover:text-black transition-colors">
            Instagram
          </a>
          <a href="https://www.tiktok.com/@decorarspace?_t=ZS-8xQLr6tIkxc&_r=1" target="_blank" rel="noopener noreferrer" class="body-4 text-gray-600 hover:text-black transition-colors">
            TikTok
          </a>
        </div>
        
        <!-- Legal Links -->
        <div class="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a href="/SecondaryNavigation/Legal/TermsAndConditions" class={`${footerLinkClass} whitespace-nowrap`}>Terms of Service</a>
          <a href="/SecondaryNavigation/Legal/PrivacyPolicy" class={`${footerLinkClass} whitespace-nowrap`}>Privacy Policy</a>
          <!-- <a href="/SecondaryNavigation/Legal/CookiePolicy" class={`${footerLinkClass} whitespace-nowrap`}>Cookie Policy</a> -->
        </div>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer-container {
    position: relative;
    width: 100%;
    clear: both;
    z-index: 10;
  }

  .footer-spacer {
    height: 2rem;
    width: 100%;
    clear: both;
  }
</style>
        