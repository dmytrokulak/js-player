import * as LowPassFilter from "./filter.js";
import * as WaveshaperDistortion from "./distortion.js";
import * as Delay from "./delay.js";
import * as DynamicCompressor from "./compressor.js";
import * as Reverb from "./reverb.js";
import * as MasterVolume from "./volume.js";
import Spectrum from "./spectrum.js";
import { PLAYER, MIKE } from './../mode.js'


let spectrumIn
let spectrumOut

export const preload = () => {
    //important to set early because we set source for it
    spectrumIn = new Spectrum('Spectrum In')
}

export const setup = () => {
    //important to set in setup to catch all sound
    spectrumOut = new Spectrum('Spectrum Out');

    MasterVolume.setup();

    LowPassFilter.setup();
    WaveshaperDistortion.setup();
    Delay.setup();
    DynamicCompressor.setup();
    Reverb.setup();
}

//intended to be called from p5.js draw() to apply control values
export const apply = () => {
    LowPassFilter.apply()
    WaveshaperDistortion.apply()
    Delay.apply()
    DynamicCompressor.apply()
    Reverb.apply()
    MasterVolume.apply()
}

export const setSource = (sound, mode) => {

    spectrumIn.setSource(sound)
    //diconnects from sound file to only hear the effects
    if (mode == PLAYER) {
        sound.disconnect()
    }

    //Chaining: use output of one filter as input to another
    let filterOutput = LowPassFilter.setSource(sound)
    let distorOutput = WaveshaperDistortion.setSource(filterOutput)
    let delayOutput_ = Delay.setSource(distorOutput)
    let compreOutput = DynamicCompressor.setSource(delayOutput_)
    let reverbOutput = Reverb.setSource(compreOutput)

    //recreates FFT when source is changed
    if (spectrumOut) {
        spectrumOut.reload();
    }
}
