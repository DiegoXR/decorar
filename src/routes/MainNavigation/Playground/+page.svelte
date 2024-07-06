<script>
  import { onMount } from "svelte";
  import * as THREE from "three";
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  import * as SQUAREFRAME from '../../../lib/FrameUtilitiesSquare.js';
  import * as THREEJsUtilities from "../../../lib/ThreeJsUtilities.js";

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


// Function to increase the count
function increaseCount() {
        flexibleNumber += 1;
        console.log("Number increased");
      }

  onMount(async () => {
    
    // SCENE
    const scene = new THREE.Scene();
    
  
    // CAMERA
    const fov = 75; // Field of view
    const aspect = window.innerWidth / window.innerHeight; // Display aspect
    const near = 0.1; // Near clipping plane
    const far = 50; // Far clipping plane
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    scene.add(camera);
    camera.position.z = 4;

    // CAMERA

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

   // RENDERER
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);


    // CAMERA CONTROLS
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 0.5;
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

    // const geometry2 = new THREE.PlaneGeometry(0.5, 1);
    // const material2 = new THREE.MeshBasicMaterial({color: 0xff0000});
    // const plane2 = new THREE.Mesh(geometry2, material2);
    // plane2.position.set(0, 0, 0.02);
    // scene.add(plane2);

    // Adding grid
    // const size = 1;
    // const divisions = 100;
    // const gridHelper = new THREE.GridHelper( size, divisions, 0x0000ff);
    // gridHelper.rotateX(Math.PI / 2);
    // gridHelper.position.set(0, 0, 0.01);   
    // scene.add( gridHelper );


    // const materials = [
    //   m0
    // ];


    ////// CUBE 
    const geometryCube = new THREE.BoxGeometry(0.3,0.3,0.3); // Parámetros por defecto para un cubo 1x1x1
    const materialCube = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Material verde básico
    scene.add(new THREE.Mesh(geometryCube, materialCube)); // Añadir el cubo a la materialCube

    // TEXTURE AND FRAME
  // var Cubeloader = new THREE.CubeTextureLoader();
  //   const frameTexture2 = Cubeloader.load([
  //           "/referenceTextures/Oak_512.png",
  //           "/referenceTextures/Oak_512.png",
  //           "/referenceTextures/Oak_512.png",
  //           "/referenceTextures/Oak_512.png",
  //           "/referenceTextures/Oak_512.png",
  //           "/referenceTextures/Oak_512.png"], // URL of the texture
  //           () => {
  //               // frameTexture2.wrapS = THREE.RepeatWrapping;
  //               // frameTexture2.wrapT = THREE.RepeatWrapping;
  //               // frameTexture2.repeat.set(4, 1);


  //               console.log("Sucessfully loaded the cube texture");

  //               let frameMaterial2 = new THREE.MeshPhysicalMaterial({
  //                   map: frameTexture2,
  //                   side: THREE.FrontSide,
  //               });

  //               let materials = [frameMaterial2]; // Ensure
  //               const innerWidth = 0.5;
  //               const innerHeight = 1;
  //               const framewidth = 0.03;
  //               const frameDepth = 0.0.3;
  //               let frame = SQUAREFRAME.CreateFrameSquare(innerWidth, innerHeight, framewidth, frameDepth, materials);

  //               // Frame goes closer to the camera so its back face touches the wall instead of being across the wall
  //               frame = THREEJsUtilities.repositionMesh(
  //                   frame,
  //                   localFrameConfiguration.FrameDepth / 2,
  //               );
  //               scene.add(frame);
  //           },
  //           undefined,
  //           (error) => {
  //               console.error(
  //                   `An error happened while loading the frame texture in the following path`,
  //                   error,
  //               );
  //               reject(error);
  //           },
  //       );

  //     });


// // SIMPLIFIED

  var Cubeloader = new THREE.CubeTextureLoader();
    const frameTexture = Cubeloader.load([
            "/referenceTextures/Oak_512.png",
            "/referenceTextures/Oak_512.png",
            "/referenceTextures/Oak_512.png",
            "/referenceTextures/Oak_512.png",
            "/referenceTextures/Oak_512.png",
            "/referenceTextures/Oak_512.png"], // URL of the texture


// var textureLoader = new THREE.TextureLoader();
// const frameTexture = textureLoader.load(
//             "/referenceTextures/Oak_512.png", // URL of the texture

            () => {
                frameTexture.wrapS = THREE.RepeatWrapping;
                frameTexture.wrapT = THREE.RepeatWrapping;
                frameTexture.repeat.set(10, 10);

                let frameMaterial = new THREE.MeshPhysicalMaterial({
                    map: frameTexture,
                    side: THREE.FrontSide,
                });

                // let frameMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});

                let materials = [frameMaterial]; // Ensure

                console.log("hey");
                // REAL FRAME    
                const innerWidth = 0.5;
                const innerHeight = 1;
                const framewidth = 0.03;
                const frameDepth = 0.03;
                // @ts-ignore
                let frame4 = SQUAREFRAME.CreateFrameSquare(innerWidth, innerHeight, framewidth, frameDepth, materials)

                // Frame goes closer to the camera so its back face touches the wall instead of being across the wall
                // frame4 = THREEJsUtilities.repositionMesh(
                //     frame4,
                //     frameDepth.FrameDepth / 2,
                // );
                scene.add(frame4);
            },
            undefined,
            (error) => {
                console.error(
                    `An error happened while loading the frame texture in the following path`,
                    error,
                );
            },
        );
    

      
    //////////////////

  const animate = function () {

  // if (camera == undefined)
  //    return;
     
  
  // const time = performance.now();
  // const delta = (time - prevTime) / 1000;

  //   velocity.set(0, 0, 0);
  //   direction.set(0, 0, 0);

  //   if (moveForward) direction.z -= 1;
  //   if (moveBackward) direction.z += 1;
  //   if (moveLeft) direction.x -= 1;
  //   if (moveRight) direction.x += 1;
  //   if (moveUp) direction.y += 1;
  //   if (moveDown) direction.y -=1;

    // Normalize the direction vector, so moving diagonally doesn't exceed the max speed
    //direction.normalize();

    // Apply the speed to the velocity in the direction we want to move
    //velocity.addScaledVector(direction, speed * delta);

    // Move the camera by the calculated velocity
    //camera.position.add(velocity);

      requestAnimationFrame(animate);
      //controls.update();
      renderer.render(scene, camera);

      //prevTime = time;
    };

    //let prevTime = performance.now();

    animate();


    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Optional: Tell any controls to update (only if you are using something like OrbitControls)
    if (controls) {
        controls.update();
    }

    // document.addEventListener('keydown', onKeyDown);
    // document.addEventListener('keyup', onKeyUp);
}

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
    
});
</script>

<p>This is the playground page</p>

<svelte:head>
  <title>Three.js in SvelteKit</title>
</svelte:head>

<div class="w-full h-[70vh] bg-red-400" bind:this={container}></div>

<button on:click={increaseCount}> Click me </button>

<!-- <DropdownInitializable bind:selectedOption={selectedInnerSize} availableSizes={options} defaultSize={defaultOption}/>  -->
