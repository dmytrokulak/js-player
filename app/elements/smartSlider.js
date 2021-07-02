//sliders with labels for the most common controls 

export const createDryWetSlider = () => {
    return createSmartSlider(0, 1, 0, 0.01, 'dry/wet');
}

export const createOutputLevelSlider = () => {
    return createSmartSlider(0, 1, 10, 0.01, 'output level');
}

export const createSmartSlider = (min, max, val, step, title) => {
    return new SmartSlider(min, max, val, step, title).wrap();
}

function SmartSlider(min, max, val, step, title = null) {
    //private members
    let mainHolder;
    let subHolder;
    let slider;
    let label;
    let isSliding;

    const update = () => {
        mainHolder.value(slider.value())
        label.html(Math.ceil(slider.value() * 100) + '%')
    }

    mainHolder = createDiv()
        .addClass('flex-box--vertical');

    if (title) {
        createSpan(title)
            .parent(mainHolder)
            .addClass('text-center')
            .style('font-size', '0.7em');
    }

    subHolder = createDiv()
        .addClass('flex-box')
        .parent(mainHolder);

    slider = createSlider(min, max, val, step)
        .style('overflow', 'auto')
        .parent(subHolder)
        .mouseMoved(() => {
            if (isSliding) {
                update()
            }
        })
        .mousePressed(() => {
            isSliding = true;
        })
        .mouseReleased(() => {
            isSliding = false;
        })
        .mouseClicked(update)

    label = createSpan(val)
        .parent(subHolder);

    //runs at contruction
    update();

    //public members
    this.wrap = () => mainHolder;
}
