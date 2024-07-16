import { writable } from 'svelte/store';

// Define the type for the image object


const Image = {
    author: "",
    src: "",
    alt: "",
    description: "",
    availableSizes: [
    [0, 0]
],
    defaultSize: [0, 0]
}


export const currentSelectedImageStore = writable(Image);
export const changeColorMessage = writable(false)
