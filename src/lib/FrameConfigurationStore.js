// This should be the final version
import { writable } from 'svelte/store';
import * as SceneConstants from  "../lib/SceneConstants.js"; 
import * as SetupUtilities from "../lib/SetupUtilities.js"

const FrameConfiguration = {
    ImageSrc: "",
    ImageSize:[0, 0],
    FrameIsVisible: true,
    FrameBorderWidth : 0.02,
    FrameDepth :0, 
    availableSizes: [
        [0, 0]
    ],
    PasspartoutIsVisible: false,
    PasspartoutType: SetupUtilities.PasspartoutType.OUTTER, 
    PasspartoutCutoutSize : SetupUtilities.PasspartoutCutoutSize.MEDIUM,
    FrameMaterial: SetupUtilities.FrameMaterial.WOOD,
    FrameColor: SetupUtilities.FrameColor.YELLOW  
}

export const frameConfigurationStore = writable(FrameConfiguration);