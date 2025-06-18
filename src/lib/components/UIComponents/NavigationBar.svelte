<script>
import { page } from '$app/stores';
import { derived } from 'svelte/store';


</script>



<nav class=" text-black   bg-white w-full h-[10vh] bottom-0 fixed z-10">
    <div class="mx-auto bg-gray-800">
        <div class="flex justify-center items-center">
            <div class="flex items-center justify-around">
                <!-- Navigation Links -->
                <a href="/MainNavigation/Explore" class="rounded  py-3 px-2 text-gray-200" class:active={$page.route.id?.includes("Explore")}>1. Explore
                <!-- <div class=" w-full h-[2px] bg-red-500" class:activeLine={$page.route.id?.includes("Explore")}> -->
                <!-- </div> -->
                
                </a>
                <a href="/MainNavigation/Setup" class="rounded py-3 px-2 text-gray-200" class:active={$page.route.id?.includes("Setup")}> 2. Customize</a>
                <a href="/MainNavigation/3DPage" class="rounded  py-3  px-2 text-gray-200" class:active={$page.route.id?.includes("3DPage")}>3. 3D View</a>
                <!-- <a href="/MainNavigation/AboutUs" class="rounded  py-3 px-2 text-gray-200" class:active={$page.route.id?.includes("AboutUs")}>About Us</a> -->
                <!-- <a href="/MainNavigation/Customize" class="rounded px-3 py-3">Customize</a> -->
                <!-- <a href="/MainNavigation/ARSet" class="rounded px-3 py-3">AR</a> -->
                <a href="/MainNavigation/Playground" class="rounded px-3 py-3"class:active={$page.route.id?.includes("Playground")}>Playground</a>
            </div>
        </div>
    </div>
</nav>

<style>
    .active {
      font-weight: bold;
      color: white;
    }

    .activeLine {
        /* visibility: visible; */
        color: yellow;
    }
  </style>