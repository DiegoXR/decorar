<script>
import HamburgerMenuIcon from "$lib/components/HamburgerMenuIcon.svelte";
</script>

<div
    class="fixed flex h-[10vh] w-full flex-row justify-between items-center bg-white p-6"
>
    <div class="h-[24px] w-[24px]">  
        <img src="/CompanyLogo.svg" alt="CompanyLogo" class="h-auto w-auto" /> 
    </div>

    <div class="h-[24px] w-[24px]">

        <HamburgerMenuIcon></HamburgerMenuIcon>
    </div>
</div>
