// src/stores/sceneStore.js
import { writable } from 'svelte/store';
import * as THREE from 'three';

function createSceneStore() {
  
    const { subscribe, set, update } = writable({
    renderer: new THREE.WebGLRenderer({ antialias: true }),
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
    // Add any other objects or state you need to be persistent across pages
  });

  return {
    subscribe,
    initialize: () => {
      // Initialize or reset the scene, camera, etc.
      update(currentState => {
        currentState.camera.position.set(0, 0, 5);
        currentState.scene.add(new THREE.AxesHelper(5)); // Example addition
        // Reset or add to the scene as necessary
        return currentState;
      });
    },
    // You can add more methods to control the scene, camera, etc.
  };
}

export const sceneStore = createSceneStore();
