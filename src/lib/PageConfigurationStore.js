import { writable } from 'svelte/store';

/**
 * Store to persist various page configuration states across navigation
 * This allows maintaining UI state when navigating between different pages
 */

/**
 * Store for UIGroup slide position (Setup page)
 * @type {import('svelte/store').Writable<number>}
 */
export const uiGroupSlideStore = writable(0);

/**
 * Helper function to set the current UIGroup slide
 * @param {number} slideIndex - The slide index to set (0-2)
 */
export function setUIGroupSlide(slideIndex) {
    uiGroupSlideStore.set(slideIndex);
}

/**
 * Helper function to get the current UIGroup slide value synchronously
 * @returns {number} The current slide index
 */
export function getUIGroupSlide() {
    let currentSlide = 0;
    uiGroupSlideStore.subscribe(value => {
        currentSlide = value;
    })();
    return currentSlide;
}

// Future page configuration stores can be added here
// Example:
// export const cameraPositionStore = writable({ x: 0, y: 0, z: 0 });
// export const filterSettingsStore = writable({ brightness: 1, contrast: 1 });
