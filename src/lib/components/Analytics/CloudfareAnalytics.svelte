<!-- <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "072b68aa1f0d4ab1bff165fbc0cba226"}'></script> -->

<script>
import { browser } from '$app/environment';

if (browser) {
    // Check if we're not on localhost before loading Cloudflare analytics
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname.includes('192.168.');
    
    if (!isLocalhost) {
        const script = document.createElement('script');
        script.defer = true;
        script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
        script.setAttribute('data-cf-beacon', `{"token": "072b68aa1f0d4ab1bff165fbc0cba226"}`);
        document.body.appendChild(script);
        console.log("Cloudflare analytics initialized");
    } else {
        console.log("Cloudflare analytics skipped on localhost");
    }
}
</script>
  

