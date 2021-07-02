import { createKnob } from "../elements/knob.js";
import { createDryWetSlider, createOutputLevelSlider } from "../elements/smartSlider.js";

const title = 'Delay'

//UI controls
let delayTimeKnob;
let feedbackKnob;
let dryWetSlider;
let outputLevelSlider;
let radioType

//effect and initial properties
let effect = new p5.Delay()
let feedback = 0.5;
let delayTime = 0.5;
const frequency = 22050; //human hearing threshold
let type = 'default'

//source
let sound

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

    delayTimeKnob = createKnob(0, 99, delayTime * 100, 'delay time', onDelayTimeChange, 1.5, delayTimeFormat)
        .parent(knobsHolder)

    feedbackKnob = createKnob(0, 99, feedback * 100, 'feedback', onFeedBackChange, 1.5, feedbackFormat)
        .parent(knobsHolder)


    radioType = createRadio('delay-radio')
        .class('flex-box--centered')
        .style('font-size', '0.7em')
        .style('margin-top', '1em')
        .parent(mainHolder)

    radioType.option('default', '&nbspDefault&nbsp')
    radioType.selected(type)
    radioType.option('pingPong', '&nbspPing Pong&nbsp')

    let slidersHolder = createDiv()
        .addClass('flex-box--vertical')
        .parent(mainHolder);

    dryWetSlider = createDryWetSlider()
        .parent(slidersHolder);
    outputLevelSlider = createOutputLevelSlider()
        .parent(slidersHolder);
}


export const setSource = (source) => {
    sound = source;
    sound.connect(effect)
    effect.process(sound, delayTime, feedback, frequency);
    console.log(title + ': source set')
    return effect.output;
}

//Some browsers limit delay time up to 1 sec exclusive
//Try catch here is a workaround to not break further exuction
const onDelayTimeChange = (value) => {
    delayTime = delayTimeFormat(value);
    effect.process(sound, delayTime, feedback, frequency);
    console.log(title + ': delay time changed to ' + delayTime)
}

const delayTimeFormat = value => {
    return value / 100
}

const onFeedBackChange = (value) => {
    feedback = feedbackFormat(value);
    effect.process(sound, delayTime, feedback, frequency);
    console.log(title + ': feedback changed to ' + feedback)
}

const feedbackFormat = (value) => {
    return value / 100;
}


export const apply = () => {
    if (type != radioType.value()) {
        type = radioType.value()
        effect.setType(type)
        console.log(title + ': type changed to ' + type)
    }
    effect.drywet(dryWetSlider.value());
    effect.amp(outputLevelSlider.value())
}