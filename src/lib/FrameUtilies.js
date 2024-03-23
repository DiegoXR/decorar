import * as THREE from "three";

/**
 * @param {string | any[]} profileShape
 * @param {any[]} contour
 * @param {any[]} materials
 * @param {boolean | undefined} matPerSquare
 * @param {boolean | undefined} contourClosed
 * @param {boolean | undefined} openEnded
 */
export function ProfiledContourUV( profileShape, contour, materials, matPerSquare, contourClosed, openEnded ) {
	
	// creates group of frame strips, non indexed BufferGeometry	
	
	const len = ( /** @type {number} */ x, /** @type {number} */ y, /** @type {number} */ z ) => Math.sqrt( x * x + y * y + z * z );
	const dot = (/** @type {number} */ x1, /** @type {number} */ y1, /** @type {number} */ z1, /** @type {number} */ x2, /** @type {number} */ y2, /** @type {number} */ z2) => ( x1 * x2 + y1 * y2 + z1 * z2 );
	
	matPerSquare = matPerSquare!== undefined ? matPerSquare : false;
	contourClosed = contourClosed !== undefined ? contourClosed : true;
	openEnded = openEnded  !== undefined ? ( contourClosed === true ? true : openEnded ) : true;
	
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
	
	if(  !openEnded ) { // for two ends
		
		frmpos.push( [], [] ); // for two ends
		frmuvs.push( [], []  );
		
	}
	
	let gFrame = []; // geometries of frame strips
	let frame = [];  // meshes of frame strips
	
	const fGroup = new THREE.Group( );
	
	let i1, i2, i3, i6, j1, j2;
	let xc0, yc0, xc1, yc1, xc2, yc2, xSh, xDiv;
	let dx, dy, dx0, dy0, dx2, dy2;
	let e0x, e0y,e0Length, e2x, e2y, e2Length, ex, ey, eLength;
	let xd, phi, bend;
	let x, y, z, x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4;
	let x1L, y1L, x2L, y2L, xMin, yMin, xMax, yMax;
	let a, u1, u1a, u1b, u2, u3, u4, v1, v2, v3, d2, d3;
	const epsilon = 0.000001;
	
	xMin = Infinity;
	yMin = Infinity;
	xMax = -Infinity;
	yMax = -Infinity;

	if( !openEnded ) {
	
		for ( let j = 0; j < rs1; j ++ ) {
			
			j2 = 2 * j;
			
			if ( profileShape[ j2 ] < xMin ) xMin = profileShape[ j2 ];
			if ( profileShape[ j2 + 1 ] < yMin ) yMin = profileShape[ j2 + 1 ];
			
			if ( profileShape[ j2 ] > xMax ) xMax = profileShape[ j2 ];
			if ( profileShape[ j2 + 1 ] > yMax ) yMax = profileShape[ j2 + 1 ];
				
		}
		
	}	
 	
	for ( let j = 0; j < rs1; j ++ ) {
		
		j2 = 2 * j;		
		
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
			
			xSh = profileShape[ j2 ];
			
			// @ts-ignore
			xd = xSh / xDiv;
			
			// @ts-ignore
			dx = xd * bend * ex;
			// @ts-ignore
			dy = xd * bend * ey;
			
			x = xc1 + dx; 
			y = yc1 + dy;
			z = profileShape[ j2 + 1 ];	// ySh
			
			// @ts-ignore
			vtx[ j ].push( x, y, z );	// store vertex
			
			//dApex = xd * Math.cos( phi );
			
			if( j === 0 && i === hs && !openEnded ) { //center
				
				x1L = xc1;
				y1L = yc1;
				
			}
			
			if( j === 0 && i === 0 && !openEnded ) { //center
				
				x2L = xc1;
				y2L = yc1;
				
			}			
			
		}
		
	}
	
	for ( let j = 0; j < rs; j ++ ) {
		
		j1 = j + 1;
		
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
	
	
	if( !openEnded ) {
		
		dx = xMax - xMin;
		dy = yMax - yMin;
		
		v1 = -yMin / dy;
		u1a = -xMin / dx;
		u1b = 1 - u1a;
		
		i3 = 3 * hs;
		
		for ( let j = 0; j < rs; j ++ ) {
			
			j1 = j + 1;
			j2 = 2 * j;
			
			x1 = vtx[ j ][ 0 ];
			y1 = vtx[ j ][ 1 ];
			z1 = vtx[ j ][ 2 ];
			
			x2 = vtx[ j1 ][ 0 ];
			y2 = vtx[ j1 ][ 1 ];
			z2 = vtx[ j1 ][ 2 ];
			
			// @ts-ignore
			frmpos[ rs ].push( x2L, y2L, 0, x1, y1, z1, x2, y2, z2 );
					
			u2 = ( profileShape[ j2 ] - xMin ) / dx;
			v2 = ( profileShape[ j2 + 1 ] - yMin ) / dy;
			
			u3 = ( profileShape[ j2 + 2 ] - xMin ) / dx;
			v3 = ( profileShape[ j2 + 3 ] - yMin ) / dy;
			
			// @ts-ignore
			frmuvs[ rs ].push( u1a, v1, u2, v2, u3, v3 );
			
			x1 = vtx[ j1 ][ i3 ];
			y1 = vtx[ j1 ][ i3 + 1 ];
			z1 = vtx[ j1 ][ i3 + 2 ] ;
			
			x2 = vtx[ j ][ i3 ];
			y2 = vtx[ j ][ i3 + 1 ];
			z2 = vtx[ j ][ i3 + 2 ];
			
			// @ts-ignore
			frmpos[ rs1 ].push( x1L, y1L, 0, x1, y1, z1, x2, y2, z2 );
			
			u2 = 1 - ( profileShape[ j2 + 2 ] - xMin ) / dx;
			v2 = ( profileShape[ j2 + 3 ] - yMin ) / dy;

			u3 = 1 - ( profileShape[ j2 ] - xMin ) / dx;
			v3 = ( profileShape[ j2 + 1 ] - yMin ) / dy;
			
			// @ts-ignore
			frmuvs[ rs1 ].push( u1b, v1, u2, v2, u3, v3 );
			
		}
		
	}
	
	for ( let j = 0; j < ( openEnded ? rs : rs + 2 ); j ++ ) {
		
		gFrame[ j ] = new THREE.BufferGeometry( );
		gFrame[ j ].setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( frmpos[ j ] ), 3 ) );
		gFrame[ j ].setAttribute( 'uv', new THREE.BufferAttribute( new Float32Array( frmuvs[ j ] ), 2 ) );
		
		if ( matPerSquare ) { // MultiMaterial support (for each square)
			
			for ( let i = 0; i < hs; i ++ ) {
				
				gFrame[ j ].addGroup( i * 6, 6, j * hs + i ); 
				
			}
			
			frame[ j ] = new THREE.Mesh( gFrame[ j ], materials );
			
		} else { // material per frame strip
			
			frame[ j ] = new THREE.Mesh( gFrame[ j ], materials[ j ] );
			
		}
		
		gFrame[ j ].computeVertexNormals( );
		
		fGroup.add( frame[ j ] )
		
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


//export function CreateSquareContourCoordinates()



