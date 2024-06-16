<script>
    // @ts-nocheck

    import ImageCard from "$lib/components/UIComponents/ImageCard.svelte";
    import { onMount } from "svelte";

    let images = [
        {
            src: "/referenceImages/1080_1080.jpg",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.1, 0.1],
                [0.2, 0.2],
                [0.3, 0.3],
            ],
            defaultSize: [0.2, 0.2],
        },
        {
            src: "/referenceImages/1080_1080_v2.jpg",
            alt: "alt text",
            description: "Square",
            availableSizes: [
                [0.3, 0.3],
                [0.4, 0.4],
                [0.5, 0.5],
            ],
            defaultSize: [0.4, 0.4],
        },
        {
            src: "/referenceImages/446_595.jpg",
            alt: "alt text",
            description: "Vertical Portrait",
            availableSizes: [
                [0.2286, 0.3048],
                [0.3048, 0.4064],
                [0.381, 0.508],
                [0.4572, 0.6096],
            ],
            defaultSize: [0.381, 0.508],
        },
        {
            src: "/referenceImages/644_429.jpg",
            alt: "alt text",
            description: "Horizontal Landscape",
            availableSizes: [
                [0.3048, 0.2032],
                [0.4572, 0.3048],
                [0.6096, 0.4064],
                [0.762, 0.508],
                [0.9144, 0.6096],
            ],
            defaultSize: [0.6096, 0.4064],
        }, 
        {
            src: "/referenceImages/sinddy.jpg",
            alt: "alt text",
            description: "Vertical Portrait",
            availableSizes: [
                [0.2286, 0.3048],
                [0.3048, 0.4064],
                [0.381, 0.508],
                [0.4572, 0.6096],
            ],
            defaultSize: [0.381, 0.508],
        }
    ];

    onMount(() => {
        console.log("page loaded my browser");
    });

    let images2 = Array.from({ length: 20 }, (_, i) => i + 1);

</script>

<section class="bg-white py-8">
    <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        <!-- <nav id="store" class="w-full z-30 top-0 px-6 py-1">
            <div
                class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3"
            >
                <a
                    class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl"
                    href="#"
                >
                    Store
                </a>

                <div class="flex items-center" id="store-nav-content">
                    <a
                        class="pl-3 inline-block no-underline hover:text-black"
                        href="#"
                    >
                        <svg
                            class="fill-current hover:text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z"
                            />
                        </svg>
                    </a>

                    <a
                        class="pl-3 inline-block no-underline hover:text-black"
                        href="#"
                    >
                        <svg
                            class="fill-current hover:text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </nav> -->

       {#each images as image}
            <ImageCard {image}/> 
        {/each}

    </div>
</section>

<section class="bg-white py-8">
    <div class="container py-8 px-6 mx-auto">
        <a
            class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl mb-8"
            href="#"
        >
            About
        </a>

        <p class="mt-8 mb-8">
            This template is inspired by the stunning nordic minimalist design -
            in particular:
            <br />
            <a
                class="text-gray-800 underline hover:text-gray-900"
                href="http://savoy.nordicmade.com/"
                target="_blank">Savoy Theme</a
            >
            created by
            <a
                class="text-gray-800 underline hover:text-gray-900"
                href="https://nordicmade.com/">https://nordicmade.com/</a
            >
            and
            <a
                class="text-gray-800 underline hover:text-gray-900"
                href="https://www.metricdesign.no/"
                target="_blank">https://www.metricdesign.no/</a
            >
        </p>

        <p class="mb-8">
            Lorem ipsum dolor sit amet, consectetur <a href="#">random link</a> adipiscing
        </p>
    </div>
</section>
