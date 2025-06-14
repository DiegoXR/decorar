<script>
    import "../app.css";
    import { fade } from 'svelte/transition';
    import { navigating } from '$app/stores';
    import PageHeader from "$lib/components/UIComponents/GroupComponents/PageHeader.svelte";
    import Footer from "$lib/components/UIComponents/GroupComponents/Footer.svelte";
</script>

{#if $navigating}
    <div 
        class="fixed inset-0 z-50 bg-white"
        transition:fade={{ duration: 150 }}
    ></div>
{/if}

<PageHeader />

<main 
    in:fade={{ duration: 150, delay: 150 }}
    out:fade={{ duration: 150 }}
    class="pt-[5vh] md:pt-[10vh] lg:pt-[8vh]"
>
    <slot />
</main>

<Footer />

<style>
    main {
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>