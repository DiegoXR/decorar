import { writable } from 'svelte/store';
import { WebGLRenderer } from 'three'; 
import * as THREE from 'three';



const renderer = new WebGLRenderer();
export const rendererStore = writable(renderer);



// Scene store comes with a predefined light
const scene  = new THREE.Scene();
//Create ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 3); // color blanco, intensidad 0.5
scene.add(ambientLight);

export const sceneStore = writable(scene);



export const sceneIsReady = writable(false);