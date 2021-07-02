import * as PlaybackControls from "./app/playback.js";
import Playlist from "./app/playlist.js";
import * as WaveformCanvas from "./app/waveform.js";
import Player from "./app/player.js";
import Recorder from "./app/recorder.js";
import Mike from "./app/mike.js";
import * as Spinner from "./app/spinner.js";
import * as Effects from "./app/effects/effects.js"
import { PLAYER, MIKE } from './app/mode.js'

const playerOptions = {
  onPlayStarted: PlaybackControls.setPlayButtonActiveStyle,
  onPlayEnded: PlaybackControls.setPlayButtonDefaultStyle,
  onLoadStarted: Spinner.show,
  onLoadCompleted: Spinner.hide
}

let player = {};
let playlist = {};
let recorder = {};
let mike = {}
let mode = PLAYER

//p5.js method; runs once before setup.
window.preload = function () {
  Effects.preload();
  player = new Player(null, playerOptions);
  playlist = new Playlist(changeTrack);
  //preload if any tracks available
  if (playlist.get()) {
    playlist.load(playlist.get()[0]);
  }
}

//p5.js method; runs once before draw.
window.setup = function () {
  recorder = Recorder();
  mike = Mike();
  PlaybackControls.setup({
    playSound: () => player.play(),
    loopSound: () => player.loop(),
    stopSound: () => player.stop(),
    jumpStart: () => player.jump(player.labels.START),
    jumpEnd: () => player.jump(player.labels.END),
    addTrack: playlist.add,
    toggleSoundRecording: () => recorder.toggle(),
    toggleMicrophone: switchBetweenMikeAndPlayer
  });
  WaveformCanvas.setup();
  Effects.setup()
}

//p5.js method; runs intermittently.
window.draw = function () {
  clear();
  Effects.apply(player.getSource())
  WaveformCanvas.draw(player.getWaveform(), player.getCurrentTime(), player.getDuration())
}

//A point of interaction between playback controls, playlist and player
function changeTrack(trackUri) {
  if (player.isPlaying()) {
    player.stop();
    PlaybackControls.setLoopButtonDefaultStyle();
  }
  player = new Player(trackUri, playerOptions);
  mode = PLAYER;
  Effects.setSource(player.getSource(), mode)
}

//Toggles between input from the playlist and input from microphone
function switchBetweenMikeAndPlayer() {
  if (mode == PLAYER) {
    mode = MIKE
    if (player.isPlaying()) {
      player.stop();
      PlaybackControls.setLoopButtonDefaultStyle();
    }
    mike.start()
    Effects.setSource(mike.getSource(), mode)
    return true;
  }
  else {
    mode = PLAYER
    Effects.setSource(player.getSource(), mode)
    if (player.isLooping()) {
      PlaybackControls.setLoopButtonActiveStyle();
    }
    mike.stop()
    return false;
  }
}