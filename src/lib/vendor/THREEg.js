// // THREEg.js ( rev 127 )

// import * as THREE from "three";

// /**
//  * @type {{ profileShape: string | any[]; contour: any[]; contourClosed: boolean; openEnded: boolean | undefined; profileMaterial: boolean; buildProfiledContourMMgeometry: () => void; indices: THREE.TypedArray | number[]; positions: THREE.TypedArray | number[]; setIndex: (arg0: THREE.BufferAttribute) => void; setAttribute: (arg0: string, arg1: THREE.BufferAttribute) => void; addGroup: (arg0: number, arg1: number, arg2: number) => void; computeVertexNormals: () => void; }}
//  */
// var g;

// //#################################################################################################

		
// // .............................  ProfiledContourGeometryMM  .........................................

// /**
//  * @param {any} profileShape
//  * @param {any} contour
//  * @param {boolean | undefined} contourClosed
//  * @param {undefined} openEnded
//  * @param {undefined} profileMaterial
//  * @this {any}
//  */
// function createProfiledContourMMgeometry( profileShape, contour, contourClosed, openEnded, profileMaterial ) {
// 											// the last three parameters are optional	
// 	g = this;  //  THREE.BufferGeometry() - geometry object from three.js
			
// 	g.profileShape = profileShape;
// 	g.contour = contour;

// 	g.contourClosed = contourClosed !== undefined ? contourClosed : true;
// 	g.openEnded = openEnded !== undefined ? openEnded : false;
// 	g.openEnded = contourClosed === true ? false : openEnded;
// 	g.profileMaterial = profileMaterial !== undefined ? profileMaterial : false;
		
// 	if( g.contourClosed ) g.contour.push( g.contour[ 0 ], g.contour[ 1 ] );
	
// 	g.buildProfiledContourMMgeometry = buildProfiledContourMMgeometry;
// 	g.buildProfiledContourMMgeometry();
	
// }
	
// function buildProfiledContourMMgeometry( ) {
			
// 	var hs1 = g.contour.length / 2;
// 	var rs1 = g.profileShape.length / 2;
// 	var hs = hs1 - 1; // height segments 
// 	var rs = rs1 - 1; // radius segments
	
// 	var faceCount = hs * rs * 2 + ( g.openEnded ? 0 : rs * 2 );
// 	var posCount = hs1 * rs1 + ( g.openEnded ? 0 : 2 );
	
// 	g.indices = new Uint32Array( faceCount * 3 );  // indexed BufferGeometry
// 	g.positions = new Float32Array( posCount * 3 );
	
// 	g.setIndex( new THREE.BufferAttribute( g.indices, 1 ) );
// 	g.setAttribute( 'position', new THREE.BufferAttribute( g.positions, 3 ) );
	
// 	var a, b1, c1, b2, c2;
// 	var i1, i2;
// 	var xc0, yc0, xc1, yc1, xc2, yc2, xSh, xDiv;
// 	var dx0, dy0, dx2, dy2;
// 	var e0x, e0y,e0Length, e2x, e2y, e2Length, ex, ey, eLength;
// 	var phi, bend;
// 	var x, y, z;
// 	var vIdx, posIdx;
// 	var epsilon = 0.000001;
// 	var idx = 0;
	
// 	for ( var i = 0; i < hs; i ++ ) {
		
// 		if ( g.profileMaterial ) g.addGroup( idx, rs * 6, i ); // MultiMaterial support
		
// 		i1 = i + 1;
		
// 		for ( var j = 0; j < rs; j ++ ) {
			
// 			// 2 faces / segment,  3 vertex indices
// 			a =  rs1 * i + j;
// 			c1 = rs1 * i1 + j; // left 
// 			b1 = c1 + 1;
// 			//c2 = b1;         // right
// 			b2 = a + 1;
			
// 			g.indices[ idx     ] = a; // left 
// 			g.indices[ idx + 1 ] = b1;
// 			g.indices[ idx + 2 ] = c1; 
			
// 			g.indices[ idx + 3 ] = a; // right 
// 			g.indices[ idx + 4 ] = b2,
// 			g.indices[ idx + 5 ] = b1; // = c2
			
// 			if ( !g.profileMaterial ) g.addGroup( idx, 6, j ); // MultiMaterial support
			
// 			idx += 6;
			
// 		}
		
// 	}
	
