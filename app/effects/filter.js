import { createKnob } from "../elements/knob.js";
import { createDryWetSlider, createOutputLevelSlider } from "../elements/smartSlider.js";

const title = 'Filter'

//UI controls
let frequencyKnob;
let resonanceKnob;
let dryWetSlider;
let outputLevelSlider;
let radioType

//effect and initial properties
let effect = new p5.LowPass()
let frequency = 22050; //human hearing threshold
let resonance = 5;
let type = 'lowpass'

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

    frequencyKnob = createKnob(10, 22050, frequency, 'cutoff frequency', onFrequencyChange, 1)
        .parent(knobsHolder)

    resonanceKnob = createKnob(1, 1000000, resonance * 1000, 'resonance', onResonanceChange, 0.8, resonanceFormat)
        .parent(knobsHolder)


    radioType = createRadio('filter-radio')
        .class('flex-box--centered')
        .style('font-size', '0.7em')
        .style('margin-top', '1em')
        .parent(mainHolder)

    radioType.option('lowpass', '&nbspLowpass&nbsp')
    radioType.selected(type)
    radioType.option('highpass', '&nbspHighpass&nbsp')
    radioType.option('bandpass', '&nbspBandpass')


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
    effect.set(frequency, resonance);
    console.log(title + ': source set')
    return effect.output;
}

const onFrequencyChange = (value) => {
    frequency = value;
    effect.set(value, resonance);
    console.log(title + ': frequency changed to ' + value)
}

const onResonanceChange = (value) => {
    resonance = resonanceFormat(value);
    effect.set(frequency, resonance);
    console.log(title + ': resonance changed to ' + resonance)
}

const resonanceFormat = value => {
    return value / 1000
}


export const apply = () => {
    if (type != radioType.value()) {
        type = radioType.value()
        effect.setType(type)
        adjustKnobLabel(type);
        console.log(title + ': type changed to ' + type)
    }
    effect.drywet(dryWetSlider.value());
    effect.amp(outputLevelSlider.value())
}

const adjustKnobLabel = (type) => {
    if (type === 'bandpass') {
        select('span', resonanceKnob).html('width')
    }
    else {
        select('span', resonanceKnob).html('resonance')
    }
}