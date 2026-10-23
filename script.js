const questions = [
  {
    question: "Which C++ keyword is used to define a class?",
    options: ["struct", "class", "object", "define"],
    answer: 1
  },
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language"
    ],
    answer: 0
  },
  {
    question: "Which operator is used to access a member through a pointer in C++?",
    options: [".", "::", "->", "=>"],
    answer: 2
  },
  {
    question: "Which HTML tag creates a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: 1
  },
  {
    question: "What is the correct way to start a C++ main function?",
    options: [
      "void main()",
      "int main()",
      "function main()",
      "main int()"
    ],
    answer: 1
  }
];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const progressEl = document.getElementById("progress");
const nextBtn = document.getElementById("next-btn");
const quizBox = document.getElementById("quiz-box");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

let index = 0;
let score = 0;

function hide(el) {
  el.classList.add("hidden");
  el.hidden = true;
}

function show(el) {
  el.classList.remove("hidden");
  el.hidden = false;
}

function showQuestion() {
  const q = questions[index];
  questionEl.textContent = q.question;
  progressEl.textContent = `Question ${index + 1} of ${questions.length}`;
  optionsEl.innerHTML = "";
  hide(nextBtn);

  q.options.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = text;
    btn.addEventListener("click", () => selectOption(i));
    optionsEl.appendChild(btn);
  });
}

function selectOption(chosen) {
  const q = questions[index];
  const buttons = optionsEl.querySelectorAll("button");

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add("correct");
    if (i === chosen && chosen !== q.answer) btn.classList.add("wrong");
  });

  if (chosen === q.answer) score += 1;
  show(nextBtn);
}

function showResult() {
  hide(quizBox);
  show(resultEl);
  scoreEl.textContent = `Your score: ${score} / ${questions.length}`;
}

nextBtn.addEventListener("click", () => {
  index += 1;
  if (index < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

restartBtn.addEventListener("click", () => {
  score = 0;
  index = 0;
  hide(resultEl);
  show(quizBox);
  showQuestion();
});

hide(nextBtn);
hide(resultEl);
show(quizBox);
showQuestion();