// 	if( !g.openEnded ) {
		
// 		g.addGroup( idx, rs * 3, rs ); // MultiMaterial support
		
// 		a = hs1 * rs1;
		
// 		for ( var j = 0; j < rs; j ++ ) {
			
// 			g.indices[ idx     ] = a; 
// 			g.indices[ idx + 1 ] = j + 1;
// 			g.indices[ idx + 2 ] = j;
			
// 			idx += 3;
			
// 		}
		
// 		g.addGroup( idx, rs * 3, rs + 1 ); // MultiMaterial support
		
// 		a += 1; 
		
// 		for ( var j = rs1 + 1; j > 1; j -- ) {
			
// 			g.indices[ idx     ] = a; 
// 			g.indices[ idx + 1 ] = a - j;
// 			g.indices[ idx + 2 ] = a - j + 1;
			
// 			idx += 3;
			
// 		}
		
// 	}
	
// 	for ( var i = 0; i < hs1; i ++ ) {
		
// 		i2 = 2 * i; 
		 
// 		xc1 = g.contour[ i2 ];
// 		yc1 = g.contour[ i2 + 1 ];
				
// 		if ( i === 0 ) {
			
// 			xc0 = g.contour[ ( hs - 1 ) * 2 ]; // penultimate point
// 			yc0 = g.contour[ ( hs - 1 ) * 2 + 1 ];
			
// 		} else {
					 
// 			xc0 = g.contour[ i2 - 2 ]; 	// previous point
// 			yc0 = g.contour[ i2 - 1 ];
			
// 		}
		
// 		if ( i === hs ) {
			
// 			xc2 = g.contour[ 2 ];			// second point
// 			yc2 = g.contour[ 3 ];
			
// 		} else {
			 
// 			xc2 = g.contour[ i2 + 2 ]; 	// next point
// 			yc2 = g.contour[ i2 + 3 ];
			
// 		}	
		
// 		if ( !g.contourClosed ) {
			
// 			if ( i === 0 ) {
				
// 				// direction
// 				dx2 = xc2 - xc1;
// 				dy2 = yc2 - yc1;
				
// 				// unit vector
// 				e2Length = Math.sqrt( dx2 * dx2 + dy2 * dy2 );
				
// 				e2x = dx2 / e2Length;
// 				e2y = dy2 / e2Length;
				
// 				// orthogonal
// 				ex = e2y;
// 				ey = -e2x;
				
// 			}
			
// 			if ( i === hs ) {
				
// 				// direction
				
// 				dx0 = xc1 - xc0;
// 				dy0 = yc1 - yc0;
				
// 				// unit vector
// 				e0Length = Math.sqrt( dx0 * dx0 + dy0 * dy0 );
				
// 				e0x = dx0 / e0Length;
// 				e0y = dy0 / e0Length;
				
// 				// orthogonal
// 				ex = e0y;
// 				ey = -e0x;
				
// 			}
			
// 			xDiv = 1;
// 			bend = 1;
			
// 		}
		
// 		if ( ( i > 0 && i < hs ) || g.contourClosed ) {
			
// 			// directions
			
// 			dx0 = xc0 - xc1;
// 			dy0 = yc0 - yc1;
			
// 			dx2 = xc2 - xc1;
// 			dy2 = yc2 - yc1;
			
// 			if( Math.abs( ( dy2 / dx2 ) - ( dy0 / dx0 ) ) < epsilon ) { // prevent 0
				
// 				dy0 += epsilon;
				
// 			}
			
// 			if( Math.abs( ( dx2 / dy2 ) - ( dx0 / dy0 ) ) < epsilon ) { // prevent 0
				
// 				dx0 += epsilon;
				
// 			}  
			
// 			// unit vectors
			
// 			e0Length = Math.sqrt( dx0 * dx0 + dy0 * dy0 );
			
// 			e0x = dx0 / e0Length;
// 			e0y = dy0 / e0Length;
			
// 			e2Length = Math.sqrt( dx2 * dx2 + dy2 * dy2 );
			
// 			e2x = dx2 / e2Length;
// 			e2y = dy2 / e2Length;
			
// 			// direction transformed 
			
// 			ex = e0x + e2x;
// 			ey = e0y + e2y;
			
// 			eLength = Math.sqrt( ex * ex + ey * ey );
			
