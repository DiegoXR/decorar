<script>
    import { goto } from "$app/navigation";
    import { page } from '$app/stores';
    import BaseButton from "$lib/components/UIComponents/CustomMadeComponents/BaseButton.svelte";

    const navLinkClass = 'body-4 text-gray-600 hover:text-black transition-colors';
    
    // Check if current page is the homepage
    $: isHomepage = $page.url.pathname === '/';

    function GotoHomePage() {
        goto("/");
    }
    
    function GetStarted() {
        goto("/MainNavigation/Explore");
    }
</script>

<header class="fixed top-0 left-0 w-full flex flex-row items-center bg-white h-[8vh] md:h-[12vh] lg:h-[6vh] xl:h-[8vh] z-20 shadow-sm px-4 lg:px-8 xl:px-16">
    <!-- Three-column layout with equal widths -->
    <div class="w-1/3">
        <!-- Child 1: Logo and Text (Left aligned) -->
        <div class="flex items-center">
            <button class="flex items-center" on:click={GotoHomePage}>
                <img
                    src="/CompanyLogo_V3.webp"
                    alt="Decorar Logo"
                    class="h-8 w-8"
                    width="32"
                    height="32"
                    loading="lazy"
                />
                <h1 class="text-black subtitle-3 ml-2 hidden sm:block">decorar.space</h1>
            </button>
        </div>
    </div>

    <!-- Child 2: Navigation Links (Center aligned) -->
    <nav class="hidden md:flex justify-center items-center w-1/3">
        <div class="flex space-x-6">
            <a href="/" class={navLinkClass}>Home</a>
            <a href="/SecondaryNavigation/About/Company" class={navLinkClass}>About</a>
            <a href="/SecondaryNavigation/Product/UserGuide" class={navLinkClass}>User Guide</a>
            <!-- <a href="/blog" class={navLinkClass}>Blog</a> -->
        </div>
    </nav>

    <!-- Child 3: Get Started Button and Mobile Menu (Right aligned) -->
    <div class="w-1/3 flex justify-end">
        {#if isHomepage}
            <BaseButton
                label="Get Started"
                variant="BaseHighlighted"
                class="button-4 hidden sm:block"
                on:click={GetStarted}
            />
        {:else}
            <!-- Empty div to maintain spacing when button is not shown -->
            <div class="hidden sm:block"></div>
        {/if}
        
        <!-- Mobile menu button -->
        <button class="p-2 sm:hidden" aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
    </div>
</header>