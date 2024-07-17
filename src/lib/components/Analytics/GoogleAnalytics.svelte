<script>
    import { onMount } from "svelte";
    //import {GA4_ID} from "../../../projectConstants.js"
    import {afterNavigate} from '$app/navigation';
    import { browser} from '$app/environment';
    import { PUBLIC_GAID_PROD, PUBLIC_GAID_DEV} from '$env/static/public';


    /**
     * @type {string}
     */
    let GA4_ID;
    
    onMount(() => {
        
        const isProduction = process.env.NODE_ENV === 'production';
        if (isProduction){          
            GA4_ID = PUBLIC_GAID_PROD;
            console.log("ISPROD" + GA4_ID);
        }else{          
            GA4_ID = PUBLIC_GAID_DEV;
            console.log("ISDEV" + GA4_ID);
        } 
        

        const environment = import.meta.env.VITE_ENV;

        let message;
        if (environment === 'production') {
        message = 'You are in the production environment.';
        } else if (environment === 'preview') {
        message = 'You are in the preview environment.';
        } else {
        message = 'Environment is not set.';
        }

        console.log(message);
        // GA4_ID = "G-2Z02D9KJ26";

            
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
