import {ProfiledContourUVFM} from '../lib/FrameUtilies.js';

/**
 * @param {{ x: number; y: number; }} center
 * @param {number} radius
 * @param {number} quadrant
 */
export function CalculateCoordinatesInQuadrant(center, radius, quadrant) {
    const coordinates = [];
    let startAngle, endAngle;
    
    switch (quadrant) {
        case 1:
            startAngle = Math.PI / 2;;
            endAngle = 0;
            break;
        case 2:
            startAngle = Math.PI;
            endAngle = Math.PI / 2;
            break;
        case 3:
            startAngle = 3 * Math.PI / 2;
            endAngle = Math.PI;
            break;
        case 4:
            startAngle = 2 * Math.PI;
            endAngle = 3 * Math.PI / 2;
            break;
        default:
            console.log("Cuadrante no válido. Debe ser un valor entre 1 y 4.");
            return;
    }
    // Calcular puntos sobre el arco del círculo para el cuadrante especificado
    for (let angle = startAngle; angle >= endAngle; angle -= Math.PI / 180) {
      const x = center.x + radius * Math.cos(angle);
      const y = center.y + radius * Math.sin(angle);
      coordinates.push({x, y});
      // coordinates.push(x);
      // coordinates.push(y);
  }
    return coordinates;
  }
  
  /**
   * @param {number} width
   * @param {number} height
   * @param {number} cornerRadius
   */
  export function CreateSquareProfileCoordinates(width, height, cornerRadius)
  {
      // Calculate 4 corner coordinates
      let topLeft = { x: -width / 2, y: height / 2 };
      let topRight = { x: width / 2, y: height / 2 };
      let bottomRight = { x: width / 2, y: -height / 2 };
      let bottomLeft = { x: -width / 2, y: -height / 2 };
  
      // Calculate 4 corner centers
      let topLeftCenter = { x: topLeft.x + cornerRadius, y: topLeft.y - cornerRadius };
      let topRightCenter = { x: topRight.x - cornerRadius, y: topRight.y - cornerRadius };
      let bottomRightCenter = { x: bottomRight.x - cornerRadius, y: bottomRight.y + cornerRadius};
      let bottomLeftCenter = { x: bottomLeft.x + cornerRadius, y: bottomLeft.y + cornerRadius };
  
      // console.log(`TopLeftC, ${topLeftCenter.x} ${topLeftCenter.y}`);
      // console.log(`TopRightC,${topRightCenter.x} ${topRightCenter.y}`);
      // console.log(`BottomRightC, ${bottomRightCenter.x} ${bottomRightCenter.y}`);
      // console.log(`BottomLeftC, ${bottomLeftCenter.x} ${bottomLeftCenter.y}`);
  
      let storedCoordinates = [];
      let selectedQuadrant;
      
      for (let i = 1; i <= 4; i++) {  
        let givenCorner;
        switch (i) {
          case 1:
              givenCorner = topLeftCenter;
              selectedQuadrant = 2;
              break;
          case 2:
            givenCorner = topRightCenter;
            selectedQuadrant = 1;
              break;
          case 3:
            givenCorner = bottomRightCenter;
            selectedQuadrant = 4;
              break;
          case 4:
            givenCorner = bottomLeftCenter;
            selectedQuadrant = 3;
              break;
          default:
              console.log("Cuadrante no válido. Debe ser un valor entre 1 y 4.");
              return;
      }
        
        // @ts-ignore
        const cornerCoordinates = CalculateCoordinatesInQuadrant(givenCorner, cornerRadius, selectedQuadrant)
        // @ts-ignore
        console.log(cornerCoordinates[0]);
        // @ts-ignore
        storedCoordinates.push(...cornerCoordinates);
      }
  
      // Copy the first coordinate to the last index in order to create a loop
       storedCoordinates.push(storedCoordinates[0]);
        
      return convertCoupleCoordinatesToFlatCoordinates(storedCoordinates);
  }
  
  /**
   * @param {number} width
   * @param {number} height
   * @param {number} dividerHorizontal
   * @param {number} dividerVertical
   */
  export function CreateSquareContourCoordinatesWithIntermediatePoints(width, height, dividerHorizontal, dividerVertical) {
      
      /**
       * @type {any[]}
       */
      let storedCoordinates = [];
  
      // Calculate 4 corner coordinates
      let topLeft = { x: -width / 2, y: height / 2 };
      let topRight = { x: width / 2, y: height / 2 };
      let bottomRight = { x: width / 2, y: -height / 2 };
      let bottomLeft = { x: -width / 2, y: -height / 2 };
  
      // Function to add intermediate points between two points
      /**
       * @param {{ x: any; y: any; }} pointA
       * @param {{ x: any; y: any; }} pointB
       * @param {number} divider
       */
      function addIntermediatePoints(pointA, pointB, divider) {
          storedCoordinates.push(pointA.x, pointA.y); // Add the starting point
  
          if (divider > 1) {
              let stepX = (pointB.x - pointA.x) / divider;
              let stepY = (pointB.y - pointA.y) / divider;
  
              for (let i = 1; i < divider; i++) { // Start from 1 to add points between the corners
                  storedCoordinates.push(pointA.x + stepX * i, pointA.y + stepY * i);
              }
          }
      }
  
      // Add points for each side of the square
      addIntermediatePoints(topRight, bottomRight, dividerVertical);
      addIntermediatePoints(bottomRight, bottomLeft, dividerHorizontal);
      addIntermediatePoints(bottomLeft, topLeft, dividerVertical);
      addIntermediatePoints(topLeft, topRight, dividerHorizontal);
  
      return storedCoordinates;
  }
  
  
  /**
   * @param {any[]} coupledArray
   */
  export function convertCoupleCoordinatesToFlatCoordinates(coupledArray){
    /**
     * @type {any[]}
     */
    let storedCoordinates = [];
  
    coupledArray.forEach(element => {
      storedCoordinates.push(element.x);
      storedCoordinates.push(element.y);
    });
  
  return storedCoordinates;
  }

  /**
 * @param {number} innerWidth
 * @param {number} innerHeight
 * @param {number} frameWidth
 * @param {number} frameDepth
 * @param {any[]} materials
 */
  export function CreateFrameSquare(innerWidth, innerHeight, frameWidth, frameDepth , materials){

  //The profile shape is the internal cut of the frame. 
  // It is actually a shape in the ZX plane when viewed from above

  // Radius = 0.01
    const profileShapex = CreateSquareProfileCoordinates(frameWidth,frameDepth,0.01);

    // The contour is the path followed by the frame profile 

    const contourx = CreateSquareContourCoordinatesWithIntermediatePoints(innerWidth + frameWidth,innerHeight + frameWidth,2,2);

    // @ts-ignore
    const frame4 = ProfiledContourUVFM(profileShapex, contourx, materials, false, true);

    return frame4;

  }