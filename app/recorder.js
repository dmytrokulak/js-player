//Abstracts sound recorder
export default function Recorder() {
    let sound;
    let rec;
    let isOn;

    setup();

    function setup() {
        rec = new p5.SoundRecorder();
        sound = new p5.SoundFile();
    }

    function start() {
        rec.record(sound, 300, save);
        isOn = true;
    }

    function stop() {
        rec.stop();
    }

    function save() {
        saveSound(sound, getNewFileName());
        isOn = false;
    }

    function getNewFileName() {
        return 'Recording_' + new Date().toISOString().replace(':', '-').replace('.', '-') + '.wav'
    }

    function toggle() {
        if (isOn) {
            stop();
            return false;
        }
        else {
            start();
            return true;
        }
    }

    return {
        start: start,
        stop: stop,
        isOn: () => !!isOn,
        toggle: toggle
    }
}