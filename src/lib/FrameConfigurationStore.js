// This should be the final version

import { writable } from 'svelte/store';

const FrameConfiguration = {
    ImageSrc: "",
    ImageSize:[0, 0],
    FrameIsVisible: true,
    FrameBorderWidth : 0.05,
    FrameDepth :0, 
    availableSizes: [
        [0, 0]
    ],  
}

export const frameConfigurationStore = writable(FrameConfiguration);