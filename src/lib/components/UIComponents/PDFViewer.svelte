<script>
    import { onMount } from 'svelte';
  
    onMount(() => {
      const script = document.createElement('script');
      script.src = 'https://acrobatservices.adobe.com/view-sdk/viewer.js';
      script.onload = () => {
        // @ts-ignore
        if (window.AdobeDC) {
          document.addEventListener('adobe_dc_view_sdk.ready', function () {
            // @ts-ignore
            const adobeDCView = new window.AdobeDC.View({
              clientId: '4d7171eeb45344c288112336db0ab101',
              divId: 'adobe-dc-view'
            });
            adobeDCView.previewFile({
              content: {
                location: {
                  url: 'https://acrobatservices.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf'
                }
              },
              metaData: { fileName: 'Bodea Brochure.pdf' }
            });
          });
        }
      };
      document.body.appendChild(script);
    });
  </script>
  
  <style>
    #adobe-dc-view {
      height: 100vh;
      width: 100%;
    }
  </style>
  
  <div id="adobe-dc-view"></div>
  

  <!-- <div id="adobe-dc-view" style="height: 360px; width: 500px;"></div>
<script src="https://acrobatservices.adobe.com/view-sdk/viewer.js"></script>
<script type="text/javascript">
	document.addEventListener("adobe_dc_view_sdk.ready", function(){ 
		var adobeDCView = new AdobeDC.View({clientId: "<YOUR_CLIENT_ID>", divId: "adobe-dc-view"});
		adobeDCView.previewFile({
			content:{location: {url: "https://acrobatservices.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf"}},
			metaData:{fileName: "Bodea Brochure.pdf"}
		}, {embedMode: "SIZED_CONTAINER"});
	});
</script> -->