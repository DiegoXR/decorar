<!-- <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "072b68aa1f0d4ab1bff165fbc0cba226"}'></script> -->

<script>
import { browser} from '$app/environment';

if (browser){
    const script = document.createElement('script');
    script.defer = true;
    script.src ='https://static.cloudflareinsights.com/beacon.min.js';
    script.setAttribute('data-cf-beacon', `{"token":  "072b68aa1f0d4ab1bff165fbc0cba226"}`);
    document.body.appendChild(script);
    console.log("Initializing Cloudfare analytics");
   }   
</script>
  

