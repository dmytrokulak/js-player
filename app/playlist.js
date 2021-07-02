//Contains logic to manage audio tracks
export default function Playlist(loadTrack) {

    //Private members

    const initialTrackUri =
        "./sound/186942__lemoncreme__piano-melody.wav";

    let _loadTrack = loadTrack;
    let playlist = new Map();

    const onTrackClicked = (e) => {
        e.preventDefault();
        this.load(e.target.innerText.trim())
    }

    const resetActive = () => {
        const items = document.querySelectorAll(".list-group-item");
        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove("active");
            items[i].children[1].style.visibility = 'visible'
        }
    }

    const makeId = (input) => {
        return 'id_' + input.replace(/[^a-zA-Z\d:]/g, '');
    }

    const remove = (e) => {
        e.preventDefault();
        let key = e.target.innerText.trim();
        playlist.delete(key)
        e.target.parentElement.remove()
    }


    const _add = (name, url) => {
        let anchor = createA('#', '');
        anchor.class('list-group-item');
        anchor.style('display', 'flex')
        anchor.style('justify-content', 'space-between')
        anchor.parent('#playlist')
        anchor.mouseClicked(onTrackClicked);
        anchor.id(makeId(name))

        let span = createSpan(name)
        span.parent(anchor)

        let icon = createElement('i')
        icon.addClass('far fa-times-circle')
        icon.style('font-size', '1.5em')
        icon.parent(anchor)
        icon.mouseClicked(remove)
        icon.mouseOver(() => icon.toggleClass('far').toggleClass('fas'))
        icon.mouseOut(() => icon.toggleClass('far').toggleClass('fas'))

        playlist.set(name, url)
    }

    const _load = (key) => {
        //a hack to deal with load after remove click
        if (!key) {
            return;
        }
        resetActive();
        select('#' + makeId(key)).addClass('active')
        select('#' + makeId(key) + ' i').style('visibility', 'hidden')

        const trackUri = playlist.get(key);
        _loadTrack(trackUri)
    }

    const setupInitial = () => {
        let name = initialTrackUri.substr(initialTrackUri.lastIndexOf('/') + 1);
        _add(name, initialTrackUri)
    }

    //Runs at construction

    setupInitial();

    //Public members

    this.add = _add
    this.load = _load
    this.get = () => Array.from(playlist.keys());
}


