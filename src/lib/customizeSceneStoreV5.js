// import { writable } from 'svelte/store';
// import { WebGLRenderer } from 'three'; // Assuming you're using an import like this

// // Correctly specifying the store can hold a WebGLRenderer instance or null
// export const rendererStore = writable<WebGLRenderer | null>(null);




import { writable } from 'svelte/store';
import { WebGLRenderer } from 'three'; // Assuming you're using an import like this



// Assuming you're creating a WebGLRenderer instance somewhere in your code
const renderer = new WebGLRenderer(); // 'options' should be replaced with actual initialization parameters if any

// The store can hold any value, including a WebGLRenderer instance or null
export const rendererStore = writable(renderer);
