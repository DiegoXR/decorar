<script>
    import { browser} from '$app/environment';  
   

    let isQ1YesButtonClicked = false;
    let isQ1NOButtonClicked = false;

    let isQ2YesButtonClicked = false;
    let isQ2NOButtonClicked = false;

 
    function handdleQ1YesButton(){
    if (browser && window.gtag) {
    window.gtag("event", "post_score", {     
    question: "1",
    answer: "Q1YES"
    });
    }  
    if (!isQ1YesButtonClicked)isQ1YesButtonClicked = !isQ1YesButtonClicked;
    }

    function handdleQ1NOButton(){
    if (browser && window.gtag) {
        window.gtag("event", "post_score", {     
    question: "1",
    answer: "Q1NO"
    });
    }  
    if (!isQ1NOButtonClicked)isQ1NOButtonClicked = !isQ1NOButtonClicked;
    }

    function handdleQ2YesButton(){
    if (browser && window.gtag) {
        window.gtag("event", "post_score", {     
    question: "2",
    answer: "Q2YES"
    });
    }  
    if (!isQ2YesButtonClicked)isQ2YesButtonClicked = !isQ2YesButtonClicked;
    }

    
    function handdleQ2NOButton(){
    if (browser && window.gtag) {
        window.gtag("event", "post_score", {     
    question: "2",
    answer: "Q2NO"
    });
    }  
    if (!isQ2NOButtonClicked)isQ2NOButtonClicked = !isQ2NOButtonClicked;
    }
</script>


<div class="text-white  flex justify-center m-3">
    <p class=" m-auto font-bold">Did you use a phone equipped with LiDAR ?</p>
</div>

<div  class ="flex justify-around  ml-[20vw] mr-[20vw] pb-10">
    <button class="text-white font-bold py-2 px-4 {isQ1YesButtonClicked ? 'bg-green-500' : 'bg-gray-800'} border-white border-2" on:click={handdleQ1YesButton}
     disabled={isQ1NOButtonClicked}>
        YES
    </button>
    
    <button class="text-white font-bold py-2 px-4 border-white border-2 {isQ1NOButtonClicked ? 'bg-red-500' : 'bg-gray-800'}" on:click={handdleQ1NOButton}
    disabled={isQ1YesButtonClicked}
    >
        NO
    </button>
</div>

<div class="text-white  flex justify-center m-3">
    <p class=" m-auto font-bold">Overall did you like the experience ?</p>
</div>

<div  class ="flex justify-around  ml-[20vw] mr-[20vw] pb-10">
    <button class="text-white font-bold py-2 px-4 {isQ2YesButtonClicked ? 'bg-green-500' : 'bg-gray-800'} border-white border-2" on:click={handdleQ2YesButton}
     disabled={isQ2NOButtonClicked}>
        YES
    </button>
    
    <button class="text-white font-bold py-2 px-4 border-white border-2 {isQ2NOButtonClicked ? 'bg-red-500' : 'bg-gray-800'}" on:click={handdleQ2NOButton}
    disabled={isQ2YesButtonClicked}
    >
        NO
    </button>
</div>

<div class ="flex justify-around  ml-[20vw] mr-[20vw] pb-10 text-white">
    <p>Thanks for your feedback</p>
</div>






