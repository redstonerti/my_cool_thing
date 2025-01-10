<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz</title>
    <style>
        .correct {
            background-color: green;
            color: white;
        }
        .incorrect {
            background-color: red;
            color: white;
        }
    </style>
</head>
<body>
    <h1>Quiz</h1>

    <!-- Ερώτηση 1 -->
    <div id="question1">
        <p>Ποια είναι η πρωτεύουσα της Ελλάδας;</p>
        <button onclick="checkAnswer(1, 'A')">Αθήνα</button>
        <button onclick="checkAnswer(1, 'B')">Θεσσαλονίκη</button>
        <button onclick="checkAnswer(1, 'C')">Πάτρα</button>
        <button onclick="checkAnswer(1, 'D')">Ηράκλειο</button>
    </div>

    <!-- Ερώτηση 2 -->
    <div id="question2">
        <p>Ποιος είναι ο μεγαλύτερος ωκεανός;</p>
        <button onclick="checkAnswer(2, 'A')">Ειρηνικός</button>
        <button onclick="checkAnswer(2, 'B')">Ατλαντικός</button>
        <button onclick="checkAnswer(2, 'C')">Ινδικός</button>
        <button onclick="checkAnswer(2, 'D')">Βόρειος Παγωμένος</button>
    </div>

    <!-- Ερώτηση 3 -->
    <div id="question3">
        <p>Ποιο είναι το πιο ψηλό βουνό στον κόσμο;</p>
        <button onclick="checkAnswer(3, 'A')">Everest</button>
        <button onclick="checkAnswer(3, 'B')">K2</button>
        <button onclick="checkAnswer(3, 'C')">Αλπεις</button>
        <button onclick="checkAnswer(3, 'D')">Ολυμπος</button>
    </div>

    <!-- Ερώτηση 4 -->
    <div id="question4">
        <p>Ποιο είναι το μεγαλύτερο ζώο στον κόσμο;</p>
        <button onclick="checkAnswer(4, 'A')">Φάλαινα</button>
        <button onclick="checkAnswer(4, 'B')">Ελέφαντας</button>
        <button onclick="checkAnswer(4, 'C')">Καμηλοπάρδαλη</button>
        <button onclick="checkAnswer(4, 'D')">Αρκούδα</button>
    </div>

    <!-- Ερώτηση 5 -->
    <div id="question5">
        <p>Ποιος ανακάλυψε την Αμερική;</p>
        <button onclick="checkAnswer(5, 'A')">Χριστόφορος Κολόμβος</button>
        <button onclick="checkAnswer(5, 'B')">Φερδινάνδος Μαγγελάνος</button>
        <button onclick="checkAnswer(5, 'C')">Βάσκο ντα Γκάμα</button>
        <button onclick="checkAnswer(5, 'D')">Νικόλαος Κοπέρνικος</button>
    </div>

    <script>
        // Σωστές απαντήσεις
        const correctAnswers = {
            1: 'A', // Σωστή απάντηση για την ερώτηση 1
            2: 'A', // Σωστή απάντηση για την ερώτηση 2
            3: 'A', // Σωστή απάντηση για την ερώτηση 3
            4: 'A', // Σωστή απάντηση για την ερώτηση 4
            5: 'A', // Σωστή απάντηση για την ερώτηση 5
        };

        function checkAnswer(questionNumber, answer) {
            const questionDiv = document.getElementById('question' + questionNumber);
            const buttons = questionDiv.getElementsByTagName('button');

            // Κοιτάμε αν η απάντηση είναι σωστή ή λάθος
            if (answer === correctAnswers[questionNumber]) {
                // Σωστό
                for (let button of buttons) {
                    button.classList.remove('correct', 'incorrect');
                    if (button.textContent === button.textContent) {
                        button.classList.add('correct');
                    }
                }
                alert('Σωστό!');
            } else {
                // Λάθος
                for (let button of buttons) {
                    button.classList.remove('correct', 'incorrect');
                    if (button.textContent === correctAnswers[questionNumber]) {
                        button.classList.add('correct');
                    } else if (button.textContent === answer) {
                        button.classList.add('incorrect');
                    }
                }
                alert('Λάθος! Η σωστή απάντηση ήταν: ' + correctAnswers[questionNumber]);
            }
        }
    </script>
</body>
</html>