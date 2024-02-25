// store.js
import { writable } from 'svelte/store';
import * as THREE from 'three';

function createInitialScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xabcdef);

  // Create a camera
//   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const camera = new THREE.PerspectiveCamera(75, 100, 0.1, 1000);
  camera.position.z = 5;

  // Create a renderer
  const renderer = new THREE.WebGLRenderer();
//   renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setSize(100, 200);

  // Add a basic mesh to the scene
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Return the scene, camera, and renderer as an object
  return { scene, camera, renderer };
}

export const sceneStore = writable(createInitialScene());
