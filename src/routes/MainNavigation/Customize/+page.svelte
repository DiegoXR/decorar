<script>
    import { selectedImage } from '../../../stores.js'
    import { selectedImageObject } from '../../../stores.js'
    import { onMount } from "svelte";
    let data = "initial value";

    let dataObject = {
    width: "",
    height: "",
    src: "",
    description: "",
    alt: ""
}


    selectedImage.subscribe(value => {
      data = value;
    });

    selectedImageObject.subscribe(value => {
        dataObject = value;
    });



    onMount(() => {
        console.log(" the received image is " + data);
        console.log(dataObject);
    });



  </script>
  
  <p>Received data: {data}</p>
  <p>This is the Page Customize</p>
  