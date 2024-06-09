// Three Js Utiliies contains Methods related to the management of the Three.Js as well as premade three.js objects to be added to the scene
import * as THREE from "three";

export let startingGlobalProperties = {
    ImageSize: [0, 0],
    FrameIsVisible: true,
    FrameBorderWidth: 0.02,
    FrameDepth: 0.02,
}

/**
 * @param {THREE.Mesh} mesh
 * @param {THREE.Scene} scene
 */
export function removeMeshFromScene(mesh, scene) {
    if (mesh == null || scene == null) {
        console.error("Unable to remove from scene null mesh or the scene itself is null.");
        return false;
    }

    // Remove mesh from scene
    scene.remove(mesh);

    // Dispose of mesh's geometry
    if (mesh.geometry) {
        mesh.geometry.dispose();
    }

    // Dispose of mesh's material(s)
    if (Array.isArray(mesh.material)) {
        mesh.material.forEach((material) => {
            disposeMaterialAndTexture(material);
        });
    } else {
        disposeMaterialAndTexture(mesh.material);
    }

    return true
}

/**
* @param {THREE.Scene} scene
* @param {THREE.WebGLRenderer} renderer
* @param {HTMLDivElement} container
*/
export function DisposeThreeJsScene(scene, renderer, container) {
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
        while (container.firstChild)
            container.removeChild(container.firstChild);
    }
}

/**
* @param {THREE.Scene} scene
*/
export function CleanScene(scene) {
    // Dispose of resources
    
    /**
     * @type {THREE.Mesh[]}
     */
    const objectsToRemove = [];
    
    scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
            if (object.geometry) {
                object.geometry.dispose();
                console.log("An object has been disposed");
            }

            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach((material) => {
                        if (material.map) 
                            material.map.dispose();
                        material.dispose();
                        console.log("A Material has been disposed");
                    });
                } else {
                    if (object.material.map) object.material.map.dispose();
                    object.material.dispose();
                }
            }

            objectsToRemove.push(object);
        }
    });

    // Remove the objects from the scene
    objectsToRemove.forEach((object) => {
        scene.remove(object);
        console.log("Objects have been removed from the scene");
    });
}

/**
 * @param {THREE.Material} material
 */
function disposeMaterialAndTexture(material) {

    if (!material) return;

    // Dispose of textures
    // @ts-ignore
    if (material.map) {
        // @ts-ignore
        material.map.dispose();
    }

    // Finally, dispose of the material
    if (material.dispose) {
        material.dispose();
    }
}

/**
 * @param {THREE.Mesh} mesh
 * @param {number} deltaValue
 */
export function repositionMesh(mesh, deltaValue) {
    mesh.position.z += deltaValue;
    // console.log("Repositionnning at" + deltaValue);
    return mesh;
}



////// CUBE

// Crear un cubo y añadirlo a la escena
// const geometryCube = new THREE.BoxGeometry(); // Parámetros por defecto para un cubo 1x1x1
// const materialCube = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Material verde básico
// cube = new THREE.Mesh(geometryCube, materialCube); // Crear el mesh del cubo
// scene.add(cube); // Añadir el cubo a la materialCube


////// PLANE

// Create Test plane with texture
// const geometryTest = new THREE.PlaneGeometry(0.2, 0.2);
// const materialTest = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
// export const planeTest = new THREE.Mesh( geometryTest, materialTest );


///// FRAME

// Create Test frame mesh
// const innerWidth = 1;
// const innerHeight = 1;
// const framewidth = 0.09;
// const frameDepth = 0.3;
// // @ts-ignore
// frame = SQUAREFRAME.CreateFrameSquare(
//     innerWidth,
//     innerHeight,
//     framewidth,
//     frameDepth,
//     materials,
// );
// Automatically create frame
//scene.add(frame);


//         /**
//  * @param {number} width
//  * @param {number} height
//  */
// function calculateRatio(width, height) {
//     ratio = width / height;

//     if (ratio > 1)
//         imageSize[0] = ratio; // Portrait Image (Horizontal)
//     else if (ratio < 1) imageSize[1] = 1 + (1 - ratio); // Landscape Image (Vertical)
// }