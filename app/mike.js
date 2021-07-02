//Abstracts microphone input
export default function Mike() {
    let mic;

    setup();

    function setup() {
        mic = new p5.AudioIn();
    }

    return {
        start: () => mic.start(),
        stop: () => mic.stop(),
        getSource: () => mic
    }
}