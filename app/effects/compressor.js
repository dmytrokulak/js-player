import { createKnob } from "../elements/knob.js";
import { createDryWetSlider, createOutputLevelSlider } from "../elements/smartSlider.js";

const title = 'Dynamic compressor'

//UI controls
let attackKnob;
let kneeKnob;
let releaseKnob;
let ratioKnob;
let thresholdKnob;
let dryWetSlider;
let outputLevelSlider;

//effect and initial properties
let effect = new p5.Compressor()
let attack = 0.003;
let knee = 30;
let ratio = 12;
let release = 0.25;
let threshold = -24;

export const setup = () => {
    let mainHolder = createDiv()
        .addClass('col-2 m-1 p-1')
        .style('border', 'solid 1px #F5F5F5')
        .parent('#effects-panel')

    createDiv(title)
        .addClass('text-center')
        .parent(mainHolder)

    let knobsHolder1 = createDiv()
        .addClass('flex-box--centered')
        .parent(mainHolder);

    attackKnob = createKnob(0, 1000, attack * 1000, 'attack', onAttackChange, 1, attackFormat)
        .parent(knobsHolder1)

    kneeKnob = createKnob(0, 40, knee, 'knee', onKneeChange)
        .parent(knobsHolder1)

    releaseKnob = createKnob(0, 100, release * 100, 'release', onReleaseChange, 1, releaseFormat)
        .parent(knobsHolder1)

    let knobsHolder2 = createDiv()
        .addClass('flex-box--centered')
        .parent(mainHolder);

    ratioKnob = createKnob(1, 20, ratio, 'ratio', onRatioChange)
        .parent(knobsHolder2)

    thresholdKnob = createKnob(-100, 0, threshold, 'threshold', onThretholdChange)
        .parent(knobsHolder2)

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
    effect.set(attack, knee, ratio, threshold, release)
    console.log(title + ': source set')
    return effect.output;
}

const onAttackChange = (value) => {
    attack = attackFormat(value);
    effect.set(attack, knee, ratio, threshold, release)
    console.log(title + ': attack changed to ' + attack)
}

const attackFormat = (value) => {
    return value / 1000
}

const onKneeChange = (value) => {
    knee = value;
    effect.set(attack, knee, ratio, threshold, release)
    console.log(title + ': knee changed to ' + knee)
}

const onRatioChange = (value) => {
    ratio = value;
    effect.set(attack, knee, ratio, threshold, release)
    console.log(title + ': ratio changed to ' + ratio)
}

const onReleaseChange = value => {
    release = releaseFormat(value);
    effect.set(attack, knee, ratio, threshold, release)
    console.log(title + ': release changed to ' + release)
}
const releaseFormat = (value) => {
    return value / 100
}

const onThretholdChange = (value) => {
    threshold = value;
    effect.set(attack, knee, ratio, threshold, release)
    console.log(title + ': threshold changed to ' + threshold)
}


export const apply = () => {
    effect.drywet(dryWetSlider.value());
    effect.amp(outputLevelSlider.value())
}