<script>
  import { onMount } from "svelte";
  import * as THREE from "three";
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  
  
  import {ProfiledContourUVFM, 
    createDotAtPosition, 
    CreateSquareProfileCoordinates,
    createDotAtPositionObject,
    CreateSquareContourCoordinates,
    CreateSquareContourCoordinatesWithIntermediatePoints,
    createDotsfromCoordinatesArray} from '../../../lib/FrameUtilies.js';


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
    camera.position.z = 20;

    // Orthographic camera setup
    // const cameraLeft = -10;
    // const cameraRight = 10;
    // const cameraTop = 10;
    // const cameraBottom = -10;
    // const cameraNear = 1;
    // const cameraFar = 10;
    // const camera = new THREE.OrthographicCamera(cameraLeft, cameraRight, cameraTop, cameraBottom, cameraNear, cameraFar);
    // camera.position.z = 3;
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
    directionalLight.position.set(1, 1, 1); // x, y, z
    scene.add(directionalLight);
   
    // Adding grid
    const size = 50;
    const divisions = 50;
    const gridHelper = new THREE.GridHelper( size, divisions, 0x0000ff);
    gridHelper.rotateX(Math.PI / 2);
    gridHelper.position.set(0, 0, 2);   
    scene.add( gridHelper );

    // Adding a plane for reference
    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.MeshBasicMaterial({color: 0x576b6b});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);


    const texture = new THREE.TextureLoader().load("/referenceTextures/Checker_256.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
     texture.repeat.set(3, 1);

    // const m0 = new THREE.MeshStandardMaterial( { color: 0xffe3f9, metalness: 0.5, roughness: 0.5, side: THREE.DoubleSide } );
    const m0 = new THREE.MeshStandardMaterial( { map: texture, side: THREE.FrontSide } );  
    const m1 = new THREE.MeshStandardMaterial( { color: 0xff7b00, metalness: 0.5, roughness: 0.5, side: THREE.FrontSide } );
    const m2 = new THREE.MeshStandardMaterial( { color: 0xf9f901, metalness: 0.5, roughness: 0.5, side: THREE.FrontSide } );

    const materials = [
      m0,
      m1,
      m2,
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

    // RED INDIVIDUAL DOTS
    // var dot1 = createDotAtPosition(-4,0,2, 0xff0000);
    // scene.add(dot1);

    // REAL FRAME    

    // El profile shape es el corte interno del marco. En realidad es una forma en el plano
    // ZX mirandolo desde arriba e
     const profileShapex = CreateSquareProfileCoordinates(1,1,0.03);
    // const profileShapex = [ -1,1, 1,1, 1,-1, -1,-1, -1,1];   
    
    // const contourx = CreateSquareContourCoordinates(10,10);
     const contourx = CreateSquareContourCoordinatesWithIntermediatePoints(10,5,2,2);
    // const contourx = [10,10,  10,-10,  -10,-10  ,-10,10];

    
    // let Dots = createDotsfromCoordinatesArray(contourx, 0xff0000, 5);
    // Dots.forEach((dot) => {
    //   scene.add(dot);
    // });

    
    // @ts-ignore
    const frame4 = ProfiledContourUVFM(profileShapex, contourx, materials, false, true);
    // @ts-ignore
    frame4.position.z = 3;  
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


</script>

<p>This is the playground page</p>

<svelte:head>
  <title>Three.js in SvelteKit</title>
</svelte:head>

<div class="w-full h-[70vh] bg-red-500" bind:this={container}></div>

<button on:click={increaseCount}>
  Click me
</button>

