<script>
    import HamburgerMenuIcon from "$lib/components/IconComponents/HamburgerMenuIcon.svelte";
    import { goto } from "$app/navigation";

    function GotoHomePage() {
        goto("/");
    }
</script>

<div
    class=" fixed w-full flex flex-row justify-between items-center bg-red-800 h-[10vh] mt-[4px] ml-[4px]"
>
    <div class="h-[24px] w-[24px]">
        <button class=" h-auto w-auto" on:click={GotoHomePage}>
            <img
                src="/CompanyLogo.svg"
                alt="CompanyLogo"
                class="h-auto w-auto"
            />
        </button>
    </div>

    <div class="h-[24px] w-[24px]">V2.9 June 06</div>

    <div class="h-[24px] w-[24px]">
        <HamburgerMenuIcon></HamburgerMenuIcon>
    </div>
</div>
