let progress = false;
let scroll_delta = 0;
let scroll_sensitivity = 0.000001;

//Δες αν εχεις δειξει το animation
let no_animation = localStorage.getItem('animationPlayed');

//Uncomment για να βλέπεις το animation κάθε φορά
//no_animation = false;

//Γραψε οτι εχεις ηδη δειξει το animation
localStorage.setItem('animationPlayed', 'true');
if (no_animation)
    progress = 1;

window.addEventListener('wheel', (event) => {
    scroll_delta += event.deltaY * scroll_sensitivity;
    event.preventDefault();
}, { passive: false });

let introCards = document.getElementsByClassName('intro_card');
console.log(introCards);

let lastTime = 0;
//function που εκτελειται 60 φορες το δευτερολεπτο
function update(timestamp) {
    //Αλλαξε το progress
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    progress = Math.min(Math.max(progress + deltaTime * scroll_delta, 0), 1);
    scroll_delta = scroll_delta - (scroll_delta / 200) * deltaTime;

    //Βρες τα elements που πρεπει να αλλαχτουν
    let progress_bar = document.getElementById("progress_bar");
    let title = document.getElementById("title");
    let title_div = document.getElementById("title_div");
    let title_icon = document.getElementById("title_icon");

    //Αλλαξε τις ιδιοτητες με βαση το progress
    progress_bar.style.width = `${(100 * progress)}vw`;

    title.innerText = interpolateString("ΦΡΟΝΤΙΣΗΡΙΑ ΚΟΡΥΦΗ", get_progress_segment(0, 0.2));
    title.style.fontSize = `${4 + (get_progress_segment(0.1, 0.3))}vw`;

    title_div.style.top = `${(50 - (get_progress_segment(0.1, 0.3)) * 30)}%`;

    title_icon.style.bottom = `${(get_progress_segment(0, 0.05)) * 4}vw`;
    title_icon.style.left = `${(get_progress_segment(0.1, 0.3)) * 0.3}vw`;

    //Πηγαινε πανω απο ολες τις καρτες και αλλαξε το clip path για να φαινονται περισσοτερο
    for (let i = 1; i <= introCards.length; i++) {
        let pieces = 0.7 / introCards.length;
        introCards[i - 1].style.clipPath = `inset(0 ${get_progress_segment(0.3 + (i - 1) * pieces, 0.3 + (i) * pieces, true) * 100}% 0 0)`;
    }

    //Οταν το progress παει στο 1 τελειωνει
    if (progress != 1)
        requestAnimationFrame(update);
    else
        end_animation();
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
function interpolateString(inputString, progress) {
    return inputString.substring(0, Math.floor(inputString.length * progress));
}

//Τελος animation
function end_animation() {
    //Βρες τα elements που πρεπει να αλλαχτουν
    let progress_bar = document.getElementById("progress_bar");
    let title_icon = document.getElementById("title_icon");
    let title = document.getElementById("title");
    let home_background = document.getElementById("home_background");
    let introCardShadows = document.getElementsByClassName('intro_card_shadow');

    //Αν θες να δειξεις το animation, βαλε animation durations
    if (!no_animation) {
        home_background.style.transitionDuration = `1000ms`;
        progress_bar.style.transitionDuration = `500ms`;
        title_icon.style.transitionDuration = `500ms`;
        title.style.transitionDuration = `500ms`;
    }

    progress_bar.style.height = 0;
    progress_bar.style.marginTop = 0;

    home_background.style.backgroundColor = `#f6f3f4`;

    title_icon.style.border = `solid #EDF2F9 0px`;
    title_icon.style.borderRadius = `0.5vw`;
    title.style.color = `#0485d6`;
    title.style.textShadow = `00px 0px 30px #f6f3f4`;

    for (let i = 0; i < introCards.length; i++) {
        if (!no_animation)
            introCards[i].style.transitionDuration = `500ms`;
        introCards[i].style.backgroundColor = `#007ac9`;
        introCards[i].style.color = `#ffffff`;
    }

    for (let i = 0; i < introCardShadows.length; i++) {
        if (!no_animation)
            introCardShadows[i].style.transitionDuration = `500ms`;
        introCardShadows[i].style.filter = `drop-shadow(10px 10px 10px rgba(0, 0, 0, 1))`;
    }

    add_navbar();
    add_footer();
    show_popup();
}

//Προσθεσε το navigation bar στο τελος
function add_navbar() {
    let iframe = document.createElement('iframe');
    iframe.src = 'pages/navbar.html';
    iframe.id = 'navbar_iframe';
    iframe.style.height = 0;
    if (no_animation) {
        iframe.style.transitionDuration = `0ms`;
    }
    document.body.insertAdjacentElement('afterbegin', iframe);
}

//Προσθεσε το footer στο τελος
function add_footer() {
    let iframe = document.createElement('iframe');
    iframe.src = 'pages/footer.html';
    iframe.id = 'footer_iframe';
    iframe.className = "footer";
    iframe.style.height = 0;
    iframe.style.marginTop = 0;
    if (no_animation) {
        iframe.style.transitionDuration = `0ms`;
    }
    document.body.insertAdjacentElement('beforeend', iframe);
}
function show_popup() {
    //Δες αν εχεις ξαναδειξει το popup

    let should_not_create_popup = localStorage.getItem('popup_created');

    //Γραψε οτι εχεις ηδη δειξει το popup
    localStorage.setItem('popup_created', 'true');

    //Uncomment για να βλεπεις το popup καθε φορα
    //should_not_create_popup = false;

    if (should_not_create_popup) {
        return;
    }
    let home_popup = document.getElementById('home_popup');
    home_popup.style.opacity = 1;
    let popup_button = document.getElementById('popup_button');
    popup_button.addEventListener('click', function () {
        home_popup.style.opacity = 0;
    });
    let welcome_text = document.getElementById('welcome_text');
    let time = document.getElementById('time');
    let currentTime = new Date();
    let hours = String(currentTime.getHours()).padStart(2, '0');
    let minutes = String(currentTime.getMinutes()).padStart(2, '0');
    let seconds = String(currentTime.getSeconds()).padStart(2, '0');
    let welcome_text_string;
    if (hours >= 0 && hours <= 6) {
        welcome_text_string = `Ξύπνησες νωρίς ε?`;
    }
    else if (hours > 6 && hours <= 12) {
        welcome_text_string = `Καλημέρα!`;
    }
    else if (hours > 12 && hours <= 18) {
        welcome_text_string = `Καλησπέρα!`;
    }
    else {
        welcome_text_string = `Γεια σας!`;
    }
    welcome_text.innerText = welcome_text_string;
    time.innerText = `${hours}:${minutes}:${seconds}`;
    //Ξεκινα να αλλαζεις την ωρα στο popup
    requestAnimationFrame(update_time);
}

//Αλλαζε συνεχως την ωρα στο popup
function update_time() {
    let time = document.getElementById('time');
    let currentTime = new Date();
    let hours = String(currentTime.getHours()).padStart(2, '0');
    let minutes = String(currentTime.getMinutes()).padStart(2, '0');
    let seconds = String(currentTime.getSeconds()).padStart(2, '0');
    time.innerText = `${hours}:${minutes}:${seconds}`;
    requestAnimationFrame(update_time);
}
