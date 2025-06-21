<script>
    import "../app.css";
    import { fade } from 'svelte/transition';
    import { navigating } from '$app/stores';
    import PageHeader from "$lib/components/UIComponents/GroupComponents/PageHeader.svelte";

    import { afterNavigate } from '$app/navigation';

    afterNavigate(({ from, to }) => {
        console.log("after navigate", { from: from?.url.pathname, to: to?.url.pathname });
        
        // Force immediate scroll to top without smooth behavior
        setTimeout(() => {
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }, 0);
    });

</script>

<div class="site-wrapper">
    {#if $navigating}
        <div 
            class="fixed inset-0 z-50 bg-white"
            transition:fade={{ duration: 150 }}
        ></div>
    {/if}

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
    
    :global(footer) {
        flex-shrink: 0;
        position: relative;
        z-index: 10;
    }
</style>