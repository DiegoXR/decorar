<script>
    import BaseButton from "$lib/components/UIComponents/CustomMadeComponents/BaseButton.svelte";
</script>

<div class="flex justify-center mt-10">
    <BaseButton 
        label="Generate 3D"
        variant="BaseHighlighted"
        class="button-4 hidden sm:block"
        on:click={async () => {
            const { goto } = await import('$app/navigation');
            await goto('/MainNavigation/3DPage');
        }}
    />
</div>
