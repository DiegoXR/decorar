<script>
    import { onMount } from "svelte";
    import {GA4_ID} from "../../../projectConstants.js"
    import {afterNavigate} from '$app/navigation';
    import { browser} from '$app/environment';

    onMount(() => {
        // Ensure this code is only executed in the client
        if (browser)
        {
            if (!document.querySelector(`script[src="https://www.googletagmanager.com/gtag/js?id=${GA4_ID}"]`,)) {
                const script = document.createElement("script");
                script.async = true;
                script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
                document.head.appendChild(script);

                window.dataLayer = window.dataLayer || [];
                function gtag() {
                    window.dataLayer.push(arguments);
                }
                
                // Ensure gtag is available globally
                window.gtag = gtag; 

                gtag("js", new Date());
                gtag("config", GA4_ID, {
                    'cookie_domain': 'auto', // Ensures cookies are set for the current domain
                    'cookie_flags': 'SameSite=Lax; Secure', // Adds security flags to cookies
                    'anonymize_ip': true, // Optional: Anonymize IP addresses for privacy
                    'allow_google_signals': false, // Optional: Disable Google Signals to prevent cross-site tracking
                    'allow_ad_personalization_signals': false // Optional: Disable ad personalization signals
                });

                console.log("Google Analytics Initialized");
            }
        }
    });

    afterNavigate(() => {
        console.log('Navigation happened!');
               
      if (browser && window.gtag) {
      window.gtag('config', GA4_ID, {
        page_path: window.location.pathname,
      });
      console.log('Page view tracked:', window.location.pathname);
    }
    });

    
</script>
