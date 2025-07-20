export const narrowPasspartoutPercentage = 0.08;
export const mediumPasspartoutPercentage = 0.15;
export const widePasspartoutPercentage = 0.2;

export const PasspartoutType = {
    INNER: "Inner",
    OUTTER: "Outter",
};

export const PasspartoutCutoutSize = {
    NARROW: "Narrow",
    MEDIUM: "Medium",
    WIDE: "Wide",
};

export const FrameMaterial = {
    METALLIC: "Metallic",
    WOOD: "Wood",
};

export const FrameColor = {
    YELLOW: { name: "Oak", hex: "eed09d", hexModel: "eed09d" },
    GREEN: { name: "Green", hex: "00FF00", hexModel: "00CC00" },
    BLUE: { name: "Blue", hex: "0000FF", hexModel: "0000CC" },
};


/**
* @type {number[]}
*/
let imageScreenSpaceRatios = [0.5, 0.5, 0.7]; // Square, Portrait, Landscape

// /**
//  * @param {string} hex
//  * @param {number} percent
//  */
// export function lightenColor(hex, percent) {
//     // Convert hex to RGB
//     let r = parseInt(hex.slice(1, 3), 16);
//     let g = parseInt(hex.slice(3, 5), 16);
//     let b = parseInt(hex.slice(5, 7), 16);

//     // Increase each component by the given percentage
//     r = Math.min(255, Math.floor(r + (255 - r) * percent / 100));
//     g = Math.min(255, Math.floor(g + (255 - g) * percent / 100));
//     b = Math.min(255, Math.floor(b + (255 - b) * percent / 100));

//     // Convert back to hex
//     const newHex = "#" + 
//         r.toString(16).padStart(2, '0') + 
//         g.toString(16).padStart(2, '0') + 
//         b.toString(16).padStart(2, '0');

//     return newHex;
// }

// Example usage:
// let originalHex = "#3498db"; // Example hex color
// let lighterHex = lightenColor(originalHex, 10); // Lighten by 10%
// console.log(lighterHex); // Output the new lighter color


/**
 * @param {any} image
 * @param {{ r: number; g: number; b: number; }} tint
 * @param {HTMLCanvasElement} canvas
 */


/**
 * @param {string} imageUrl
 * @param {{ r: number; g: number; b: number; }} tint
 * @param {HTMLCanvasElement} canvas
 */
export function tintImage(imageUrl , tint, canvas){
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imageUrl;
        img.crossOrigin = "Anonymous";

        img.onload = () => {
            //const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                reject('Could not get canvas context');
                return;
            }

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                data[i] = data[i] * (tint.r / 255);     // Red
                data[i + 1] = data[i + 1] * (tint.g / 255); // Green
                data[i + 2] = data[i + 2] * (tint.b / 255); // Blue
            }

            ctx.putImageData(imageData, 0, 0);
            resolve(canvas.toDataURL());
        };

        img.onerror = (err) => {
            reject('Image could not be loaded');
        };
    });
}

/**
 * @param {number} canvasWidth 
 * @param {number} imageWidth
 * @param {number} imageHeight
 * @param {number} frameBorderWidth
 * @param {boolean} isFrameEnabled
 * @param {boolean} isPasspartoutEnabled
 * @param {string} passpartoutSizeType
 */
export function meterToPixelConversion(canvasWidth, imageWidth, imageHeight ,isFrameEnabled, frameBorderWidth, isPasspartoutEnabled, passpartoutSizeType ){
 
    let frameContribution = 0;
    let passPartoutContribution = 0;
    let meterToPixelconversionFactor;
    let totalElementWidthInMeters;
    let selectedPercentageOfCanvasOccupacy;
    

    selectedPercentageOfCanvasOccupacy = GetPercentageOfCanvasOccupacy(imageWidth/imageHeight);

    if (isFrameEnabled){
        frameContribution = 2 * frameBorderWidth;
    }

    if (isPasspartoutEnabled){       
        passPartoutContribution = CalculatePasspartoutBorders(passpartoutSizeType, imageWidth);
    }

    totalElementWidthInMeters = imageWidth + frameContribution + passPartoutContribution;

    meterToPixelconversionFactor =  (canvasWidth * selectedPercentageOfCanvasOccupacy) / totalElementWidthInMeters;

    return meterToPixelconversionFactor;

}

/**
 * @param {number} imageRatio
 */
export function GetPercentageOfCanvasOccupacy(imageRatio){
    
    if (imageRatio === 1) return imageScreenSpaceRatios[0];
    else if (imageRatio < 1) return imageScreenSpaceRatios[1];
    else if (imageRatio > 1) return imageScreenSpaceRatios[2];
    else return imageScreenSpaceRatios[0]
}

/**
 * @param {string} passpartoutSizeType
 * @param {number} imageWidth
 */
export function CalculatePasspartoutBorders(passpartoutSizeType, imageWidth){
    // Make a switch case based on the size type
    
    let selectedPasspartoutPercentage;
    
    switch(passpartoutSizeType){

        case PasspartoutCutoutSize.NARROW:                                                  
        selectedPasspartoutPercentage = narrowPasspartoutPercentage;
            break;
        case PasspartoutCutoutSize.MEDIUM:
        selectedPasspartoutPercentage = mediumPasspartoutPercentage;
            break;
        case PasspartoutCutoutSize.WIDE:
        selectedPasspartoutPercentage = widePasspartoutPercentage;
            break;
        default:
        selectedPasspartoutPercentage = mediumPasspartoutPercentage;
    }

    return 2 * ((selectedPasspartoutPercentage)/(1 - 2*(selectedPasspartoutPercentage)) * imageWidth);
}

/**
 * Converts a hex color string to an RGB object
 * @param {string} hex - Hex color string (with or without #)
 * @param {boolean} useOakDefault - If true, uses oak color as default; otherwise uses yellow
 * @returns {{ r: number, g: number, b: number }} RGB color object
 */
export function hexToRgb(hex, useOakDefault = false) {
    const defaultColor = useOakDefault 
        ? { r: 238, g: 208, b: 157 } // Oak color as fallback
        : { r: 255, g: 255, b: 0 };  // Yellow as fallback
    
    if (!hex) {
        return defaultColor;
    }
    
    // Remove the # if present
    hex = hex.replace(/^#/, '');
    
    // Ensure we have a valid 6-digit hex
    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
        return defaultColor;
    }
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return { r, g, b };
}