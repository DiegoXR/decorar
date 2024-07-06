import { writable } from 'svelte/store';

// Create a writable store with an initial value of false
export const isMainPageVisited = writable(false);

// export default isMainPageVisited;