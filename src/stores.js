import { writable } from 'svelte/store';

// export const selectedImage = writable(null);
// export const selectedImage = writable<string | null>(null);

// export const selectedText = writable<string>(null);
export const selectedImage = writable('world');


// Define the type for the image object
const Image = {
    width: "",
    height: "",
    src: "",
    description: "",
    alt: ""
}

// export const selectedImageObject = writable<Image || null>(null);
export const selectedImageObject = writable(Image);
// {
//     src: "/referenceImages/1080_608.jpg",
//     alt: "alt text",
//     description: "Horizontal Landscape",
//     width: 1080,
//     height: 608,
// },