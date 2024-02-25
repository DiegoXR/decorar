/* import { writable } from 'svelte/store';
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

// Store for the canvas element, initialized without specifying HTMLCanvasElement type here
export const canvasStore = writable(null);

export const initializeScene = () => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  // Ensure the renderer uses the canvas from our Svelte store if it's already set
  const renderer = new WebGLRenderer({ canvas: canvasStore.get() || undefined });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Append renderer's DOM element only if it's not already in the document
  if (!document.body.contains(renderer.domElement)) {
    document.body.appendChild(renderer.domElement);
  }

  const geometry = new BoxGeometry();
  const material = new MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 5;

  // Update the canvasStore with the renderer's canvas element
  canvasStore.set(renderer.domElement);

  // Animation loop or rendering logic here, if needed
};
 */