// 			ex = ex / eLength;
// 			ey = ey / eLength;
			
// 			phi = Math.acos( e2x * e0x + e2y * e0y ) / 2;
			
// 			bend = Math.sign( dx0 * dy2 - dy0 * dx2 ); // z cross -> curve bending
			
// 			xDiv = Math.sin( phi );
			
// 		}
		
// 		for ( var j = 0; j < rs1; j ++ ) {
			
// 			xSh = g.profileShape[ j * 2 ];
			
// 			// @ts-ignore
// 			x = xc1 + xSh / xDiv * bend * ex; 
// 			// @ts-ignore
// 			y = yc1 + xSh / xDiv * bend * ey;
// 			z = g.profileShape[ j * 2 + 1 ];	 // ySh
			
// 			vIdx = rs1 * i + j;
			
// 			posIdx = vIdx * 3;
			
// 			g.positions[ posIdx ] = x;
// 			g.positions[ posIdx + 1 ] = y;
// 			g.positions[ posIdx + 2 ] = z;
			
// 		}
		
// 	}
	
// 	if( !g.openEnded ) {
		
// 		g.positions[ hs1 * rs1 * 3 ] = g.contour[ 0 ];
// 		g.positions[ hs1 * rs1 * 3 + 1 ] = g.contour[ 1 ];
// 		g.positions[ hs1 * rs1 * 3 + 2 ] = 0;
		
// 		g.positions[ hs1 * rs1 * 3 + 3 ] = g.contour[ hs * 2 ];
// 		g.positions[ hs1 * rs1 * 3 + 4 ] = g.contour[ hs * 2 + 1 ];
// 		g.positions[ hs1 * rs1 * 3 + 5 ] = 0;
		
// 	}
	
// 	g.computeVertexNormals( );
	
// }	

// exports.createProfiledContourMMgeometry = createProfiledContourMMgeometry;
// exports.buildProfiledContourMMgeometry = buildProfiledContourMMgeometry;

// // .............................  ProfiledContourGeometryUVs  .........................................

// // function createProfiledContourUV( profileShape, contour, materials, matPerSquare, contourClosed, openEnded ) {
// // 											// the last three parameters are optional
	
// // 	g = this;  // a THREE.Group( ), a mesh for each frame strip
	
// // 	g.profileShape = profileShape;
// // 	g.contour = contour;
	
// // 	g.matPerSquare = matPerSquare!== undefined ? matPerSquare : false;
// // 	g.contourClosed = contourClosed !== undefined ? contourClosed : true;
// // 	g.openEnded = openEnded !== undefined ? ( contourClosed === true ? true : openEnded ) : true;
	
// // 	if( g.contourClosed ) g.contour.push( g.contour[ 0 ], g.contour[ 1 ] );
	
// // 	g.buildProfiledContourUV = buildProfiledContourUV;
// // 	g.buildProfiledContourUV();
	
// // }

// // function buildProfiledContourUV( ) {
	
// // 	// creates group of frame strips, uses non indexed BufferGeometry
	
// // 	const len = ( x, y, z ) => Math.sqrt( x * x + y * y + z * z );
// // 	const dot = (x1, y1, z1, x2, y2, z2) => ( x1 * x2 + y1 * y2 + z1 * z2 );
		
// // 	const hs1 = g.contour.length / 2;
// // 	const rs1 = g.profileShape.length / 2;
// // 	const hs = hs1 - 1; // height segments
// // 	const rs = rs1 - 1; // radius segments
	
// // 	let	vtx = [];    // rs1 many vertex colums
// // 	let	frmpos = []; // hs many geometries and meshes
// // 	let	frmuvs = []; // hs many uv's' 
	
// // 	for ( let j = 0; j < rs; j ++ ) {
		
// // 		vtx.push( [] );
// // 		frmpos.push( [] );
// // 		frmuvs.push( [] );
		
// // 	}
	
// // 	vtx.push( [] ); // last colum
	
// // 	if(  !g.openEnded ) { // for two ends
		
// // 		frmpos.push( [], [] ); // for two ends
// // 		frmuvs.push( [], []  );
		
// // 	}	
	
// // 	let gFrame = []; // geometries of frame strips
// // 	let frame = [];  // meshes of frame strips
	
