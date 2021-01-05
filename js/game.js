const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {

};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: 'Question Num 1, answ(2)',
    choice1: '7',
    choice2: '51',
    choice3: '3',
    choice4: '12',
    answer: 2,
  },
  {
    question: 'Question Num 2, answ(3)',
    choice1: '24',
    choice2: '3',
    choice3: '61',
    choice4: '31',
    answer: 3,
  },
  {
    question: 'Question Num 3, answ(1)',
    choice1: '3',
    choice2: '15',
    choice3: '16',
    choice4: '21',
    answer: 1,
  },
  {
    question: 'Question Num 4, answ(2)',
    choice1: '4231',
    choice2: '53',
    choice3: '121',
    choice4: '332',
    answer: 2,
  }
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
    localStorage.setItem('mostRecentScore', score);

    return window.location.assign('/end.html');
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });
  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach(choice => {
   choice.addEventListener('click', (e) => {
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if(classToApply === 'correct'){
      incrementScore(SCORE_POINTS);
    }
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);

      getNewQuestion();
    }, 1000);
   });
});

incrementScore = num => {
  score +=num;
  scoreText.innerText = score;

}
startGame();
