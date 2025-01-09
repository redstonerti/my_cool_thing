let progress = 0;
let scroll_delta = 0;
let scroll_sensitivity = 0.000001;

window.addEventListener('wheel', (event) => {
    scroll_delta += event.deltaY * scroll_sensitivity;
    event.preventDefault();
}, { passive: false });

let introCards = document.getElementsByClassName('intro_card');
console.log(introCards);

let lastTime = 0;
function update(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    progress = Math.min(Math.max(progress + deltaTime * scroll_delta, 0), 1);
    scroll_delta = scroll_delta - (scroll_delta / 200) * deltaTime;
    let progress_bar = document.getElementById("progress_bar");
    progress_bar.style.width = `${(100 * progress)}vw`;
    let title = document.getElementById("title");
    title.innerText = interpolateString("ΦΡΟΝΤΙΣΗΡΙΑ ΚΟΡΥΦΗ", get_progress_segment(0, 0.2));
    title.style.fontSize = `${500 - (get_progress_segment(0.1, 0.3)) * 100}%`;
    let title_div = document.getElementById("title_div");
    title_div.style.top = `${(50 - (get_progress_segment(0.1, 0.3)) * 30)}%`;
    let title_icon = document.getElementById("title_icon");
    title_icon.style.bottom = `${75 - (get_progress_segment(0.2, 0.3)) * 15}px`;
    title_icon.style.left = `${15 - (get_progress_segment(0.2, 0.3)) * 15} px`;
    //`inset(0 ${get_progress_segment(0.3, 1, true) * 100}% 0 0)`
    for (let i = 1; i <= introCards.length; i++) {
        let pieces = 0.7 / introCards.length;
        introCards[i - 1].style.clipPath = `inset(0 ${get_progress_segment(0.3 + (i - 1) * pieces, 0.3 + (i) * pieces, true) * 100}% 0 0)`;
    }
    if (progress != 1) {
        requestAnimationFrame(update);
    }
    else {
        end_animation();
    }

}
requestAnimationFrame(update);
function get_progress_segment(start, end, flipped) {
    let range = end - start;
    let percentage = Math.max(0, Math.min((progress - start) / range, 1));
    if (flipped) {
        percentage = 1 - percentage;
    }
    return percentage;
}
function interpolateString(inputString, ratio) {
    ratio = Math.max(Math.min(ratio, 1), 0);
    const length = Math.floor(inputString.length * ratio);
    return inputString.substring(0, length);
}
function end_animation() {
    let progress_bar = document.getElementById("progress_bar");
    progress_bar.style.transitionDuration = `500ms`;
    progress_bar.style.height = 0;
    let home_background = document.getElementById("home_background");
    home_background.style.backgroundColor = `#f6f3f4`;
    let title_icon = document.getElementById("title_icon");
    title_icon.style.transitionDuration = `500ms`;
    title_icon.style.border = `solid #EDF2F9 0px`;
    title_icon.style.borderRadius = `10px`;
    title_icon.style.transitionDuration = `500ms`;
    let title = document.getElementById("title");
    title.style.transitionDuration = `500ms`;
    title.style.color = `#0485d6`;
    title.style.textShadow = `00px 0px 30px #f6f3f4`;
    for (let i = 0; i < introCards.length; i++) {
        introCards[i].style.transitionDuration = `500ms`;
        introCards[i].style.backgroundColor = `#007ac9`;
        introCards[i].style.color = `#ffffff`;
    }
    let introCardShadows = document.getElementsByClassName('intro_card_shadow');
    for (let i = 0; i < introCardShadows.length; i++) {
        introCardShadows[i].style.transitionDuration = `500ms`;
        introCardShadows[i].style.filter = `drop-shadow(10px 10px 10px rgba(0, 0, 0, 1))`;
    }
    add_navbar();
    add_footer();
}

function add_navbar() {
    let iframe = document.createElement('iframe');
    iframe.src = 'pages/navbar.html';
    iframe.id = 'navbar_iframe';
    iframe.style.height = 0;
    document.body.insertAdjacentElement('afterbegin', iframe);
}
function add_footer() {
    let iframe = document.createElement('iframe');
    iframe.src = 'pages/footer.html';
    iframe.id = 'footer_iframe';
    iframe.className = "footer";
    iframe.style.height = 0;
    iframe.style.marginTop = 0;
    document.body.insertAdjacentElement('beforeend', iframe);
}