// Global texture cache store to persist preloaded textures and tinted versions across route changes
import { writable } from 'svelte/store';
import { preloadTextures, loadImage } from './TextureLoaderUtilities.js';
import * as SetupUtilities from './SetupUtilities.js';

// Cache for preloaded base textures
/** @type {import('svelte/store').Writable<Record<string, HTMLImageElement>>} */
export const preloadedTexturesStore = writable({});

// Cache for pre-tinted textures
/** @type {import('svelte/store').Writable<Record<string, string>>} */
export const tintedTextureCacheStore = writable({});

// Cache for user-selected images
/** @type {import('svelte/store').Writable<Record<string, HTMLImageElement>>} */
export const userImageCacheStore = writable({});

// Flag to track if initialization is complete
/** @type {import('svelte/store').Writable<boolean>} */
export const texturesInitializedStore = writable(false);

// Extract unique texture URLs from FrameColor definition
const getUniqueTextureUrls = () => {
    const urls = Object.values(SetupUtilities.FrameColor).map(color => color.imageUrl);
    return [...new Set(urls)]; // Remove duplicates
};

// Pre-generate tinted textures for all frame colors
/**
 * @param {Record<string, HTMLImageElement>} preloadedTextures
 * @returns {Promise<Record<string, string>>}
 */
const preGenerateTintedTextures = async (preloadedTextures) => {
    const canvas = document.createElement('canvas');
    /** @type {Record<string, string>} */
    const tintedCache = {};
    
    for (const [colorKey, colorData] of Object.entries(SetupUtilities.FrameColor)) {
        if (colorData.hex !== "transparent") {
            const tint = SetupUtilities.hexToRgb(colorData.hex);
            const cacheKey = `${colorData.imageUrl}_${colorData.hex}`;
            
            try {
                const tintedImageUrl = await SetupUtilities.tintImage(colorData.imageUrl, tint, canvas);
                tintedCache[cacheKey] = tintedImageUrl;
            } catch (err) {
                console.error(`Failed to pre-generate tinted texture for ${colorKey}:`, err);
            }
        }
    }
    
    return tintedCache;
};

// Initialize texture caches (call this once globally)
export const initializeTextureCaches = async () => {
    let isInitialized = false;
    
    // Check if already initialized
    texturesInitializedStore.subscribe(value => {
        isInitialized = value;
    })();
    
    if (isInitialized) {
        return; // Already initialized
    }
    
    try {
        console.log('Initializing global texture caches...');
        
        // Preload all unique textures
        const uniqueTextureUrls = getUniqueTextureUrls();
        const preloadedTextures = await preloadTextures(uniqueTextureUrls);
        preloadedTexturesStore.set(preloadedTextures);
        
        // Pre-generate all tinted textures
        const tintedCache = await preGenerateTintedTextures(preloadedTextures);
        tintedTextureCacheStore.set(tintedCache);
        
        // Mark as initialized
        texturesInitializedStore.set(true);
        
        console.log('Global texture caches initialized successfully');
    } catch (error) {
        console.error('Failed to initialize texture caches:', error);
    }
};

// Preload and cache a user image
/**
 * @param {string} imageUrl
 * @returns {Promise<HTMLImageElement>}
 */
export const preloadUserImage = async (imageUrl) => {
    // Check if already cached
    /** @type {Record<string, HTMLImageElement>} */
    let userCache = {};
    userImageCacheStore.subscribe(value => {
        userCache = value;
    })();
    
    if (userCache[imageUrl]) {
        return userCache[imageUrl];
    }
    
    try {
        const img = await loadImage(imageUrl);
        
        // Update cache
        userImageCacheStore.update(cache => ({
            ...cache,
            [imageUrl]: img
        }));
        
        return img;
    } catch (error) {
        console.error(`Failed to preload user image ${imageUrl}:`, error);
        throw error;
    }
};

// Get user image from cache
/**
 * @param {string} imageUrl
 * @returns {HTMLImageElement | null}
 */
export const getUserImageFromCache = (imageUrl) => {
    /** @type {Record<string, HTMLImageElement>} */
    let userCache = {};
    userImageCacheStore.subscribe(value => {
        userCache = value;
    })();
    
    return userCache[imageUrl] || null;
};

// Get tinted texture from cache
/**
 * @param {string} imageUrl
 * @param {string} hexColor
 * @returns {string}
 */
export const getTintedTexture = (imageUrl, hexColor) => {
    /** @type {Record<string, string>} */
    let tintedCache = {};
    tintedTextureCacheStore.subscribe(value => {
        tintedCache = value;
    })();
    
    const cacheKey = `${imageUrl}_${hexColor}`;
    return tintedCache[cacheKey] || imageUrl; // Fallback to original if not found
};
