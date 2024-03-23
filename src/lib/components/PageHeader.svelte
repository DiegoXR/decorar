<script>
    import HamburgerMenuIcon from "$lib/components/HamburgerMenuIcon.svelte";
    import { goto } from "$app/navigation";

    function GotoHomePage() {
        goto("/");
    }
</script>

<div
    class="fixed flex h-[10vh] w-full flex-row justify-between items-center bg-white p-6"
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

    <div class="h-[24px] w-[24px]">V2.2</div>

    <div class="h-[24px] w-[24px]">
        <HamburgerMenuIcon></HamburgerMenuIcon>
    </div>
</div>
