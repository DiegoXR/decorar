// import * as THREE from "three";
//     /**
//  * @param {number} x
//  * @param {number} y
//  * @param {number} z
//  * @param {number} color
//  */
//     export function createDotAtPosition(x, y, z, color) {
//         // Create a geometry with a single vertex
//         const geometryDot = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0)]);
    
//         // Create a material for the dot
//         const materialDot = new THREE.PointsMaterial({ color: color, size: 5 });
    
//         // Create the dot as a Points object
//         const dot = new THREE.Points(geometryDot, materialDot);
    
//         // Set the position of the dot
//         dot.position.set(x, y, z);
    
//         // Return the dot for further manipulation or to be added to the scene outside this function
//         return dot;
//     }
    
//         /**
//      * @param {{ x: number; y: number; }} coordinatePair
//      * @param {number} z
//      * @param {number} color
//      */
//         export function createDotAtPositionObject(coordinatePair, z, color) {
//           // Create a geometry with a single vertex
//           const geometryDot = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0)]);
      
//           // Create a material for the dot
//           const materialDot = new THREE.PointsMaterial({ color: color, size: 5 });
      
//           // Create the dot as a Points object
//           const dot = new THREE.Points(geometryDot, materialDot);
      
//           // Set the position of the dot
//           dot.position.set(coordinatePair.x, coordinatePair.y, z);
      
//           // Return the dot for further manipulation or to be added to the scene outside this function
//           return dot;
//       }
    
    
//       /**
//      * @param {any} color
//      * @param {number} zvalue
//      * @param {number[]} coordinatesArray
//      */
//       export function createDotsfromCoordinatesArray(coordinatesArray, color, zvalue){
    
//       /**
//          * @type {THREE.Points<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.PointsMaterial, THREE.Object3DEventMap>[]}
//          */
//       let storedDots = [];
      
//       // Create a geometry with a single vertex
//       const geometryDot = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0)]);
        
//       // Create a material for the dot
//       const materialDot = new THREE.PointsMaterial({ color: color, size: 5 });
    
      
//       for (let i = 0; i <= coordinatesArray.length -2 ; i + 2) {  
    
//     // Create the dot as a Points object
//     const dot = new THREE.Points(geometryDot, materialDot);
    
//     // Set the position of the dot
//     dot.position.set(coordinatesArray[i], coordinatesArray[i+1], zvalue);
      
//       storedDots.push(dot);
    
//       } 
      
//       return storedDots;
//       }

//       /**
//  * @param {number} width
//  * @param {number} height
//  */
// export function CreateSquareContourCoordinates(width, height){

//     let storedCoordinates = [];
    
//     // Calculate 4 corner coordinates
//     let topLeft = { x: -width / 2, y: height / 2 };
//     let topRight = { x: width / 2, y: height / 2 };
//     let bottomRight = { x: width / 2, y: -height / 2 };
//     let bottomLeft = { x: -width / 2, y: -height / 2 };
  
//     storedCoordinates.push(topLeft.x);
//     storedCoordinates.push(topLeft.y);
//     storedCoordinates.push(topRight.x);
//     storedCoordinates.push(topRight.y);
//     storedCoordinates.push(bottomRight.x);
//     storedCoordinates.push(bottomRight.y);
//     storedCoordinates.push(bottomLeft.x);
//     storedCoordinates.push(bottomLeft.y);
  
//     return storedCoordinates;
//   }

//       // let Dots = createDotsfromCoordinatesArray(contourx, 0xff0000, 5);
//     // Dots.forEach((dot) => {
//     //   scene.add(dot);
//     // });

//         // RED INDIVIDUAL DOTS
//     // var dot1 = createDotAtPosition(-4,0,2, 0xff0000);
//     // scene.add(dot1);