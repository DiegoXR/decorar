import { writable } from 'svelte/store';
import { WebGLRenderer } from 'three'; 
import * as THREE from 'three';

const renderer = new WebGLRenderer();
export const rendererStore = writable(renderer);


const scene  = new THREE.Scene();
export const sceneStore = writable(scene);