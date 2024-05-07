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
    src: "",
    alt: "",
    description: "",
    availableSizes: [
    [0, 0]
],
    defaultSize: [0, 0]
}

// const Image = {
//     width: 1,
//     height: 1,
//     src: "",
//     description: "",
//     alt: ""
// }
export const currentImageProperties = writable(Image);
export const changeColorMessage = writable(false)
