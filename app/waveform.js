//A waveform with a playhead to show track progression 

let controlPanel;
let waveFormCanvas;

export function setup() {
    controlPanel = document.querySelector("#control-panel");
    window.waveformHolder = document.querySelector("#waveform-holder");
    createWaveFormCanvas();
}

//Draws a series of lines on waveFormCanvas; these lines correspond
//to waveform peaks of the sound file;
//also draws a rectangle which shows the current position of the playback;
//playhead depends on sound files current time and duration.
function drawWaveFormWithPlayHead(waveform, currentTime, duration) {
    //waveform
    stroke(0, 0, 0);
    for (let i = 0; i < waveform.length; i++) {
        let x = map(i, 0, waveform.length, 0, width);
        let h = map(waveform[i], -1, 1, height, 0);
        line(x, height / 2, x + 0, h);
    }
    //playhead
    let loc = map(currentTime, 0, duration, 0, width);
    stroke(0, 123, 255);
    fill(0, 0, 0, 0);
    rect(loc, 0, 5, height);
}

//Creates waveform canvas with position and dimentions
//equal to waveFormHolder element; waveFormHolder width is
//recalculated to fit controlPanel element width (the latter
//is responsive due to using Bootstrap styles)
function createWaveFormCanvas() {
    waveformHolder.style.width = controlPanel.offsetWidth;
    var bounds = waveformHolder.getBoundingClientRect();
    waveFormCanvas = createCanvas(bounds.width, bounds.height);
}

//Responsive mechanism for waveform canvas: it is repositioned
//through waveFormHolder element which in turn depends on
//controlPanel element (responsive due to Bootstrap styles)
function repositionWaveFormCanvas() {
    waveformHolder.style.width = controlPanel.offsetWidth;
    var bounds = waveformHolder.getBoundingClientRect();
    waveFormCanvas.position(bounds.left, bounds.top);
}

export function draw(waveform, currentTime, duration) {
    if (!waveform) {
        return;
    }
    repositionWaveFormCanvas();
    drawWaveFormWithPlayHead(waveform, currentTime, duration);
}
