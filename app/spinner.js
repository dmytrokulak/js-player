//A css spinner to show at loading
export function show() {
    let spinner = select(".spinner");
    spinner.removeClass('hidden')
}

export function hide() {
    let spinner = select(".spinner");
    spinner.addClass('hidden')
}