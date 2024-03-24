<script>
  import { onMount } from "svelte";
  import * as THREE from "three";
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  
  
  import {ProfiledContourUVFM, 
    createDotAtPosition, 
    CreateSquareProfileCoordinates,
    createDotAtPositionObject,
    CreateSquareContourCoordinates,
    createDotsfromCoordinatesArray} from '../../../lib/FrameUtilies.js';

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
    camera.position.z = 40;

    // Orthographic camera setup
    // const cameraLeft = -10;
    // const cameraRight = 10;
    // const cameraTop = 10;
    // const cameraBottom = -10;
    // const cameraNear = 1;
    // const cameraFar = 10;
    // const camera = new THREE.OrthographicCamera(cameraLeft, cameraRight, cameraTop, cameraBottom, cameraNear, cameraFar);
    // camera.position.z = 10;

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

    const m0 = new THREE.MeshStandardMaterial( { color: 0xffe3f9, metalness: 0.5, roughness: 0.5, side: THREE.DoubleSide } );
    const m1 = new THREE.MeshStandardMaterial( { color: 0xff7b00, metalness: 0.5, roughness: 0.5, side: THREE.FrontSide } );
    const m2 = new THREE.MeshStandardMaterial( { color: 0xf9f901, metalness: 0.5, roughness: 0.5, side: THREE.FrontSide } );

    const materials = [
      m0,
      m1,
      m2,
    ];

    const animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // RED INDIVIDUAL DOTS
    // var dot1 = createDotAtPosition(-4,0,2, 0xff0000);
    // scene.add(dot1);

    // REAL FRAME    

    // El profile shape es el corte interno del marco. En realidad es una forma en el plano
    // ZX mirandolo desde arriba e
    const profileShapex = CreateSquareProfileCoordinates(1,1,0.1);
    // const profileShapex = [ -1,1, 1,1, 1,-1, -1,-1, -1,1];   
    
  
    const contourx = CreateSquareContourCoordinates(10,30);
    // const contourx = [10,10,  10,-10,  -10,-10  ,-10,10];
    
 
    // let Dots = createDotsfromCoordinatesArray(contourx, 0xff0000, 5);
    // Dots.forEach((dot) => {
    //   scene.add(dot);
    // });

    
    // @ts-ignore
    const frame4 = ProfiledContourUVFM(profileShapex, contourx, materials, false, true);
    frame4.position.z = 3;
    scene.add(frame4);

});

    

    



</script>

<p>This is the playground page</p>

<svelte:head>
  <title>Three.js in SvelteKit</title>
</svelte:head>

<div class="w-full h-[70vh] bg-red-500" bind:this={container}></div>

<button on:click={increaseCount}>
  Click me
</button>

