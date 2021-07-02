//Encasupates common operations with a sound file
export default function Player(url, options) {

    // private members
    let soundFile = {};
    let soundFileDuration = 0;
    let soundLooping = false;
    let soundPlaying = options.isPlaying;
    let waveform = {};
    let onEndedCallback = options.onPlayEnded;
    let onStartedCallback = options.onPlayStarted;
    let onLoadStarted = options.onLoadStarted;
    let onLoadCompleted = options.onLoadCompleted;

    const load = (url) => {
        onLoadStarted()
        soundFile = loadSound(url, () => {
            if (soundPlaying) {
                soundFile.play();
                onStartedCallback();
            }
            soundFileDuration = soundFile.duration();
            soundFile.onended(onEnded);
            soundLooping = soundFile.isLooping();
            waveform = soundFile.getPeaks(500);
            onLoadCompleted()

        });
    }

    const onEnded = (e) => {
        let trueEnd =
            !e._playing ||
            !e._prevUpdateTime ||
            Math.floor(e._prevUpdateTime) >= Math.floor(e.buffer.duration - 1);
        if (trueEnd) {
            onEndedCallback();
        }
    }

    //runs at construction
    if (url) {
        load(url)
    }

    //public members
    this.play = () => {
        if (soundFile.isPlaying()) {
            soundFile.pause();
            soundPlaying = false;
        } else {
            soundFile.play();
            soundPlaying = true;
        }
        return soundPlaying;
    }

    this.loop = () => {
        if (soundLooping) {
            soundLooping = false;
            soundFile.setLoop(false);
        } else {
            soundLooping = true;
            soundFile.setLoop(true);
        }
        return soundLooping;
    }

    this.stop = () => {
        soundFile.stop();
        soundPlaying = false;
    }

    this.jump = (label) => {
        if (label === this.labels.START) {
            soundFile.jump(0)
        }
        else if (label == this.labels.END) {
            // jump almost to the end to hear fading effect and give user some feedback
            soundFile.jump(soundFileDuration * 0.99)
        }
        else {
            console.error('Cannot jump to label ' + label);
        }
    }

    this.getSource = () => soundFile;

    this.getDuration = () => soundFileDuration;

    this.isLooping = () => soundLooping;

    this.isPlaying = () => soundPlaying;

    this.getWaveform = () => waveform;

    this.getCurrentTime = () => {
        if (soundFile) {
            return soundFile.currentTime()
        }
        return 0;
    }

    this.labels = {
        START: 'START',
        END: "END"
    }
}
