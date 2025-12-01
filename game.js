const QUESTIONS = [
  { q:"A leader walks into the office and says, “We need to talk about your targets.” While the employee starts explaining their challenges, the leader answers a phone call mid-conversation and walks away saying, “We’ll finish later.”"
, correct:1, choices:["Selective Listening","Ignoring","Attentive Listening"] },
  { q:"The leader approaches a team member and says, “Tell me what’s on your mind.” While the employee talks, the leader keeps smiling and nodding but never asks a single question. At the end, they say, “Great, keep up the good work,” and leave.", correct:0, choices:["Pretend Listening","Selective Listening","Ignoring"] },
  { q:"The leader calls the employee into a meeting: “I want to understand your concerns.” The employee talks about lack of resources, unclear priorities, and feeling stressed. The leader responds only to resources: “We’ll add one more person to help,” ignoring the other issues.", correct:1, choices:["Pretend Listening","Selective Listening","Empathically Listening"] },
  { q:"The leader says, “I noticed you’ve been quiet in meetings—can we talk?” They maintain eye contact, take notes, and summarize: “So, you’re saying unclear priorities and heavy workload are causing stress. Did I get that right?”", correct:2, choices:["Empathically Listening","Ignoring","Attentive Listening"] },
  { q:"The leader approaches and says, “I’ve noticed you seem under pressure—let’s talk.” After listening, they respond: “It sounds like you feel unsupported and overwhelmed. That must be tough. Let’s work together to fix this.”", correct:2, choices:["Pretend Listening","Selective Listening","Empathically Listening"] }
];

let progressStep = 0;
let questionIndex = 0;
let score = 0;

const modal = document.getElementById('quizModal');
const qText = document.getElementById('questionText');
const choicesEl = document.getElementById('choices');
const feedback = document.getElementById('feedback');
const character = document.getElementById('character');
const startPage = document.getElementById('startPage');
const gameArea = document.getElementById('gameArea');
const celebrationModal = document.getElementById('celebrationModal');
const scoreText = document.getElementById('scoreText');
const restartBtn = document.getElementById('restartBtn');

const positions = [
  { left: "0%",  bottom: "0%" },
  { left: "14%", bottom: "16%" },
  { left: "28%", bottom: "32%" },
  { left: "42%", bottom: "48%" },
  { left: "56%", bottom: "64%" },
  { left: "70%", bottom: "80%" } // Top step visible
];


document.getElementById('startBtn').onclick = () => {
  startPage.style.display = 'none';
  gameArea.style.display = 'block';
  character.style.left = positions[0].left;
  character.style.bottom = positions[0].bottom;
  showQuestion();
};

restartBtn.onclick = () => {
  celebrationModal.style.display = 'none';
  progressStep = 0;
  questionIndex = 0;
  score = 0;
  character.style.left = positions[0].left;
  character.style.bottom = positions[0].bottom;
  showQuestion();
};

function showQuestion() {
  const q = QUESTIONS[questionIndex];
  qText.textContent = q.q;
  choicesEl.innerHTML = '';
  feedback.textContent = '';
  q.choices.forEach((c, i) => {
    const btn = document.createElement('button');
    btn.textContent = c;
    btn.onclick = () => checkAnswer(i);
    choicesEl.appendChild(btn);
  });
  modal.style.display = 'flex';
}

function checkAnswer(choiceIndex) {
  const q = QUESTIONS[questionIndex];
  if (choiceIndex === q.correct) {
    feedback.textContent = "Correct!";
    score++;
    setTimeout(() => {
      modal.style.display = 'none';
      advanceStep();
    }, 800);
  } else {
    feedback.textContent = "Try again!";
  }
}

function advanceStep() {
  const nextStep = Math.min(progressStep + 1, positions.length - 1);

  const stepHeight = 60; // must match your .step height

  character.style.left = positions[nextStep].left;
  character.style.bottom = `calc(${positions[nextStep].bottom} + ${stepHeight}px)`;

  progressStep = nextStep;

  // Reveal label
  const currentStepLabel = document.querySelector(`.step[data-i="${progressStep}"] .label`);
  if (currentStepLabel) {
    currentStepLabel.classList.add("visible");
  }

  if (progressStep === positions.length - 1 || questionIndex === QUESTIONS.length - 1) {
    setTimeout(showCelebration, 1200);
  } else {
    questionIndex++;
    setTimeout(showQuestion, 1200);
  }
}



function showCelebration() {
  scoreText.textContent = `Your Score: ${score} / ${QUESTIONS.length}`;
  celebrationModal.style.display = 'flex';

  // Show birthday-style overlay
  document.querySelector('.celebration-overlay').style.display = 'block';

  // Optional: stop after 6 seconds
  setTimeout(() => {
    document.querySelector('.celebration-overlay').style.display = 'none';
  }, 6000);
}


