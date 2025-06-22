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
        { href: '/SecondaryNavigation/Product/UserGuide', label: 'User Guide' },
        { href: '/SecondaryNavigation/Product/Roadmap', label: 'Roadmap' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { href: '/SecondaryNavigation/Resources/Blog', label: 'Blog' },
        { href: '/SecondaryNavigation/Resources/Testimonials', label: 'Testimonials' }
      ]
    },
    {
      title: 'About',
      links: [
        { href: '/SecondaryNavigation/About/Company', label: 'Our Story' },
        { href: '/SecondaryNavigation/About/Contact', label: 'Contact' }
      ]
    }
  ];
  
  // Newsletter form state
  let email = '';
  let isSubmitting = false;
  let formMessage = { type: '', text: '' };
  
  // Handle newsletter form submission
  function handleSubscribe(e: Event) {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !email.includes('@')) {
      formMessage = { type: 'error', text: 'Please enter a valid email address' };
      return;
    }
    
    isSubmitting = true;
    
    // Simulate API call (replace with actual implementation)
    setTimeout(() => {
      formMessage = { type: 'success', text: 'Thank you for subscribing!' };
      email = '';
      isSubmitting = false;
    }, 1000);
  }
</script>

<footer class="footer-container border-t border-gray-200 bg-white">
  <div class="footer-spacer"></div>
  <!-- Main Footer Content -->
  <div class="container mx-auto px-4 lg:px-20 py-10 lg:py-12">
    <div class="grid grid-cols-1 lg:grid-cols-[55%_45%] xl:grid-cols-[70%_30%] gap-y-8 lg:gap-x-4">
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
      
      <!-- Second column: Newsletter -->
      <div class="flex flex-col items-start w-full px-4 sm:px-6 lg:px-0">
        <h3 id="newsletter-heading" class="subtitle-3 mb-2 text-left w-full">Subscribe to our newsletter</h3>
        <p class="body-4 text-gray-600 mb-4 text-left">Stay updated with our latest features and design tips.</p>
        
        <form 
          class="w-[90%] sm:w-full max-w-md space-y-3" 
          aria-labelledby="newsletter-heading"
          on:submit={handleSubscribe}
        >
          <div class="relative">
            <input 
              type="email" 
              placeholder="Enter your email" 
              class="w-full py-3 px-4 pr-32 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
              aria-label="Email for newsletter"
              bind:value={email}
              aria-invalid={formMessage.type === 'error'}
              aria-describedby={formMessage.text ? 'newsletter-message' : undefined}
            />
            
            <!-- Desktop button -->
            <div class="hidden lg:block absolute right-1.5 top-1/2 -translate-y-1/2">
              <BaseButton 
                type="submit"
                label={isSubmitting ? 'Sending...' : 'Get started'}
                variant="BasePrimary"
                class="py-1.5 px-4 text-sm rounded-md"
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <!-- Mobile button -->
          <div class="lg:hidden w-full">
            <BaseButton 
              type="submit"
              label={isSubmitting ? 'Sending...' : 'Get started'}
              variant="BasePrimary"
              class="w-full py-2.5 px-4"
              disabled={isSubmitting}
            />
          </div>
          
          {#if formMessage.text}
            <p 
              id="newsletter-message" 
              class={`text-sm ${formMessage.type === 'error' ? 'text-red-600' : 'text-green-600'}`}
            >
              {formMessage.text}
            </p>
          {/if}
        </form>
      </div>
    </div>
  </div>
  
  <!-- Bottom Footer -->
  <div class="border-t border-gray-200 bg-gray-50">
    <div class="container mx-auto px-4 sm:px-6 py-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <!-- Logo and Copyright -->
        <div class="flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
          <img 
            src="/CompanyLogo_V3.webp" 
            alt="Decorar Logo" 
            class="h-8 w-8" 
            width="32" 
            height="32"
            loading="lazy"
          />
          <span class="ml-2 text-sm text-gray-600">© {currentYear} decorar.space. All rights reserved.</span>
        </div>
        
        <!-- Legal Links -->
        <div class="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a href="/SecondaryNavigation/Legal/TermsAndConditions" class={`${footerLinkClass} whitespace-nowrap`}>Terms of Service</a>
          <a href="/SecondaryNavigation/Legal/PrivacyPolicy" class={`${footerLinkClass} whitespace-nowrap`}>Privacy Policy</a>
          <a href="/SecondaryNavigation/Legal/CookiePolicy" class={`${footerLinkClass} whitespace-nowrap`}>Cookie Policy</a>
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
        