import { writable } from 'svelte/store';

// Define the type for the image object
// const Image = {
//     width: Number,
//     height: Number,
//     src: "",
//     description: "",
//     alt: ""
// }

const Image = {
    width: 1,
    height: 1,
    src: "",
    description: "",
    alt: ""
}
export const selectedImageObject = writable(Image);
export const changeColorMessage = writable(false)
