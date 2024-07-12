<script>
    import HamburgerMenuIcon from "$lib/components/IconComponents/HamburgerMenuIcon.svelte";
    import { goto } from "$app/navigation";

    function GotoHomePage() {
        goto("/");
    }
</script>

<div
    class=" fixed w-full flex flex-row items-center justify-center bg-white h-[10vh] z-10"
>
    <div class="h-[35px] w-[35px]">
        <button class=" h-auto w-auto" on:click={GotoHomePage}>
            <img
                src="/CompanyLogoV2.svg"
                alt="CompanyLogo"
                class="h-auto w-auto"
            />
        </button>
    </div>
    <!-- <div class="h-[30px] w-[50px]">V3.7 July 7</div> -->

    <!-- <div class="h-[24px] w-[24px] mr-5">
        <HamburgerMenuIcon></HamburgerMenuIcon>
    </div> -->
</div>
