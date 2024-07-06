import { writable } from 'svelte/store';

const GlobalProperties = {
    ImageSize:[0, 0],
    FrameIsVisible: true,
    FrameBorderWidth : 0.02,
    FrameDepth :0.02,   
}

export const currentGlobalPropertiesStore = writable(GlobalProperties);
