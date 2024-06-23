<script>
    import HamburgerMenuIcon from "$lib/components/IconComponents/HamburgerMenuIcon.svelte";
    import { goto } from "$app/navigation";

    function GotoHomePage() {
        goto("/");
    }
</script>

<div
    class=" fixed w-full flex flex-row justify-between items-center bg-white h-[10vh] z-10"
>
    <div class="h-[24px] w-[24px] ml-5">
        <button class=" h-auto w-auto" on:click={GotoHomePage}>
            <img
                src="/CompanyLogo.svg"
                alt="CompanyLogo"
                class="h-auto w-auto"
            />
        </button>
    </div>

    <div class="h-[30px] w-[50px]">V3.6 June23</div>

    <div class="h-[24px] w-[24px] mr-5">
        <HamburgerMenuIcon></HamburgerMenuIcon>
    </div>
</div>
