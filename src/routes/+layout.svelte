<script>
    import "../app.css";
    import { fade } from 'svelte/transition';
    import { navigating } from '$app/stores';
</script>

{#if $navigating}
    <div 
        class="fixed inset-0 z-50 bg-white"
        transition:fade={{ duration: 150 }}
    ></div>
{/if}

<main 
    in:fade={{ duration: 150, delay: 150 }}
    out:fade={{ duration: 150 }}
>
    <slot />
</main>

<style>
    main {
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>