// // 	let i1, i2, i3, i6, j1, j2;
// // 	let xc0, yc0, xc1, yc1, xc2, yc2, xSh, xDiv;
// // 	let dx, dy, dx0, dy0, dx2, dy2;
// // 	let e0x, e0y,e0Length, e2x, e2y, e2Length, ex, ey, eLength;
// // 	let xd, phi, bend;
// // 	let x, y, z, x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4;
// // 	let x1L, y1L, x2L, y2L, xMin, yMin, xMax, yMax;
// // 	let a, u1, u1a, u1b, u2, u3, u4, v1, v2, v3, d2, d3;
// // 	const epsilon = 0.000001;

// // 	xMin = Infinity;
// // 	yMin = Infinity;
// // 	xMax = -Infinity;
// // 	yMax = -Infinity;

// // 	if( !g.openEnded ) {
	
// // 		for ( let j = 0; j < rs1; j ++ ) {
			
// // 			j2 = 2 * j;
			
// // 			if ( g.profileShape[ j2 ] < xMin ) xMin = g.profileShape[ j2 ];
// // 			if ( g.profileShape[ j2 + 1 ] < yMin ) yMin = g.profileShape[ j2 + 1 ];
			
// // 			if ( g.profileShape[ j2 ] > xMax ) xMax = g.profileShape[ j2 ];
// // 			if ( g.profileShape[ j2 + 1 ] > yMax ) yMax = g.profileShape[ j2 + 1 ];
				
// // 		}
		
// // 	}		
	
// // 	for ( let j = 0; j < rs1; j ++ ) {
		
// // 		for ( let i = 0; i < hs1; i ++ ) {
		
// // 			i2 = 2 * i; 
			
// // 			xc1 = g.contour [ i2 ];
// // 			yc1 = g.contour [ i2 + 1 ];
			
// // 			if ( i === 0 ) {
				
// // 				xc0 = g.contour [ ( hs - 1 ) * 2 ]; // penultimate point
// // 				yc0 = g.contour [ ( hs - 1 ) * 2 + 1 ];
				
// // 			} else {
				
// // 				xc0 = g.contour [ i2 - 2 ]; 	// previous point
// // 				yc0 = g.contour [ i2 - 1 ];
				
// // 			}
			
// // 			if ( i === hs ) {
				
// // 				xc2 = g.contour [ 2 ];			// second point
// // 				yc2 = g.contour [ 3 ];
				
// // 			} else {
				
// // 				xc2 = g.contour [ i2 + 2 ]; 	// next point
// // 				yc2 = g.contour [ i2 + 3 ];
				
// // 			}	
			
// // 			if ( !g.contourClosed ) {
				
// // 				if ( i === 0 ) {
					
// // 					// direction
// // 					dx2 = xc2 - xc1;
// // 					dy2 = yc2 - yc1;
					
// // 					// unit vector
// // 					e2Length = Math.sqrt( dx2 * dx2 + dy2 * dy2 );
					
// // 					e2x = dx2 / e2Length;
// // 					e2y = dy2 / e2Length;
					
// // 					// orthogonal
// // 					ex = e2y;
// // 					ey = -e2x;
					
// // 				}
				
// // 				if ( i === hs ) {
					
// // 					// direction
					
// // 					dx0 = xc1 - xc0;
// // 					dy0 = yc1 - yc0;
					
// // 					// unit vector
// // 					e0Length = Math.sqrt( dx0 * dx0 + dy0 * dy0 );
					
// // 					e0x = dx0 / e0Length;
// // 					e0y = dy0 / e0Length;
					
// // 					// orthogonal
// // 					ex = e0y;
// // 					ey = -e0x;
					
// // 				}
				
// // 				xDiv = 1;
// // 				bend = 1;
				
// // 			}
			
// // 			if ( ( i > 0 && i < hs ) || g.contourClosed ) {
				
// // 				// directions
				
// // 				dx0 = xc0 - xc1;
// // 				dy0 = yc0 - yc1;
				
// // 				dx2 = xc2 - xc1;
// // 				dy2 = yc2 - yc1;
				
// // 				if( Math.abs( ( dy2 / dx2 ) - ( dy0 / dx0 ) ) < epsilon ) { // prevent 0
					
// // 					dy0 += epsilon;
					
// // 				}
				
// // 				if( Math.abs( ( dx2 / dy2 ) - ( dx0 / dy0 ) ) < epsilon ) { // prevent 0
					
