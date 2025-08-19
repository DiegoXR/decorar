// This script gives the functionality to preload textures and load images that will be used for for the 2D view


/**
 * Load an image and return a promise that resolves to the loaded image
 * @param {string} url - URL of the image to load
 * @returns {Promise<HTMLImageElement>}
 */
export function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(new Error(`Failed to load image: ${url}`));
        img.src = url;
    });
}

/**
 * Preload all textures and store them in the cache
 * @param {string[]} textureUrls - Array of texture URLs to preload
 * @returns {Promise<Record<string, HTMLImageElement>>} - Cache of preloaded textures
 */
export async function preloadTextures(textureUrls) {
    /** @type {Record<string, HTMLImageElement>} */
    const preloadedTextures = {};
    
    for (const url of textureUrls) {
        try {
            preloadedTextures[url] = await loadImage(url);
            //console.log(`Preloaded texture: ${url}`);
        } catch (err) {
            console.error(`Failed to preload texture ${url}:`, err);
        }
    }
    
    return preloadedTextures;
}