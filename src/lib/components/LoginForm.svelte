<script>
  import { fade } from 'svelte/transition';
</script>
<form in:fade={{ duration: 900 }} class="relative">
    <input type="text" class="mb-2 w-full rounded border  border-slate-600 px-6 py-3" placeholder="Email" value="" />
    <input type="password" class="mb-2 w-full rounded border border-slate-600 px-6 py-3" placeholder="Password" value="" />
    <button class="w-full rounded bg-primary px-5 py-2.5 text-[19px] text-base text-white transition-colors hover:bg-slate-700 font-medium">Log In</button>
</form>
