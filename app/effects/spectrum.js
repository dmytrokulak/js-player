export default function Spectrum(title) {
    let fft = new p5.FFT();
    new p5((sketch) => {
        sketch.setup = function () {
            let holder = createDiv()
                .addClass('col-4 m-2')
                .style('height', '5em')
                .parent('#effects-panel')

            createDiv(title)
                .parent(holder)

            let bounds = holder.elt.getBoundingClientRect();
            sketch
                .createCanvas(bounds.width, bounds.height * 0.8)
                .style('border', 'solid 1px #F5F5F5')
                .parent(holder)
        }
        sketch.draw = () => {
            let spectrum = fft.analyze();
            sketch.push();
            sketch.noStroke();
            sketch.rect(0, 0, sketch.width, sketch.height);
            sketch.fill(0, 123, 255);
            for (let i = 0; i < spectrum.length; i++) {
                let x = map(i, 0, spectrum.length, 0, sketch.width);
                let h = -sketch.height + map(spectrum[i], 0, 255, sketch.height, 0);
                sketch.rect(x, sketch.height, sketch.width / spectrum.length, h);
            }
            sketch.pop();
        }
    })

    this.setSource = (source) => {
        if (source) {
            fft.setInput(source)
        }
    }

    this.reload = () => {
        fft = new p5.FFT();
    }
}