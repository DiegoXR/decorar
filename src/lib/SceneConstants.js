// These are values for the Three.JS Scene configuration


import * as SetupUtilities from "../lib/SetupUtilities.js"

export const frameInnerOffset = 0.005; // 5cm
export const frameWallOffset = 0.004; // 4cm
export const frameDepthMinimalSize = 0.02 // 2cm
export const frameBorderWidthMinimalSize = 0.01 // 1cm
export const frameDepthOffset = 0.01; // 1cm

export let startingFrameConfiguration = {
    ImageSrc: "",
    ImageSize: [0, 0],
    FrameIsVisible: true,
    FrameBorderWidth: 0,
    FrameDepth: 0,
    availableSizes: [
        [0, 0]
    ],
    PasspartoutIsVisible: false,
    PasspartoutType: SetupUtilities.PasspartoutType.OUTTER, 
    PasspartoutCutoutSize : SetupUtilities.PasspartoutCutoutSize.MEDIUM,
    FrameMaterial: SetupUtilities.FrameMaterial.WOOD,
    FrameColor: SetupUtilities.FrameColor.HONEY
}

export let startingSelectedImage = {
    src: "",
    alt: "",
    description: "",
    availableSizes: [[0, 0]],
    defaultSize: [0, 0],
}
