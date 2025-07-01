import * as THREE from "three";

/**
 * Applies UV projection to a mesh based on specified projection type and parameters
 * @param {THREE.Mesh} mesh - The mesh to apply UV projection to
 * @param {string} projectionType - Type of projection ('planar', 'box', 'cylindrical', 'spherical')
 * @param {Object} options - Additional options for the projection
 * @param {string} [options.direction='front'] - Direction for planar projection ('front', 'top', 'side')
 * @param {number} [options.scale=1] - Scale factor for the UVs
 * @param {boolean} [options.center=true] - Whether to center the UVs
 * @param {boolean} [options.flipY=false] - Whether to flip the Y coordinates
 */
export function applyProjectionUVs(mesh, projectionType = 'planar', options = {}) {
  const geometry = mesh.geometry;
  
  // Set default options
  const direction = options.direction || 'front';
  const scale = options.scale || 1;
  const center = options.center !== undefined ? options.center : true;
  const flipY = options.flipY || false;
  
  // Ensure geometry has positions
  if (!geometry.attributes.position) {
    console.warn('Mesh geometry has no position attribute');
    return;
  }

  const pos = geometry.attributes.position;
  const count = pos.count;
  const uv = new Float32Array(count * 2);

  // Get geometry bounds for normalization
  const bbox = new THREE.Box3();
  
  // Extract positions to an array of Vector3 to handle any attribute type
  const positions = [];
  for (let i = 0; i < pos.count; i++) {
    positions.push(
      new THREE.Vector3(
        pos.getX(i),
        pos.getY(i),
        pos.getZ(i)
      )
    );
  }
  bbox.setFromPoints(positions);
  
  const size = new THREE.Vector3();
  bbox.getSize(size);
  const center3 = new THREE.Vector3();
  bbox.getCenter(center3);

  // Apply different projection types
  if (projectionType === 'planar') {
    // Planar projection
    
    // Calculate aspect ratio for proper scaling
    const aspectRatio = {};
    
    // Calculate aspect ratios for each projection direction
    // Invertimos la relación para corregir el estiramiento vertical
    aspectRatio.front = size.y / size.x;
    aspectRatio.side = size.y / size.z;
    aspectRatio.top = size.z / size.x;
    
    // Determine which dimension to scale based on direction
    let currentAspectRatio = aspectRatio.front; // default
    
    switch (direction) {
      case 'top':
        currentAspectRatio = aspectRatio.top;
        break;
      case 'side':
        currentAspectRatio = aspectRatio.side;
        break;
      case 'front':
      default:
        currentAspectRatio = aspectRatio.front;
        break;
    }
    
    // Process each vertex
    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      
      let u = 0, v = 0;
      
      switch (direction) {
        case 'top':
          // Y projection (like a slide from above)
          u = (x - (center ? center3.x : 0)) / (size.x / scale);
          // Apply aspect ratio correction to maintain square texels
          v = (z - (center ? center3.z : 0)) / (size.z / scale);
          // Ajustamos u para mantener la proporción correcta
          u = u * currentAspectRatio;
          break;
        case 'side':
          // X projection (from the side)
          u = (z - (center ? center3.z : 0)) / (size.z / scale);
          // Apply aspect ratio correction to maintain square texels
          v = (y - (center ? center3.y : 0)) / (size.y / scale);
          // Ajustamos u para mantener la proporción correcta
          u = u * currentAspectRatio;
          break;
        case 'front':
        default:
          // Z projection (from the front)
          u = (x - (center ? center3.x : 0)) / (size.x / scale);
          // Apply aspect ratio correction to maintain square texels
          v = (y - (center ? center3.y : 0)) / (size.y / scale);
          // Ajustamos u para mantener la proporción correcta
          u = u * currentAspectRatio;
          break;
      }
      
      // Normalize to 0-1 range
      u = (u + 1) / 2;
      v = (v + 1) / 2;
      
      if (flipY) {
        v = 1 - v;
      }
      
      uv[i * 2] = u;
      uv[i * 2 + 1] = v;
    }
  }

  // Apply the new UVs to the geometry
  geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  geometry.attributes.uv.needsUpdate = true;
  
  return mesh;
}

