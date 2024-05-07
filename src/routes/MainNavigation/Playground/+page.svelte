<script>
  import { onMount } from "svelte";
  import * as THREE from "three";
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  import {ProfiledContourUVFM} from '../../../lib/FrameUtilies.js';
  import * as SQUAREFRAME from '../../../lib/FrameUtilitiesSquare.js';
  import DropdownInitializable from "$lib/components/DropdownInitializable.svelte";

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const speed = 5; // Speed of the camera movemen



  /**
   * @type {HTMLDivElement}
   */
  let container;
  let  flexibleNumber = 1;

  const scene = new THREE.Scene();

// Function to increase the count
function increaseCount() {
        flexibleNumber += 1;
        console.log("Number increased");
      }

  onMount(async () => {
    //const scene = new THREE.Scene();
    
  
    // Perspective Camera setup
    const fov = 75; // Field of view
    const aspect = window.innerWidth / window.innerHeight; // Display aspect
    const near = 0.1; // Near clipping plane
    const far = 50; // Far clipping plane
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    // Orthographic camera setup

    // const orthoConstants = 5;
    // const cameraLeft = -orthoConstants;
    // const cameraRight = orthoConstants;
    // const cameraTop = orthoConstants;
    // const cameraBottom = -orthoConstants;
    // const cameraNear = 0.01;
    // const cameraFar = 5;
    // const camera = new THREE.OrthographicCamera(cameraLeft, cameraRight, cameraTop, cameraBottom, cameraNear, cameraFar);
    // camera.position.z = 3.1;
    // camera.position.x = 0;

   // Rederer Setup
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);


    const controls = new OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 1000;
    controls.maxPolarAngle = Math.PI / 2

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 3); // color blanco, intensidad 0.5
    scene.add(ambientLight);


    // Directional Light
    const color = 0xffffff; // White
    const intensity = 1; // Full intensity
    const directionalLight = new THREE.DirectionalLight(color, intensity);
    directionalLight.position.set(1, 1, 1); 
    scene.add(directionalLight);
   
    // Adding a plane for reference
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.MeshBasicMaterial({color: 0x576b6b});
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(0, 0, 0);
    scene.add(plane);

    const geometry2 = new THREE.PlaneGeometry(0.5, 1);
    const material2 = new THREE.MeshBasicMaterial({color: 0xff0000});
    const plane2 = new THREE.Mesh(geometry2, material2);
    plane2.position.set(0, 0, 0.02);
    scene.add(plane2);

    // Adding grid
    const size = 1;
    const divisions = 100;
    const gridHelper = new THREE.GridHelper( size, divisions, 0x0000ff);
    gridHelper.rotateX(Math.PI / 2);
    gridHelper.position.set(0, 0, 0.01);   
    // scene.add( gridHelper );

    // const texturePath = "/referenceTextures/Checker_256.png";
    const texturePath = "/referenceTextures/Oak_512.png";
    const texture = new THREE.TextureLoader().load(texturePath);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 1);

    // const m0 = new THREE.MeshStandardMaterial( { color: 0xffe3f9, metalness: 0.5, roughness: 0.5, side: THREE.DoubleSide } );
    const m0 = new THREE.MeshStandardMaterial( { map: texture, 
      side: THREE.FrontSide,
      transparent : true,
      opacity :0.5 } );  

    const materials = [
      m0
    ];

    const animate = function () {

      const time = performance.now();
    const delta = (time - prevTime) / 1000;

    velocity.set(0, 0, 0);
    direction.set(0, 0, 0);

    if (moveForward) direction.z -= 1;
    if (moveBackward) direction.z += 1;
    if (moveLeft) direction.x -= 1;
    if (moveRight) direction.x += 1;
    if (moveUp) direction.y += 1;
    if (moveDown) direction.y -=1;

    // Normalize the direction vector, so moving diagonally doesn't exceed the max speed
    direction.normalize();

    // Apply the speed to the velocity in the direction we want to move
    velocity.addScaledVector(direction, speed * delta);

    // Move the camera by the calculated velocity
    camera.position.add(velocity);

      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);

      prevTime = time;
    };

    let prevTime = performance.now();

    animate();

    // REAL FRAME    
    const innerWidth = 0.5;
    const innerHeight = 1;
    const framewidth = 0.09;
    const frameDepth = 0.3;
    const frame4 = SQUAREFRAME.CreateFrameSquare(innerWidth, innerHeight, framewidth, frameDepth, materials)

    // @ts-ignore
    frame4.position.z = 0;  
    // @ts-ignore
    scene.add(frame4);
});

    
    /**
     * @param {{ code: any; }} event
     */
function onKeyDown(event) {
    switch (event.code) {
        case 'KeyW':
            moveForward = true;
            break;
        case 'KeyA':
            moveLeft = true;
            break;
        case 'KeyS':
            moveBackward = true;
            break;
        case 'KeyD':
            moveRight = true;
            break;
        case 'KeyE':
            moveUp = true;
            break;
        case 'KeyQ':
            moveDown = true;
            break;
    }
}

    /**
     * @param {{ code: any; }} event
     */
function onKeyUp(event) {
    switch (event.code) {
        case 'KeyW':
            moveForward = false;
            break;
        case 'KeyA':
            moveLeft = false;
            break;
        case 'KeyS':
            moveBackward = false;
            break;
        case 'KeyD':
            moveRight = false;
            break;
        case 'KeyE':
            moveUp = false;
            break;
        case 'KeyQ':
            moveDown = false;
            break;
    }
}
    
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

/**
 * @type {string}
 */
let selectedInnerSize = '1 x 1';

let options = ['A','B','C','D','E'];
let defaultOption = 'C';

</script>

<p>This is the playground page</p>

<svelte:head>
  <title>Three.js in SvelteKit</title>
</svelte:head>

<div class="w-full h-[70vh] bg-red-500" bind:this={container}></div>

<button on:click={increaseCount}>
  Click me
</button>

<!-- <DropdownInitializable bind:selectedOption={selectedInnerSize} availableSizes={options} defaultSize={defaultOption}/>  -->
