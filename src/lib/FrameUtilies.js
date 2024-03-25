import * as THREE from "three";

/**
 * @param {string | any[]} profileShape
 * @param {any[]} contour
 * @param {any[]} materials
 * @param {boolean} matPerSquare
 * @param {boolean} contourClosed
 */
export function ProfiledContourUVFM( profileShape, contour, materials, matPerSquare, contourClosed ) {
	
	// creates group of frame strips, non indexed BufferGeometry
	
	const len = ( /** @type {number} */ x, /** @type {number} */ y, /** @type {number} */ z ) => Math.sqrt( x * x + y * y + z * z );
	const dot = (/** @type {number} */ x1, /** @type {number} */ y1, /** @type {number} */ z1, /** @type {number} */ x2, /** @type {number} */ y2, /** @type {number} */ z2) => ( x1 * x2 + y1 * y2 + z1 * z2 );
	
	matPerSquare = matPerSquare!== undefined ? matPerSquare : false;
	contourClosed = contourClosed !== undefined ? contourClosed : true;
	
	if( contourClosed ) contour.push( contour[ 0 ], contour[ 1 ] );
	
	const hs1 = contour.length / 2;
	const rs1 = profileShape.length / 2;
	const hs = hs1 - 1; // height segments
	const rs = rs1 - 1; // radius segments
	
	let	vtx = [];    // rs1 many vertex colums
	let	frmpos = []; // hs many geometries and meshes
	let	frmuvs = []; // hs many uv's' 
	
	for ( let j = 0; j < rs; j ++ ) {
		
		vtx.push( [] );
		frmpos.push( [] );
		frmuvs.push( [] );
		
	}
	
	vtx.push( [] ); // last colum
	
	let gFrame = []; // geometries of frame strips
	let frame = [];  // meshes of frame strips
	
	const fGroup = new THREE.Group( );
	
	let i1, i2, i3, i6, j1, j3;
	let xc0, yc0, xc1, yc1, xc2, yc2, xSh, xDiv;
	let dx, dy, dx0, dy0, dx2, dy2;
	let e0x, e0y,e0Length, e2x, e2y, e2Length, ex, ey, eLength;
	let xd, phi, bend;
	let x, y, z, x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4;
	let a, u1, u2, u3, u4, d2, d3;
	const epsilon = 0.000001;
 	
	for ( let j = 0; j < rs1; j ++ ) {
		
		for ( let i = 0; i < hs1; i ++ ) {
		
			i2 = 2 * i; 
			
			xc1 = contour[ i2 ];
			yc1 = contour[ i2 + 1 ];
			
			if ( i === 0 ) {
				
				xc0 = contour[ ( hs - 1 ) * 2 ]; // penultimate point
				yc0 = contour[ ( hs - 1 ) * 2 + 1 ];
				
			} else {
						
				xc0 = contour[ i2 - 2 ]; 	// previous point
				yc0 = contour[ i2 - 1 ];
				
			}
			
			if ( i === hs ) {
				
				xc2 = contour[ 2 ];			// second point
				yc2 = contour[ 3 ];
				
			} else {
				
				xc2 = contour[ i2 + 2 ]; 	// next point
				yc2 = contour[ i2 + 3 ];
				
			}	
			
			if ( !contourClosed ) {
				
				if ( i === 0 ) {
					
					// direction
					dx2 = xc2 - xc1;
					dy2 = yc2 - yc1;
					
					// unit vector
					e2Length = Math.sqrt( dx2 * dx2 + dy2 * dy2 );
					
					e2x = dx2 / e2Length;
					e2y = dy2 / e2Length;
					
					// orthogonal
					ex = e2y;
					ey = -e2x;
					
				}
				
				if ( i === hs ) {
					
					// direction
					
					dx0 = xc1 - xc0;
					dy0 = yc1 - yc0;
					
					// unit vector
					e0Length = Math.sqrt( dx0 * dx0 + dy0 * dy0 );
					
					e0x = dx0 / e0Length;
					e0y = dy0 / e0Length;
					
					// orthogonal
					ex = e0y;
					ey = -e0x;
					
				}
				
				xDiv = 1;
				bend = 1;
				
			}
			
			if ( ( i > 0 && i < hs ) || contourClosed ) {
				
				// directions
				
				dx0 = xc0 - xc1;
				dy0 = yc0 - yc1;
				
				dx2 = xc2 - xc1;
				dy2 = yc2 - yc1;
				
				if( Math.abs( ( dy2 / dx2 ) - ( dy0 / dx0 ) ) < epsilon ) { // prevent 0
					
					dy0 += epsilon;
					
				}
				
				if( Math.abs( ( dx2 / dy2 ) - ( dx0 / dy0 ) ) < epsilon ) { // prevent 0
					
					dx0 += epsilon;
					
				}  
				
				// unit vectors
				
				e0Length = Math.sqrt( dx0 * dx0 + dy0 * dy0 );
				
				e0x = dx0 / e0Length;
				e0y = dy0 / e0Length;
				
				e2Length = Math.sqrt( dx2 * dx2 + dy2 * dy2 );
				
				e2x = dx2 / e2Length;
				e2y = dy2 / e2Length;
				
				// direction transformed 
				
				ex = e0x + e2x;
				ey = e0y + e2y;
				
				eLength = Math.sqrt( ex * ex + ey * ey );
				
				ex = ex / eLength;
				ey = ey / eLength;
				
				phi = Math.acos( e2x * e0x + e2y * e0y ) / 2;
				
				bend = Math.sign( dx0 * dy2 - dy0 * dx2 ); // z cross -> curve bending
				
				xDiv = Math.sin( phi );
				
			}
			
			xSh = profileShape[ j * 2 ];
			
			// @ts-ignore
			xd = xSh / xDiv;		
			// @ts-ignore
			dx = xd * bend * ex;
			// @ts-ignore
			dy = xd * bend * ey;
			
			x = xc1 + dx; 
			y = yc1 + dy;
			z = profileShape[ j * 2 + 1 ];	// ySh
			
			// @ts-ignore
			vtx[ j ].push( x, y, z );	// store vertex
			
			//dApex = xd * Math.cos( phi );
		
		}
		
	}
	
	for ( let j = 0; j < rs; j ++ ) {
		
		j1 = j + 1;
		j3 = 3 * j;
		
		for ( let i = 0; i < hs; i ++ ) {
			
			i3 = 3 * i;
			i6 = i3 + 3;
			
			x1 = vtx[ j ][ i3 ];
			y1 = vtx[ j ][ i3 + 1 ];
			z1 = vtx[ j ][ i3 + 2 ] ;
			
			x2 = vtx[ j1 ][ i3 ];
			y2 = vtx[ j1 ][ i3 + 1 ];
			z2 = vtx[ j1 ][ i3 + 2 ];
			
			x3 = vtx[ j1 ][ i6 ];
			y3 = vtx[ j1 ][ i6 + 1 ];
			z3 = vtx[ j1 ][ i6 + 2 ];
			
			x4 = vtx[ j ][ i6 ];
			y4 = vtx[ j ][ i6 + 1 ];
			z4 = vtx[ j ][ i6 + 2 ];
			
			frmpos[ j ].push( x1, y1, z1, x2, y2, z2, x4, y4, z4, x2, y2, z2, x3, y3, z3, x4, y4, z4 );
			
			a = len( x4 - x1, y4 - y1, z4 - z1 );
			
			d2 = dot( x4 - x1, y4 - y1, z4 - z1, x2 - x1, y2 - y1, z2 - z1 ) / a;
			d3 = dot( x1 - x4, y1 - y4, z1 - z4, x3 - x4, y3 - y4, z3 - z4, ) / a;
			
			if ( d2 >= 0 && d3 >= 0 ) {
				
				u1 = 0;
				u2 = d2 / a;
				u3 = 1 - d3 / a;
				u4 = 1;
				
			}
			
			if ( d2 >= 0 && d3 < 0 ) {
				
				u1 = 0;
				u2 = d2 / ( a - d3 );
				u3 = 1;
				u4 = 1 + d3 / ( a - d3 ); 
				
			}
			
			if ( d2 < 0 && d3 < 0 ) {
				
				u1 = -d2 / ( a - d2 - d3 );
				u2 = 0;
				u3 = 1;
				u4 = 1 + d3 / ( a - d2 - d3  );
				
			}
			
			if ( d2 < 0 && d3 >= 0 ) {
				
				u1 = -d2 / ( a - d2  );
				u2 = 0;
				u3 = 1 - d3 / ( a - d2  );
				u4 = 1;
				
			}
			
			// @ts-ignore
			frmuvs[ j ].push( u1, 1, u2, 0, u4, 1, u2, 0, u3, 0, u4, 1 );
			
		}
		
	}
	
	for ( let j = 0; j < rs; j ++ ) {
		
		gFrame[ j ] = new THREE.BufferGeometry( );
		gFrame[ j ].setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( frmpos[ j ] ), 3 ) );
		gFrame[ j ].setAttribute( 'uv', new THREE.BufferAttribute( new Float32Array( frmuvs[ j ] ), 2 ) );
		
		if ( matPerSquare ) { // MultiMaterial support (for each square)
			
			for ( let i = 0; i < hs; i ++ ) {
				
				gFrame[ j ].addGroup( i * 6, 6, j * hs + i ); 
				
			}
			
			frame[ j ] = new THREE.Mesh( gFrame[ j ], materials );
			
		} else { // material per frame strip
			
			// frame[ j ] = new THREE.Mesh( gFrame[ j ], materials[ j ] );
      // Modified by Diego 
      frame[ j ] = new THREE.Mesh( gFrame[ j ], materials[ 0 ] );
			
		}
		
		// Assuming geometry is already created and has positions and indices set up
		// @ts-ignore
		// const indices = gFrame[ j ].getIndex().array;
		// for (let i = 0; i < indices.length; i += 3) {
		// const tmp = indices[i + 1];
		// indices[i + 1] = indices[i + 2];
		// indices[i + 2] = tmp;
		// }
		// // @ts-ignore
		// gFrame[ j ].setIndex(indices);
        //  ///


		gFrame[ j ].computeVertexNormals( );
		
		fGroup.add( frame[ j ] );
		
	}
	
	return fGroup; // group of frame strips
	
}


    /**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} color
 */
    export function createDotAtPosition(x, y, z, color) {
    // Create a geometry with a single vertex
    const geometryDot = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0)]);

    // Create a material for the dot
    const materialDot = new THREE.PointsMaterial({ color: color, size: 5 });

    // Create the dot as a Points object
    const dot = new THREE.Points(geometryDot, materialDot);

    // Set the position of the dot
    dot.position.set(x, y, z);

    // Return the dot for further manipulation or to be added to the scene outside this function
    return dot;
}

    /**
 * @param {{ x: number; y: number; }} coordinatePair
 * @param {number} z
 * @param {number} color
 */
    export function createDotAtPositionObject(coordinatePair, z, color) {
      // Create a geometry with a single vertex
      const geometryDot = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0)]);
  
      // Create a material for the dot
      const materialDot = new THREE.PointsMaterial({ color: color, size: 5 });
  
      // Create the dot as a Points object
      const dot = new THREE.Points(geometryDot, materialDot);
  
      // Set the position of the dot
      dot.position.set(coordinatePair.x, coordinatePair.y, z);
  
      // Return the dot for further manipulation or to be added to the scene outside this function
      return dot;
  }


  /**
 * @param {any} color
 * @param {number} zvalue
 * @param {number[]} coordinatesArray
 */
  export function createDotsfromCoordinatesArray(coordinatesArray, color, zvalue){

  /**
     * @type {THREE.Points<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.PointsMaterial, THREE.Object3DEventMap>[]}
     */
  let storedDots = [];
  
  // Create a geometry with a single vertex
  const geometryDot = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0)]);
    
  // Create a material for the dot
  const materialDot = new THREE.PointsMaterial({ color: color, size: 5 });

  
  for (let i = 0; i <= coordinatesArray.length -1 ; i + 2) {  

// Create the dot as a Points object
const dot = new THREE.Points(geometryDot, materialDot);

// Set the position of the dot
dot.position.set(coordinatesArray[i], coordinatesArray[i+1], zvalue);
  
  storedDots.push(dot);

  } 
  
  return storedDots;
  }

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
          startAngle = 0;
          endAngle = Math.PI / 2;
          break;
      case 2:
          startAngle = Math.PI / 2;
          endAngle = Math.PI;
          break;
      case 3:
          startAngle = Math.PI;
          endAngle = 3 * Math.PI / 2;
          break;
      case 4:
          startAngle = 3 * Math.PI / 2;
          endAngle = 2 * Math.PI;
          break;
      default:
          console.log("Cuadrante no válido. Debe ser un valor entre 1 y 4.");
          return;
  }
  // Calcular puntos sobre el arco del círculo para el cuadrante especificado
  for (let angle = startAngle; angle <= endAngle; angle += Math.PI / 180) {
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
    
    for (let i = 1; i <= 4; i++) {  
      let givenCorner;
      switch (i) {
        case 1:
            givenCorner = topRightCenter;
            break;
        case 2:
          givenCorner = topLeftCenter;
            break;
        case 3:
          givenCorner = bottomLeftCenter;
            break;
        case 4:
          givenCorner = bottomRightCenter;
            break;
        default:
            console.log("Cuadrante no válido. Debe ser un valor entre 1 y 4.");
            return;
    }
      
      // @ts-ignore
      const cornerCoordinates = CalculateCoordinatesInQuadrant(givenCorner, cornerRadius, i)
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
 */
export function CreateSquareContourCoordinates(width, height){

  let storedCoordinates = [];
  
  // Calculate 4 corner coordinates
  let topLeft = { x: -width / 2, y: height / 2 };
  let topRight = { x: width / 2, y: height / 2 };
  let bottomRight = { x: width / 2, y: -height / 2 };
  let bottomLeft = { x: -width / 2, y: -height / 2 };

  storedCoordinates.push(topLeft.x);
  storedCoordinates.push(topLeft.y);
  storedCoordinates.push(topRight.x);
  storedCoordinates.push(topRight.y);
  storedCoordinates.push(bottomRight.x);
  storedCoordinates.push(bottomRight.y);
  storedCoordinates.push(bottomLeft.x);
  storedCoordinates.push(bottomLeft.y);

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



