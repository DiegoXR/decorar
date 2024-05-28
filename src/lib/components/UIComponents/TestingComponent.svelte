<script>
     import {onMount} from "svelte";
     
     printsinddy();
     
     onMount(() => {

        console.log("Mounting Testing component");

    });

    function printsinddy(){
    console.log("Sinddy");
}
</script>

<div>
    {console.log('HTML Child section rendered')}
    <p>Hello</p>
</div>

