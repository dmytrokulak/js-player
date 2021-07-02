import { createSmartSlider } from "../elements/smartSlider.js";

let slider;
const initValue = 1;
const title = 'Master volume'

export const setup = () => {
    let holder = createDiv()
        .addClass('col-2 my-1')
        .parent('#effects-panel')

    createDiv(title)
        .addClass('text-center')
        .parent(holder)

    slider = createSmartSlider(0, 1, initValue, 0.01)
        .parent(holder)
}


export const apply = () => {
    let value = slider.value();
    let normValue = map(Math.pow(value * 100, 4), 0, Math.pow(100, 4), 0, 1);
    masterVolume(normValue);
}






