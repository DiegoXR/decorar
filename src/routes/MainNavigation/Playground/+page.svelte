<script>
  import { onMount } from "svelte";
  import * as THREE from "three";
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  import {ProfiledContourUV, createDotAtPosition, CalculateCoordinatesInQuadrant} from '../../../lib/FrameUtilies.js';

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

    // const camera = new THREE.OrthographicCamera(
    //   75,
    //   container.clientWidth / container.clientHeight,
    //   0.1,
    //   1000,
    // );


    // Orthographic camera setup
    const cameraLeft = -10;
    const cameraRight = 10;
    const cameraTop = 10;
    const cameraBottom = -10;
    const cameraNear = 1;
    const cameraFar = 100;
    const camera = new THREE.OrthographicCamera(cameraLeft, cameraRight, cameraTop, cameraBottom, cameraNear, cameraFar);


    camera.position.z = 10;

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
   
    // Adding grid
    const size = 20;
    const divisions = 20;
    const gridHelper = new THREE.GridHelper( size, divisions, 0x0000ff);
    gridHelper.rotateX(Math.PI / 2);
    gridHelper.position.set(0, 0, 2);   
    scene.add( gridHelper );

    // Adding a green cube for reference
    const geometry = new THREE.PlaneGeometry(10, 10);
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Adding dots
    var dot1 = createDotAtPosition(-4,0,2, 0xff0000);

    var dot2 = createDotAtPosition(-4,3,2, 0xff0000);
    scene.add(dot2);

    var dot3 = createDotAtPosition(-3.5,3.5,2, 0xff0000);
    scene.add(dot3);

    var dot4 = createDotAtPosition(-3,4,2, 0xff0000);
    scene.add(dot4);

    // const  tex1 = new THREE.TextureLoader().load( 'uvgrid01.png' );
    // const  tex2 = new THREE.TextureLoader().load( 'beech.jpg' ); // License: free, Non-commercial use
    // const  tex3 = new THREE.TextureLoader().load( 'pngwing-com-water.png' );// License:  free, Non-commercial use

    const m0 = new THREE.MeshPhongMaterial({
      color: 0xfa0001,
      side: THREE.DoubleSide,
    });
    const m1 = new THREE.MeshPhongMaterial({
      color: 0xff7b00,
      side: THREE.DoubleSide,
    });
    const m2 = new THREE.MeshPhongMaterial({
      color: 0xf9f901,
      side: THREE.DoubleSide,
    });

    // const m0 = new THREE.MeshPhongMaterial( { map: tex1, side: THREE.DoubleSide } );
    // const m1 = new THREE.MeshPhongMaterial( { map: tex2, side: THREE.DoubleSide } );
    // const m2 = new THREE.MeshPhongMaterial( { map: tex3, side: THREE.DoubleSide } );

    const m3 = new THREE.MeshPhongMaterial({
      color: 0x008601,
      side: THREE.DoubleSide,
    });
    const m4 = new THREE.MeshPhongMaterial({
      color: 0x01bbbb,
      side: THREE.DoubleSide,
    });
    const m5 = new THREE.MeshPhongMaterial({
      color: 0x250290,
      side: THREE.DoubleSide,
    });

    // const m3 = new THREE.MeshPhongMaterial( { map: tex1, side: THREE.DoubleSide } );
    // const m4 = new THREE.MeshPhongMaterial( { map: tex3, side: THREE.DoubleSide } );
    // const m5 = new THREE.MeshPhongMaterial( { map: tex2, side: THREE.DoubleSide } );

    const m6 = new THREE.MeshPhongMaterial({
      color: 0xfc4ea5,
      side: THREE.DoubleSide,
    });
    const m7 = new THREE.MeshPhongMaterial({
      color: 0x83058a,
      side: THREE.DoubleSide,
    });
    const m8 = new THREE.MeshPhongMaterial({
      color: 0x83058a,
      side: THREE.DoubleSide,
    });

    // const m6 = new THREE.MeshPhongMaterial( { map: tex1, side: THREE.DoubleSide } );
    // const m7 = new THREE.MeshPhongMaterial( { map: tex2, side: THREE.DoubleSide } );
    // const m8 = new THREE.MeshPhongMaterial( { map: tex3, side: THREE.DoubleSide } );

    const materials = [
      m0,
      m1,
      m2,
      m3,
      m4,
      m5,
      m6,
      m7,
      m8,
      m0,
      m1,
      m2,
      m3,
      m4,
      m5,
      m6,
      m7,
      m8,
      m0,
      m1,
      m2,
      m3,
      m4,
      m5,
      m6,
      m7,
      m8,
      m0,
      m1,
      m2,
      m3,
      m4,
      m5,
      m6,
      m7,
      m8,
      m0,
      m1,
      m2,
      m3,
      m4,
      m5,
      m6,
      m7,
      m8,
      m0,
      m1,
      m2,
      m3,
      m4,
      m5,
      m6,
      m7,
      m8,
      m0,
      m1,
      m2,
      m3,
      m4,
      m5,
      m6,
      m7,
      m8,
      m0,
      m1,
      m2,
      m3,
      m4,
      m5,
      m6,
      m7,
      m8,
      m0,
      m1,
      m2,
      m3,
      m4,
      m5,
      m6,
      m7,
      m8,
    ];

    // El profile shape es el corte interno del marco. En realidad es una forma en el plano
    // ZX mirandolo desde arriba e
    const profileShape = [1,1,  1,-1,  -1,-1  ,-1,1, 1,1];

    // const profileShape2 = [-5,1,  -3,1,  -3,-1  ,-5,-1, -5,1];


    // El contour es la forma del cuadrada del cuadro
    var contour = [
	 -4, 0,
	 -4, 3,
   -3.5, 3.5,
    -3,4, 
     3,4,
    3.5,3.5,
    4,3,
    4,-3,
    3.5,-3.5,
    3,-4,
    -3,-4,
    -3.5,-3.5,
    -4,-3,
    -4,0
];

    const frame2 = ProfiledContourUV(
      profileShape,
      contour,
      materials,
      false,
      false,
      true,
    );
    frame2.position.z = 0;
    scene.add(frame2);


  
    const animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();
  });


