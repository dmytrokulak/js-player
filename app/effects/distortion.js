import { createKnob } from "../elements/knob.js";
import { createDryWetSlider, createOutputLevelSlider } from "../elements/smartSlider.js";

const title = 'Waveshaper distortion'

//UI controls
let distortionAmountKnob;
let oversampleKnob;
let dryWetSlider;
let outputLevelSlider;

//effect and initial properties
let effect = new p5.Distortion()
let amount = 0.25;
let oversample = 'none';


export const setup = () => {
    let mainHolder = createDiv()
        .addClass('col-2 m-1')
        .style('border', 'solid 1px #F5F5F5')
        .parent('#effects-panel')

    createDiv(title)
        .addClass('text-center')
        .style('font-size', '0.99em')
        .parent(mainHolder)

    let knobsHolder = createDiv()
        .addClass('flex-box--centered')
        .parent(mainHolder);

    distortionAmountKnob = createKnob(0, 100, amount * 100, 'distortion amount', onAmountChange, 1, amountFormat)
        .parent(knobsHolder)

    oversampleKnob = createKnob(0, 2, 0, 'oversample', onOversampleChange, 1, overSampleFormat)
        .parent(knobsHolder)

    let slidersHolder = createDiv()
        .addClass('flex-box--vertical')
        .parent(mainHolder);

    dryWetSlider = createDryWetSlider()
        .parent(slidersHolder);
    outputLevelSlider = createOutputLevelSlider()
        .parent(slidersHolder);
}

export const setSource = (source) => {
    source.connect(effect)
    effect.set(amount, oversample);
    console.log(title + ': source set')
    return effect.output;
}

const onAmountChange = (value) => {
    amount = amountFormat(value);
    effect.set(amount, oversample);
    console.log(title + ': amount changed to ' + amount)
}

const onOversampleChange = (value) => {
    oversample = overSampleFormat(value);
    effect.set(amount, oversample);
    console.log(title + ': oversample changed to ' + oversample)
}

const amountFormat = (value) => {
    return value / 100
}

const overSampleFormat = (value) => {
    switch (value) {
        case 0:
            return 'none'
        case 1:
            return '2x'
        case 2:
            return '4x'
        default:
            console.error('Wrong oversample format ' + value)
            break;
    }
}

export const apply = () => {
    effect.drywet(dryWetSlider.value());
    effect.amp(outputLevelSlider.value())
}