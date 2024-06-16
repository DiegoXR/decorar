
/**
 * @param {string} hex
 * @param {number} percent
 */
export function lightenColor(hex, percent) {
    // Convert hex to RGB
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    // Increase each component by the given percentage
    r = Math.min(255, Math.floor(r + (255 - r) * percent / 100));
    g = Math.min(255, Math.floor(g + (255 - g) * percent / 100));
    b = Math.min(255, Math.floor(b + (255 - b) * percent / 100));

    // Convert back to hex
    const newHex = "#" + 
        r.toString(16).padStart(2, '0') + 
        g.toString(16).padStart(2, '0') + 
        b.toString(16).padStart(2, '0');

    return newHex;
}

// Example usage:
// let originalHex = "#3498db"; // Example hex color
// let lighterHex = lightenColor(originalHex, 10); // Lighten by 10%
// console.log(lighterHex); // Output the new lighter color
