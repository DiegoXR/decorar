<script>
    // @ts-nocheck

    import ImageCard from "$lib/components/UIComponents/ImageCard.svelte";
    import { onMount } from "svelte";
    import { currentSelectedImageStore } from '../../../lib/CurrentSelectedImageStore';
    import InputImage from "$lib/components/InputImage.svelte";

    let images = [
        {
            author : "Oladimeji Odunsi",
            src: "/referenceImages/oladimeji-odunsi-br7vCg8693o-unsplash_0.8.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.508, 0.635],
                [0.6096, 0.762],
            ],
            defaultSize: [0.6096, 0.762],
        },
        {
            author : "Pexels Steve",
            src: "/referenceImages/pexels-steve-1292241_1.5.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.762, 0.508],
                [0.9144, 0.6096],
            ],
            defaultSize: [0.9144, 0.6096],
        },
        {
            author : "Jocelyn Morales",
            src: "/referenceImages/jocelyn-morales-R3Mi_Y1JQ4-unsplash_0.67.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.508, 0.762],
                [0.6096, 0.9144],
            ],
            defaultSize: [0.6096, 0.9144],
        },
        {
            author : "Laura Chouette",
            src: "/referenceImages/laura-chouette-g6Ny4dvHlE0-unsplash_0.67.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.508, 0.762],
                [0.6096, 0.9144],
            ],
            defaultSize: [0.6096, 0.9144],
        },
        {
            author : "Alex Rainer",
            src: "/referenceImages/alex_rainer-2_f83Sqwdrg-unsplash_0.67.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.508, 0.762],
                [0.6096, 0.9144],
            ],
            defaultSize: [0.6096, 0.9144],
        },
        {
            author : "Giorgio Trovato",
            src: "/referenceImages/giorgio-trovato-EI-bSCZ17o-unsplash_1.5.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.762, 0.508],
                [0.9144, 0.6096],
            ],
            defaultSize: [0.9144, 0.6096],
        },
        {
            author : "Andreas Rasmuss",
            src: "/referenceImages/andreas-rasmussen-GhvpEtG5HMs-unsplash.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.254,0.356],
                [0.005,0.007],
                [0.007,0.010],
               
            ],
            defaultSize: [0.005,0.007],
        },      
        {
            author : "christopher James",
            src: "/referenceImages/christopher-james-scheller-WkR5V4gENDw-unsplash.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                 [0.254,0.356],
                 [0.005,0.007],
                 [0.007,0.010],
                
            ],
            defaultSize:  [0.005,0.007],
        }, 
        {
            author : "Damien Bozzini",
            src: "/referenceImages/damien-bozzini-fIjexR_afi4-unsplash.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.406,0.508],
                [0.508,0.635],
                [0.610,0.762],
            ],
            defaultSize: [0.406,0.508],
        }, 
        {
            author : "Denys Nevozhai",
            src: "/referenceImages/denys-nevozhai-D68ADLeMh5Q-unsplash.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
               [0.356,0.254],
                
            ],
            defaultSize: [0.356,0.254],
        
        },
        {
            author : "Curiosophotography",
            src: "/referenceImages/pexels-curiosophotography-288099.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.305, 0.305],
                [0.406, 0.406],
                [0.508, 0.508],
            ],
            defaultSize: [0.305, 0.305],
        },  
        {
            author : "Eberhardgross",
            src: "/referenceImages/pexels-eberhardgross-2086361.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.254,0.356],
                [0.005,0.007],
                [0.007,0.010],
            ],
            defaultSize: [0.005,0.007],
        },  
        {
            author : "Enginakyurt",
            src: "/referenceImages/pexels-enginakyurt-1520587.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.305, 0.305],
                [0.406, 0.406],
                [0.508, 0.508],
            ],
            defaultSize: [0.305, 0.305],
        },  
        {
            author : "Hngstrm",
            src: "/referenceImages/pexels-hngstrm-1939485.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.254,0.356],
                [0.005,0.007],
                [0.007,0.010],
            ],
            defaultSize: [0.005,0.007],
        },  
        {
            author : "Siyan Ren",
            src: "/referenceImages/siyan-ren-jN_VbffJHlI-unsplash.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.610, 0.406],
                [0.762, 0.508],
                [0.914, 0.610],
            ],
            defaultSize: [0.610, 0.406],
        },   
        {
            author : "  Tianshu Liu",
            src: "/referenceImages/tianshu-liu-SBK40fdKbAg-unsplash.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.406, 0.305],
                [0.508, 0.381],
                [0.610, 0.457],
            ],
            defaultSize:  [0.406, 0.305],
        },   
        {
            author : "Steve",
            src: "/referenceImages/pexels-steve-1690351.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.254,0.356],
                [0.005,0.007],
                [0.007,0.010],
            ],
            defaultSize: [0.005,0.007],
        },
        {
            author : "Bdna",
            src: "/referenceImages/pexels-bdna-2807495.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.254,0.356],
                [0.005,0.007],
                [0.007,0.010],
            ],
            defaultSize: [0.005,0.007],

            },
            {
            author : "Karina Lago",
            src: "/referenceImages/karina-lago--OpEshnHkWk-unsplash.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.254,0.356],
                [0.005,0.007],
                [0.007,0.010],
            ],
            defaultSize: [0.005,0.007],

            },
            {
            author : "Ren Ran",
            src: "/referenceImages/ren-ran-bBiuSdck8tU-unsplash.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.254,0.356],
                [0.005,0.007],
                [0.007,0.010],
            ],
            defaultSize: [0.005,0.007],

        },
        {
            author : "Europeana",
            src: "/referenceImages/europeana-5TK1F5VfdIk-unsplash.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.254,0.356],
                [0.005,0.007],
                [0.007,0.010],
            ],
            defaultSize: [0.005,0.007],

        },
        {
            author : "Enrol Ahmed",
            src: "/referenceImages/erol-ahmed-aIYFR0vbADk-unsplash (1).webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.254,0.356],
                [0.005,0.007],
                [0.007,0.010],
            ],
            defaultSize: [0.005,0.007],

        },
        {
            author : "Launde Morel",
            src: "/referenceImages/launde-morel-FmaYOjaMQ50-unsplash.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.356,0.406],
                [0.762,0.508],
                [0.914,0.610],
            ],
            defaultSize: [0.356,0.406],

        },
         {
            author : "Steven Diaz",
            src: "/referenceImages/steven-diaz-9lqOuSQhNCM-unsplash.webp",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.356,0.406],
                [0.762,0.508],
                [0.914,0.610],
            ],
            defaultSize: [0.356,0.406],

        },
    ];

    onMount(() => {
        // console.log("page loaded my browser");
        // Preselect the first image
        currentSelectedImageStore.set(images[0]);
    });

</script>
<InputImage></InputImage>
<section class="bg-white py-8">
    <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
       {#each images as image}
            <ImageCard {image}/> 
        {/each}
    </div>
</section>


