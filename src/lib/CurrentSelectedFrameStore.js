import { writable } from 'svelte/store';

const FrameObject = {
    isVisible: true,
    innerWidth: 1,
    innerHeight: 1,
    borderWidth: 1,
    borderDepth: 1
}
export const currentSelectedFrameDimensionsStore = writable(FrameObject);
