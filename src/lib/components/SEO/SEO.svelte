<script>
  /**
   * SEO Component for managing page metadata
   * @param {string} title - Page title (will be appended with site name)
   * @param {string} description - Page description for search engines
   * @param {string} [type='website'] - Open Graph content type
   * @param {string} [image] - Open Graph image URL
   */
  export let title = '';
  export let description = '';
  export let type = 'website';
  export let image = '';
  
  // Append site name to title if not empty
  const fullTitle = title ? `${title} - Decorar.space` : 'Decorar.space - Art & Decor with Augmented Reality';
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={description || 'Visualize your decorative ideas with augmented reality. Upload images and see them in a simulated painting frame.'} />
  
  <!-- Open Graph / Social Media -->
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description || 'Visualize your decorative ideas with augmented reality'} />
  <meta property="og:type" content={type} />
  {#if image}
    <meta property="og:image" content={image} />
  {/if}
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description || 'Visualize your decorative ideas with augmented reality'} />
  {#if image}
    <meta name="twitter:image" content={image} />
  {/if}
</svelte:head>
