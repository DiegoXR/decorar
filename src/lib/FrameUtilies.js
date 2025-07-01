import * as THREE from "three";

/**
 * @param {any[]} profileShape
 * @param {any[]} contour
 * @param {boolean} matPerSquare
 * @param {boolean} contourClosed
 */
export function ProfiledContourUVFM( profileShape, contour, matPerSquare, contourClosed ) {
	
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
	/** @type {number[][]} */
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
			
			// Solo añadir las posiciones de los vértices, sin calcular UVs
			frmpos[ j ].push( x1, y1, z1, x2, y2, z2, x4, y4, z4, x2, y2, z2, x3, y3, z3, x4, y4, z4 );
			
			// Crear UVs por defecto (0,0) para todos los vértices
			// Estas UVs serán reemplazadas posteriormente por otra función
			// Cada triángulo tiene 3 vértices, cada vértice tiene 2 coordenadas UV (u,v)
			// Necesitamos 12 valores para 6 vértices (2 triángulos)
			frmuvs[ j ].push( 
				0.0, 0.0,  // v1
				0.0, 0.0,  // v2
				0.0, 0.0,  // v4
				0.0, 0.0,  // v2
				0.0, 0.0,  // v3
				0.0, 0.0   // v4
			);
			
		}
		
	}
	
	// Create geometries for each frame strip
	for ( let j = 0; j < rs; j ++ ) {
		gFrame[ j ] = new THREE.BufferGeometry( );
		gFrame[ j ].setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( frmpos[ j ] ), 3 ) );
		gFrame[ j ].setAttribute( 'uv', new THREE.BufferAttribute( new Float32Array( frmuvs[ j ] ), 2 ) );
		gFrame[ j ].computeVertexNormals();
	}
	
	// Instead of creating multiple meshes, we'll combine all geometries into one
	// Calculate total vertex count
	let totalVertexCount = 0;
	for (let j = 0; j < rs; j++) {
		totalVertexCount += gFrame[j].attributes.position.count;
	}
	
	// Create arrays for the combined geometry
	const combinedPositions = new Float32Array(totalVertexCount * 3);
	const combinedUvs = new Float32Array(totalVertexCount * 2);
	const combinedNormals = new Float32Array(totalVertexCount * 3);
	
	// Copy data from individual geometries to combined arrays
	let vertexOffset = 0;
	for (let j = 0; j < rs; j++) {
		const posAttr = gFrame[j].attributes.position;
		const uvAttr = gFrame[j].attributes.uv;
		const normalAttr = gFrame[j].attributes.normal;
		const vertexCount = posAttr.count;
		
		// Copy positions
		for (let i = 0; i < vertexCount; i++) {
			const srcIdx = i * 3;
			const destIdx = (vertexOffset + i) * 3;
			const x = posAttr.array[srcIdx];
			const y = posAttr.array[srcIdx + 1];
			const z = posAttr.array[srcIdx + 2];
			
			combinedPositions[destIdx] = x;
			combinedPositions[destIdx + 1] = y;
			combinedPositions[destIdx + 2] = z;
		}
		
		// Copy UVs
		for (let i = 0; i < vertexCount; i++) {
			const srcIdx = i * 2;
			const destIdx = (vertexOffset + i) * 2;
			const u = uvAttr.array[srcIdx];
			const v = uvAttr.array[srcIdx + 1];
			
			combinedUvs[destIdx] = u;
			combinedUvs[destIdx + 1] = v;
		}
		
		// Copy normals
		for (let i = 0; i < vertexCount; i++) {
			const srcIdx = i * 3;
			const destIdx = (vertexOffset + i) * 3;
			const nx = normalAttr.array[srcIdx];
			const ny = normalAttr.array[srcIdx + 1];
			const nz = normalAttr.array[srcIdx + 2];
			
			combinedNormals[destIdx] = nx;
			combinedNormals[destIdx + 1] = ny;
			combinedNormals[destIdx + 2] = nz;
		}
		
		vertexOffset += vertexCount;
	}
	
	// Create combined geometry
	const combinedGeometry = new THREE.BufferGeometry();
	combinedGeometry.setAttribute('position', new THREE.BufferAttribute(combinedPositions, 3));
	combinedGeometry.setAttribute('uv', new THREE.BufferAttribute(combinedUvs, 2));
	combinedGeometry.setAttribute('normal', new THREE.BufferAttribute(combinedNormals, 3));
	
	// Create a single mesh with the combined geometry
	// No material is applied here, it will be set externally
	const singleFrameMesh = new THREE.Mesh(combinedGeometry);
	
	return singleFrameMesh; // Return a single mesh instead of a group
	
}

