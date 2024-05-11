import { writable } from 'svelte/store';


const GlobalProperties = {
    ImageWidth: 0,
    ImageHeigh:  0,
    ImageSize:[0, 0],
    FrameIsVisible: true
}


export const currentGlobalPropertiesStore = writable(GlobalProperties);
