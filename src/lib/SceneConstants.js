// These are values for the Three.JS Scene configuration

export const frameInnerOffset = 0.005; // 5cm
export const frameWallOffset = 0.004; // 4cm
export const frameDepthMinimalSize = 0.02 // 1cm
export const frameBorderWidthMinimalSize = 0.01 // 1cm

export let startingFrameConfiguration = {
    ImageSrc: "",
    ImageSize: [0, 0],
    FrameIsVisible: true,
    FrameBorderWidth: 0,
    FrameDepth: 0,
    availableSizes: [
        [0, 0]
    ],
}

export let startingSelectedImage = {
    src: "",
    alt: "",
    description: "",
    availableSizes: [[0, 0]],
    defaultSize: [0, 0],
}