// // 					dx0 += epsilon;
					
// // 				}  
				
// // 				// unit vectors
				
// // 				e0Length = Math.sqrt( dx0 * dx0 + dy0 * dy0 );
				
// // 				e0x = dx0 / e0Length;
// // 				e0y = dy0 / e0Length;
				
// // 				e2Length = Math.sqrt( dx2 * dx2 + dy2 * dy2 );
				
// // 				e2x = dx2 / e2Length;
// // 				e2y = dy2 / e2Length;
				
// // 				// direction transformed 
				
// // 				ex = e0x + e2x;
// // 				ey = e0y + e2y;
				
// // 				eLength = Math.sqrt( ex * ex + ey * ey );
				
// // 				ex = ex / eLength;
// // 				ey = ey / eLength;
				
// // 				phi = Math.acos( e2x * e0x + e2y * e0y ) / 2;
				
// // 				bend = Math.sign( dx0 * dy2 - dy0 * dx2 ); // z cross -> curve bending
				
// // 				xDiv = Math.sin( phi );
				
// // 			}
			
// // 			xSh = g.profileShape[ j * 2 ];
			
// // 			xd = xSh / xDiv;
			
// // 			dx = xd * bend * ex;
// // 			dy = xd * bend * ey;
			
// // 			x = xc1 + dx; 
// // 			y = yc1 + dy;
// // 			z = g.profileShape[ j * 2 + 1 ];	// ySh
			
// // 			vtx[ j ].push( x, y, z );	// store vertex
			
// // 			//dApex = xd * Math.cos( phi );
			
// // 			if( j === 0 && i === hs && !g.openEnded ) { //center
				
// // 				x1L = xc1;
// // 				y1L = yc1;
				
// // 			}
			
// // 			if( j === 0 && i === 0 && !g.openEnded ) { //center
				
// // 				x2L = xc1;
// // 				y2L = yc1;
				
// // 			}			
		
// // 		}
		
// // 	}
	
// // 	for ( let j = 0; j < rs; j ++ ) {
		
// // 		j1 = j + 1;
		
// // 		for ( let i = 0; i < hs; i ++ ) {
			
// // 			i3 = 3 * i;
// // 			i6 = i3 + 3;
			
// // 			x1 = vtx[ j ][ i3 ];
// // 			y1 = vtx[ j ][ i3 + 1 ];
// // 			z1 = vtx[ j ][ i3 + 2 ] ;
			
// // 			x2 = vtx[ j1 ][ i3 ];
// // 			y2 = vtx[ j1 ][ i3 + 1 ];
// // 			z2 = vtx[ j1 ][ i3 + 2 ];
			
// // 			x3 = vtx[ j1 ][ i6 ];
// // 			y3 = vtx[ j1 ][ i6 + 1 ];
// // 			z3 = vtx[ j1 ][ i6 + 2 ];
			
// // 			x4 = vtx[ j ][ i6 ];
// // 			y4 = vtx[ j ][ i6 + 1 ];
// // 			z4 = vtx[ j ][ i6 + 2 ];
			
// // 			frmpos[ j ].push( x1, y1, z1, x2, y2, z2, x4, y4, z4, x2, y2, z2, x3, y3, z3, x4, y4, z4 );
			
// // 			a = len( x4 - x1, y4 - y1, z4 - z1 );
			
// // 			d2 = dot( x4 - x1, y4 - y1, z4 - z1, x2 - x1, y2 - y1, z2 - z1 ) / a;
// // 			d3 = dot( x1 - x4, y1 - y4, z1 - z4, x3 - x4, y3 - y4, z3 - z4, ) / a;
			
// // 			if ( d2 >= 0 && d3 >= 0 ) {
				
// // 				u1 = 0;
// // 				u2 = d2 / a;
// // 				u3 = 1 - d3 / a;
// // 				u4 = 1;
				
// // 			}
			
// // 			if ( d2 >= 0 && d3 < 0 ) {
				
// // 				u1 = 0;
// // 				u2 = d2 / ( a - d3 );
// // 				u3 = 1;
// // 				u4 = 1 + d3 / ( a - d3 ); 
				
// // 			}
			
// // 			if ( d2 < 0 && d3 < 0 ) {
				
// // 				u1 = -d2 / ( a - d2 - d3 );
// // 				u2 = 0;
// // 				u3 = 1;
// // 				u4 = 1 + d3 / ( a - d2 - d3  );
				
