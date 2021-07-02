let playPauseButton;
let stopButton;
let jumpStartButton;
let jumpEndButton;
let loopButton;
let fileButton;
let recordButton;
let mikeButton;

let fileInput

//This method creates buttons, saves to global variables
// and adds buttons to the page.
export function setup(actions) {
    setupButtons(actions);
    setupFileInput(actions.addTrack);
}

function setupButtons(actions) {
    playPauseButton = setupButton({
        icon: "fas fa-play-circle",
        action: () => {
            if (actions.playSound()) {
                setPlayButtonActiveStyle();
            }
            else {
                setPlayButtonDefaultStyle();
            }
        },
    });

    stopButton = setupButton({
        icon: "fas fa-stop-circle",
        action: actions.stopSound,
    });

    jumpStartButton = setupButton({
        icon: "fas fa-chevron-circle-left",
        action: actions.jumpStart,
    });

    jumpEndButton = setupButton({
        icon: "fas fa-chevron-circle-right",
        action: actions.jumpEnd,
    });

    loopButton = setupButton({
        icon: "fas fa-undo",
        action: () => {
            if (actions.loopSound()) {
                loopButton.class("btn btn-success mx-1");
            }
            else {
                loopButton.class("btn btn-primary mx-1");
            }
        },
    });

    fileButton = setupButton({
        icon: "fas fa-folder-open",
        action: () => { document.querySelector("input[type='file']").click() }
    });

    recordButton = setupButton({
        icon: "fas fa-record-vinyl",
        action: () => {
            if (actions.toggleSoundRecording()) {
                recordButton.class("btn btn-success mx-1");
            }
            else {
                recordButton.class("btn btn-primary mx-1");
            }
        }
    });

    mikeButton = setupButton({
        icon: "fas fa-microphone",
        action: () => {
            if (actions.toggleMicrophone()) {
                mikeButton.class("btn btn-success mx-1");
            }
            else {
                mikeButton.class("btn btn-primary mx-1");
            }
        }
    });
}

//Creates a single button and adds it the page;
//most properties of buttons are similar: bootstrap styles,
//common parent on the page; varying properties -
//icon and onClick callback - are passed with options object.
function setupButton(options) {
    let button = createButton();
    button.class("btn btn-primary mx-1");
    button.html("<i class='" + options.icon + "'></i>");
    button.parent("#control-panel");
    button.mousePressed(options.action);
    return button;
}

//Sets a default style of playPauseButton: blue button with play icon.
export function setPlayButtonDefaultStyle() {
    playPauseButton.class("btn btn-primary mx-1");
    playPauseButton.html('<i class="fas fa-play-circle"></i>');
}

//Sets an active style of playPauseButton: green button with pause icon.
export function setPlayButtonActiveStyle() {
    playPauseButton.class("btn btn-success mx-1");
    playPauseButton.html('<i class="fas fa-pause-circle"></i>');
}

export function setLoopButtonDefaultStyle() {
    loopButton.class("btn btn-primary mx-1");
}

export function setLoopButtonActiveStyle() {
    loopButton.class("btn btn-success mx-1");
}


function setupFileInput(addTrack) {
    fileInput = createFileInput((file) => {
        addTrack(file.name, file.data);
    });
    //hide the actual input and use a button on playback panel
    fileInput.style('visibility', 'hidden')
}
