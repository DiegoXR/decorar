<script>
    import "../app.css";
    import { fade } from 'svelte/transition';
    import { navigating } from '$app/stores';
    import PageHeader from "$lib/components/UIComponents/GroupComponents/PageHeader.svelte";
</script>

<div class="site-wrapper">
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
        class="site-content"
    >
        <slot />
    </main>
</div>

<style>
    /* Site wrapper with flexbox sticky footer pattern */
    :global(html, body) {
        height: 100%;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
    }
    
    .site-wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        width: 100%;
        position: relative;
    }
    
    .site-content {
        flex: 1 0 auto;
        width: 100%;
        position: relative;
        padding-top: 5vh;
    }
    
    @media (min-width: 768px) {
        .site-content {
            padding-top: 10vh;
        }
    }
    
    @media (min-width: 1024px) {
        .site-content {
            padding-top: 8vh;
        }
    }
    
    :global(footer) {
        flex-shrink: 0;
        position: relative;
        z-index: 10;
    }
</style>