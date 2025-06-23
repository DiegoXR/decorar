<script lang="ts">
  import BaseButton from '$lib/components/UIComponents/CustomMadeComponents/BaseButton.svelte';

  // Newsletter form state
  let email = '';
  let isSubmitting = false;
  let formMessage = { type: '', text: '' };
  
  // Handle newsletter form submission
  async function handleSubscribe(e: Event) {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !email.includes('@')) {
      formMessage = { type: 'error', text: 'Please enter a valid email address' };
      return;
    }
    
    isSubmitting = true;
    
    try {
      // Send data to our server endpoint instead of directly to n8n
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Subscription failed');
      }
      
      // Success message
      formMessage = { type: 'success', text: result.message || 'Thank you for subscribing!' };
      email = '';
    } catch (error) {
      // Error handling
      console.error('Newsletter subscription error:', error);
      formMessage = { 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Subscription failed. Please try again later.' 
      };
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="w-full">
  <h3 id="newsletter-heading" class="subtitle-3 mb-2 text-left w-full">Subscribe to our newsletter</h3>
  <p class="body-4 text-gray-600 mb-4 text-left">Stay updated with our latest features and design tips.</p>
  
  <form 
    class="w-[90%] sm:w-full max-w-md space-y-3" 
    aria-labelledby="newsletter-heading"
    on:submit={handleSubscribe}
  >
    <!-- Name field (optional) -->
    <!-- <div>
      <input 
        type="text" 
        placeholder="Your name (optional)" 
        class="w-full py-3 px-4 rounded-[14px] border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
        aria-label="Name for newsletter"
        bind:value={name}
      />
    </div> -->
    
    <!-- Email field -->
    <div class="relative">
      <input 
        type="email" 
        placeholder="Enter your email" 
        class="w-full py-3 px-4 lg:pr-32 rounded-[14px] border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
        aria-label="Email for newsletter"
        bind:value={email}
        required
        aria-invalid={formMessage.type === 'error'}
        aria-describedby={formMessage.text ? 'newsletter-message' : undefined}
      />
      
      <!-- Desktop button -->
      <div class="hidden lg:block absolute right-[0.2rem] top-1/2 -translate-y-1/2">
        <BaseButton 
          type="submit"
          label={isSubmitting ? 'Sending...' : 'Subscribe'}
          variant="BaseHighlighted"
          class="button-4"
          disabled={isSubmitting}
        />
      </div>
    </div>
    
    <!-- Mobile button -->
    <div class="lg:hidden w-full">
      <BaseButton 
        type="submit"
        label={isSubmitting ? 'Sending...' : 'Subscribe'}
        variant="BaseHighlighted"
        class="w-full button-4"
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
