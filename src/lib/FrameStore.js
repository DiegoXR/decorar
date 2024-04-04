import { writable } from 'svelte/store';

const FrameObject = {
    isVisible: true,
    innerWidth: 1,
    innerHeight: 1,
    framewidth: 1,
    frameDepth: 1
}
export const currentFrameProperties = writable(FrameObject);
