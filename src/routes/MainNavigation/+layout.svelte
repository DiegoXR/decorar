<script>
import PageHeader from "$lib/components/PageHeader.svelte";
import NavigationBar from "$lib/components/NavigationBar.svelte";
</script>

<PageHeader></PageHeader>
<NavigationBar></NavigationBar>
<div class ="w-max h-[15vh]"></div>
<slot></slot> <!-- Here is where the content of your pages will be injected -->
