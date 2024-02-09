<script>
// @ts-nocheck

    /**
     * @type {{ description: any; 
     *                           }}
     */
     export let image;
  </script>



<div class="flex flex-col mt-4">
    <header class="h-16 bg-gray-200">{image.description}</header>
    <div class="h-80 bg-gray-500">
        <!-- <img src={image.src} alt={image.alt} /> -->
        <p>{image.src}</p>
    </div>
    <footer class="h-16 bg-gray-200">Footer</footer>
  </div>