// // 			}
			
// // 			if ( d2 < 0 && d3 >= 0 ) {
				
// // 				u1 = -d2 / ( a - d2  );
// // 				u2 = 0;
// // 				u3 = 1 - d3 / ( a - d2  );
// // 				u4 = 1;
				
// // 			}
			
// // 			frmuvs[ j ].push( u1, 1, u2, 0, u4, 1, u2, 0, u3, 0, u4, 1 );
			
// // 		}
		
// // 	}

	
// // 	if( !g.openEnded ) {
		
// // 		dx = xMax - xMin;
// // 		dy = yMax - yMin;
		
// // 		v1 = -yMin / dy;
// // 		u1a = -xMin / dx;
// // 		u1b = 1 - u1a;
		
// // 		i3 = 3 * hs;
		
// // 		for ( let j = 0; j < rs; j ++ ) {
			
// // 			j1 = j + 1;
// // 			j2 = 2 * j;
			
// // 			x1 = vtx[ j ][ 0 ];
// // 			y1 = vtx[ j ][ 1 ];
// // 			z1 = vtx[ j ][ 2 ];
			
// // 			x2 = vtx[ j1 ][ 0 ];
// // 			y2 = vtx[ j1 ][ 1 ];
// // 			z2 = vtx[ j1 ][ 2 ];
			
// // 			frmpos[ rs ].push( x2L, y2L, 0, x1, y1, z1, x2, y2, z2 );
					
// // 			u2 = ( g.profileShape[ j2 ] - xMin ) / dx;
// // 			v2 = ( g.profileShape[ j2 + 1 ] - yMin ) / dy;
			
// // 			u3 = ( g.profileShape[ j2 + 2 ] - xMin ) / dx;
// // 			v3 = ( g.profileShape[ j2 + 3 ] - yMin ) / dy;
			
// // 			frmuvs[ rs ].push( u1a, v1, u2, v2, u3, v3 );
			
// // 			x1 = vtx[ j1 ][ i3 ];
// // 			y1 = vtx[ j1 ][ i3 + 1 ];
// // 			z1 = vtx[ j1 ][ i3 + 2 ] ;
			
// // 			x2 = vtx[ j ][ i3 ];
// // 			y2 = vtx[ j ][ i3 + 1 ];
// // 			z2 = vtx[ j ][ i3 + 2 ];
			
// // 			frmpos[ rs1 ].push( x1L, y1L, 0, x1, y1, z1, x2, y2, z2 );
			
// // 			u2 = 1 - ( g.profileShape[ j2 + 2 ] - xMin ) / dx;
// // 			v2 = ( g.profileShape[ j2 + 3 ] - yMin ) / dy;

// // 			u3 = 1 - ( g.profileShape[ j2 ] - xMin ) / dx;
// // 			v3 = ( g.profileShape[ j2 + 1 ] - yMin ) / dy;
			
// // 			frmuvs[ rs1 ].push( u1b, v1, u2, v2, u3, v3 );
			
// // 		}
		
// // 	}	
	
// // 	for ( let j = 0; j < ( g.openEnded ? rs : rs + 2 ); j ++ ) {
		
// // 		gFrame[ j ] = new THREE.BufferGeometry( );
// // 		gFrame[ j ].setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( frmpos[ j ] ), 3 ) );
// // 		gFrame[ j ].setAttribute( 'uv', new THREE.BufferAttribute( new Float32Array( frmuvs[ j ] ), 2 ) );
		
// // 		if ( g.matPerSquare ) { // MultiMaterial support (for each square)
			
// // 			for ( let i = 0; i < hs; i ++ ) {
				
// // 				gFrame[ j ].addGroup( i * 6, 6, j * hs + i ); 
				
// // 			}
			
// // 			frame[ j ] = new THREE.Mesh( gFrame[ j ], materials );
			
// // 		} else { // material per frame strip
			
// // 			frame[ j ] = new THREE.Mesh( gFrame[ j ], materials[ j ] );
			
// // 		}
		
// // 		gFrame[ j ].computeVertexNormals( );
		
// // 		g.add( frame[ j ] )
		
// // 	}
	
// // }

// // exports.createProfiledContourUV = createProfiledContourUV;
// // exports.buildProfiledContourUV = buildProfiledContourUV;





