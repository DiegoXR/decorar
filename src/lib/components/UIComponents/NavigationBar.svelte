<script>
import { page } from '$app/stores';
import { derived } from 'svelte/store';

const navLinkClass = 'body-4 text-gray-600 hover:text-black transition-colors';

</script>



<nav class="fixed top-[8vh] left-0 w-full h-[6vh] bg-white z-10 md:top-[12vh] lg:top-[6vh] xl:top-[8vh]">
    <div class="h-full">
        <div class="flex justify-center items-center">
            <div class="flex items-center justify-around h-full">
                <!-- Navigation Links -->
                <a href="/MainNavigation/Explore" class="{navLinkClass} py-3 px-2" class:active={$page.route.id?.includes("Explore")}>
                    Explore
                </a>
                <a href="/MainNavigation/Setup" class="{navLinkClass} py-3 px-2" class:active={$page.route.id?.includes("Setup")}>
                    Customize
                </a>
                <a href="/MainNavigation/3DPage" class="{navLinkClass} py-3 px-2" class:active={$page.route.id?.includes("3DPage")}>
                    3D View
                </a>
                <!-- <a href="/MainNavigation/AboutUs" class="rounded  py-3 px-2 text-gray-200" class:active={$page.route.id?.includes("AboutUs")}>About Us</a> -->
                <!-- <a href="/MainNavigation/Customize" class="rounded px-3 py-3">Customize</a> -->
                <!-- <a href="/MainNavigation/ARSet" class="rounded px-3 py-3">AR</a> -->
                <!-- <a href="/MainNavigation/Playground" class="rounded px-3 py-3"class:active={$page.route.id?.includes("Playground")}>Playground</a> -->
            </div>
        </div>
    </div>
</nav>

<style>
    .active {
      font-weight: bold;
      color: black;
    }

    .activeLine {
        /* visibility: visible; */
        color: yellow;
    }
  </style>