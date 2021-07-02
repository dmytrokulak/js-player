// There is no native knob control in p5.js
// here a knob by pureknob.js library is wrapped into p5.js element
export const createKnob = (min, max, val, label, onChange, textScale = 1.5, formatFunction = null) => {

    let wrapper = createDiv()
        .addClass('flex-box--vertical')
        .style('margin', '0 0.3em 0 0.3em')
        .value(val);

    let span = createSpan(label)
        .style('font-size', '0.6em')
        .style('text-align', 'center')
    span.parent(wrapper)

    let knob = pureknob.createKnob(50, 50);
    knob.setProperty('angleStart', -0.95 * Math.PI);
    knob.setProperty('angleEnd', 0.95 * Math.PI);
    knob.setProperty('colorFG', '#007bff');
    knob.setProperty('trackWidth', 0.5);
    knob.setProperty('valMin', min);
    knob.setProperty('valMax', max);
    knob.setProperty('textScale', textScale);
    if (formatFunction) {
        knob.setProperty('fnValueToString', formatFunction);
    }
    knob.setValue(val)

    wrapper.elt.appendChild(knob.node())
    knob.addListener((knob, value) => {
        if (onChange) {
            onChange(value)
        }
        wrapper.value(value)
    });

    return wrapper;
}