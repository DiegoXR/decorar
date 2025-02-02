<script>
    import HamburgerMenuIcon from "$lib/components/IconComponents/HamburgerMenuIcon.svelte";
    import { goto } from "$app/navigation";

    function GotoHomePage() {
        goto("/");
    }
</script>

<div
    class=" fixed w-full flex flex-row items-center justify-around bg-white h-[10vh] z-10"
>

    <div class="h-[35px] w-[35px]">
        <button class=" h-auto w-auto" on:click={GotoHomePage}>
            <img
                src="/CompanyLogo_V3.webp"
                alt="CompanyLogo"
                class="h-auto w-auto"
            />
        </button>
        <!-- <h1 class="font-poppins font-regular text-sm">decorar.space</h1> -->
    </div>

    <!-- <a href="/MainNavigation/AboutUs" class="rounded  py-3 px-2 font-poppins font-regular text-sm">About Us</a> -->

    <!-- <div class="h-[30px] w-[50px]">V3.7 July 7</div> -->

    <!-- <div class="h-[24px] w-[24px] mr-5">
        <HamburgerMenuIcon></HamburgerMenuIcon>
    </div> -->
</div>
