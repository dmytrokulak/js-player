import { createKnob } from "../elements/knob.js";
import { createDryWetSlider, createOutputLevelSlider } from "../elements/smartSlider.js";

const title = 'Reverb'

//UI controls
let durationKnob;
let decayRateKnob;
let dryWetSlider;
let outputLevelSlider;

//effect and initial properties
let effect = new p5.Reverb()
let decayRate = 2;
let duration = 3;

export const setup = () => {
    let mainHolder = createDiv()
        .addClass('col-2 m-1')
        .style('border', 'solid 1px #F5F5F5')
        .parent('#effects-panel')

    createDiv(title)
        .addClass('text-center')
        .parent(mainHolder)

    let knobsHolder = createDiv()
        .addClass('flex-box--centered')
        .parent(mainHolder);

    durationKnob = createKnob(0, 10, duration, 'reverb duration', onDurationChange)
        .parent(knobsHolder)

    decayRateKnob = createKnob(0, 10, decayRate, 'decay rate', onDecayRateChange)
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
    effect.set(duration, decayRate);
    console.log(title + ': source set')
    return effect.output;
}

const onDurationChange = (value) => {
    effect.set(value, decayRate);
    duration = value;
    console.log(title + ': duration changed to ' + value)
}

const onDecayRateChange = (value) => {
    effect.set(duration, value);
    decayRate = value;
    console.log(title + ': decay rate changed to ' + value)
}


export const apply = () => {
    effect.drywet(dryWetSlider.value());
    effect.amp(outputLevelSlider.value())
}