const roundedCorners = [
  { x: -4, y: 5 },
  { x: -4.3090169943749475, y: 4.951056516295154 },
  { x: -4.587785252292473, y: 4.8090169943749475 },
  { x: -4.8090169943749475, y: 4.587785252292473 },
  { x: -4.951056516295154, y: 4.3090169943749475 },
  { x: -5, y: 4 },
  { x: 5, y: 4 },
  { x: 4.951056516295154, y: 4.3090169943749475 },
  { x: 4.8090169943749475, y: 4.587785252292473 },
  { x: 4.587785252292473, y: 4.8090169943749475 },
  { x: 4.3090169943749475, y: 4.951056516295154 },
  { x: 4, y: 5 },
  { x: 4, y: -5 },
  { x: 4.3090169943749475, y: -4.951056516295154 },
  { x: 4.587785252292473, y: -4.8090169943749475 },
  { x: 4.8090169943749475, y: -4.587785252292473 },
  { x: 4.951056516295154, y: -4.3090169943749475 },
  { x: 5, y: -4 },
  { x: -5, y: -4 },
  { x: -4.951056516295154, y: -4.3090169943749475 },
  { x: -4.8090169943749475, y: -4.587785252292473 },
  { x: -4.587785252292473, y: -4.8090169943749475 },
  { x: -4.3090169943749475, y: -4.951056516295154 },
  { x: -4, y: -5 }
];


processAndAddValues(roundedCorners, 0xf0f0ff);

    /**
     * @param {any[]} dataArray
     * @param {number} color
     */
function processAndAddValues(dataArray, color) {
    dataArray.forEach(item => {
        var dot = createDotAtPosition(item.x, item.y,2, color);
        scene.add(dot);
    });
}

const roundedCorners2 = CalculateCoordinatesInQuadrant( {x: 0, y: 0}, 1, 2);
// @ts-ignore
processAndAddValues(roundedCorners2, 0xff00ff);

</script>

<p>This is the playground page</p>

<svelte:head>
  <title>Three.js in SvelteKit</title>
</svelte:head>

<div class="w-full h-[70vh] bg-red-500" bind:this={container}></div>

<button on:click={increaseCount}>
  Click me
</button>

