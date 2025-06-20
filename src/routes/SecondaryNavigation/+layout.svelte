<script lang="js">
    import PageHeader from "$lib/components/UIComponents/GroupComponents/PageHeader.svelte";
    import GoogleAnalytics from "$lib/components/Analytics/GoogleAnalytics.svelte";
    import CloudfareAnalytics from "$lib/components/Analytics/CloudfareAnalytics.svelte";
    import Footer from "$lib/components/UIComponents/GroupComponents/Footer.svelte";
    import FakePageHeader from "$lib/components/UIComponents/CustomMadeComponents/FakePageHeader.svelte";

</script>

<GoogleAnalytics></GoogleAnalytics>
<PageHeader></PageHeader>
<div class="main-content-wrapper w-full">           
    <!-- SPACER BEHIND THE HEADER  -->
    <FakePageHeader />
    <!-- SLOT FOR OTHER PAGES  -->
    <div class="w-full">
        <slot />
    </div>
</div>


<Footer />
<CloudfareAnalytics></CloudfareAnalytics>

<style>
    .main-content-wrapper {
        display: flex;
        flex-direction: column;
        min-height: calc(100vh - 300px);
        position: relative;
    }

</style>
