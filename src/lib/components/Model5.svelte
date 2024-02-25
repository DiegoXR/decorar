<!-- Este componente usa Three js para poner un cubo rojo -->
<script>
    import { onMount, onDestroy } from "svelte";
    import * as THREE from "three";

    /**
     * @type {HTMLDivElement}
     */
    let container;
    /**
     * @type {THREE.Object3D<THREE.Object3DEventMap>}
     */
    let scene;

    /**
     * @type {THREE.Camera}
     */
    let camera;

    /**
     * @type {THREE.WebGLRenderer}
     */
    let renderer;

    import { rendererStore } from '../customizeSceneStoreV5'; // Adjust the import path as necessary
  //let renderer;

    // Subscribe to the store
    $: renderer = $rendererStore;

    onMount(() => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000,
        );
        //renderer = new THREE.WebGLRenderer();
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x808080); // El código de color hexadecimal para gris

        container.appendChild(renderer.domElement);

        // Cargador de texturas
        const textureLoader = new THREE.TextureLoader();
        const cubeTexture = textureLoader.load(
            "/referenceImages/1080_1350.jpg",
        ); // Asegúrate de reemplazar esta ruta con la ubicación real de tu imagen

        const geometry = new THREE.PlaneGeometry(1, 1);
        // const material = new THREE.MeshBasicMaterial({ map: cubeTexture, side: THREE.FrontSide});
        // const material = new THREE.MeshMatcapMaterial({ map: cubeTexture, side: THREE.FrontSide,

        const material = new THREE.MeshPhysicalMaterial({
            map: cubeTexture,
            side: THREE.FrontSide,
        });
        // const material = new THREE.MeshToonMaterial({ map: cubeTexture, side: THREE.FrontSide});

        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        // Agregar luz ambiental
        const ambientLight = new THREE.AmbientLight(0xffffff, 4); // color blanco, intensidad 0.5
        scene.add(ambientLight);

        camera.position.z = 1;

        function animate() {
            requestAnimationFrame(animate);
            // plane.rotation.x += 0.01;
            // plane.rotation.y += 0.01;
            renderer.render(scene, camera);
        }

        animate();
    });

    onDestroy(() => {
        // Stop the animation loop
        if (renderer) renderer.setAnimationLoop(null);

        // Dispose of resources

        scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                if (object.geometry) {
                    object.geometry.dispose();
                }

                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach((material) => {
                            if (material.map) material.map.dispose();
                            material.dispose();
                        });
                    } else {
                        if (object.material.map) object.material.map.dispose();
                        object.material.dispose();
                    }
                }
            }
        });

        if (renderer.domElement) {
            container.removeChild(renderer.domElement);
        }
    });
</script>

<div bind:this={container} class="w-full h-full"></div>
