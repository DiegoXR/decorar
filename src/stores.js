import { writable } from 'svelte/store';

// Define the type for the image object
const Image = {
    width: "",
    height: "",
    src: "",
    description: "",
    alt: ""
}

export const selectedImageObject = writable(Image);
export const changeColorMessage = writable(false)
