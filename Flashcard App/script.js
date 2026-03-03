const cards = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is 2 + 2?", answer: "4" },
]

const questionEl = document.getElementById('question')
const answerEl = document.getElementById('answer')
const counterEl = document.getElementById('counter')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const flipBtn = document.getElementById('flip')
const flashcardEl = document.querySelector('.flashcard')

const newQuestionInput = document.getElementById('new-question')
const newAnswerInput = document.getElementById('new-answer')
const addBtn = document.getElementById('add-btn')

let currentIndex = 0

function showCard(index) {
    const card = cards[index]
    questionEl.textContent = card.question
    answerEl.textContent = card.answer
    counterEl.textContent = `${index + 1} / ${cards.length}`
    flashcardEl.classList.remove('flipped')
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--
        showCard(currentIndex)
    }
})

nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
        currentIndex++
        showCard(currentIndex)
    }
})

flipBtn.addEventListener('click', () => {
    flashcardEl.classList.toggle('flipped')
})

addBtn.addEventListener('click', () => {
    const newQuestion = newQuestionInput.value.trim()
    const newAnswer = newAnswerInput.value.trim()
    if (newQuestion && newAnswer) {
        cards.push({ question: newQuestion, answer: newAnswer })
        newQuestionInput.value = ''
        newAnswerInput.value = ''
        currentIndex = cards.length - 1
        showCard(currentIndex)
    }
})

// Initialize the first card
showCard(currentIndex)