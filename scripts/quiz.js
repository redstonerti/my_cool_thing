let submit_button = document.getElementById('submit_button');
let person_name = ``;
let quiz_top = document.getElementById('quiz_top');
let quiz_introduction = document.getElementById("quiz_introduction");
submit_button.addEventListener('click', function () {
    person_name = document.getElementById("nameInput").value;
    quiz_introduction.remove();
    start_quiz();
});
let questions = ["Πόσες κάρτες έχει η ιστοσελίδα στο σύνολο?", "Πόσοι λαγοί χρειάζονται για να ετοιμάσεις μια πεντανόστιμη μερίδα πιερόγκι?", "Πότε ήταν η πρώτη φορά που χάθηκαν πάνω από ένα τρισεκατομύρριο δολλάρια σε μια μερα?", "Πόσα είναι τα περισότερα αυτιά σε ένα ζωο?", "Πότε ξεκίνησε η Κίνα?", "Τι μέρα γιορτάζει ο πρόεδρος της Κίνας?"];
let answers = [["42", "19", "83", "4"], ["Κανένας", "Ένας", "Μόνο η κοιλιά", "Πάνω από 2"], ["19 Οκτωβρίου 1987", "24 Οκτοβρίου 2008", "24 Αυγούστου 2015", "10 Μαρτίου 2020"], ["2", "4", "7", "22"], ["Αρχαίοι πολιτισμοί (περίπου 5000 π.Χ.)", "Δυναστεία Σανγκ (1600–1046 π.Χ.)", "Δυναστεία Τσιν (221–206 π.Χ.)", "Λαϊκή Δημοκρατία της Κίνας (1949)"], ["23 Απριλίου", "17 Μαρτίου", "28 Οκτωβρίου", "25 Δεκεμβρίου"]];
let correct_answers = [0, 2, 3, 0, 0, 1];
let current_question = 0;
let answers_found = 0;
let greeting;
let question;
let answer_divs = document.getElementsByClassName('answer_div');
let answer_correctness_button = document.getElementById("answer_correctness_button");
function start_quiz() {
    greeting = document.createElement('a');
    greeting.innerText = `Χαίρετε ${person_name}!`;
    quiz_top.appendChild(greeting);
    question = document.createElement('p');
    question.innerText = questions[0];
    quiz_top.appendChild(question);
    for (let i = 0; i < answer_divs.length; i++) {
        answer_divs[i].style.opacity = 1;
    }
    for (let i = 0; i < 4; i++) {
        document.getElementById(`answer${i}`).innerText = answers[current_question][i];
    }
}
function answer(new_answer) {
    if (new_answer == correct_answers[current_question]) {
        answer_correctness_button.innerText = `CORRECT!`;
        answer_correctness_button.style.backgroundColor = `#709344`;
        answers_found += 1;
    }
    else {
        answer_correctness_button.innerText = `False :(`;
        answer_correctness_button.style.backgroundColor = `#934944`;
    }
    current_question += 1;
    if (current_question >= correct_answers.length) {
        end_quiz();
        return;
    }
    question.innerText = questions[current_question];
    for (let i = 0; i < 4; i++) {
        document.getElementById(`answer${i}`).innerText = answers[current_question][i];
    }
    answer_correctness_button.style.opacity = 1;
    answer_correctness_button.style.pointerEvents = `all`;
}
for (let i = 0; i < 4; i++) {
    document.getElementById(`answer${i}_div`).addEventListener("mousedown", () => {
        answer(i);
    });
}
function end_quiz() {
    document.getElementById("answers").remove();
    let score_text = document.createElement('a');
    quiz_introduction.appendChild(score_text);
    question.innerHTML = `Score: ${answers_found} / ${correct_answers.length}`;
    greeting.remove();
    answer_correctness_button.style.opacity = 0;
    answer_correctness_button.style.pointerEvents = `none`;
}
document.getElementById(`answer_correctness_button`).addEventListener("mousedown", () => {
    answer_correctness_button.style.opacity = 0;
    answer_correctness_button.style.pointerEvents = `none`;
});