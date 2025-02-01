let userInput
let isTyping = false
let timer
let text
let sentences = [
  "The toaster suddenly burst into flames.",
  "A pigeon stole my sandwich at the park.",
  "He accidentally bought 500 bananas online.",
  "The robot vacuum escaped through the back door.",
  "She found a sock in the fridge for no reason.",
  "A goat was standing on top of a car downtown.",
  "The vending machine refused to take my money.",
  "He tripped over absolutely nothing and fell.",
  "A potato rolled off the table dramatically.",
  "The streetlight flickered exactly three times.",
  "The cat wore a tiny hat and danced on the table.",
  "The sun decided to take a nap behind the clouds.",
  "My coffee spilled all over the keyboard, again.",
  "The library had a secret room no one knew about.",
  "The pizza delivery guy arrived on a skateboard.",
  "The dog wore sunglasses and drove a car.",
  "The elevator started going sideways for no reason.",
  "A dragonfly flew past wearing a tiny cape.",
  "The bicycle decided it wanted to go swimming.",
  "The alarm clock ran away to join a circus.",
]

function generateText() {
  let randomText = sentences[Math.floor(Math.random() * sentences.length)]
  document.getElementById('sentence').textContent = randomText
}
generateText()


document.getElementById('user-input').addEventListener('input', () => {
  text = document.getElementById('sentence').textContent
  userInput = document.querySelector('#user-input').value

  if(!isTyping) {
    isTyping = true
    startTimer()
  }
  if (isTyping && userInput == text) {
    stopTimer()
  }
  
})

let seconds
let stopwatch
let bestTime = localStorage.getItem('bestTime')
function startTimer () {
  console.log('Timer Started');
  seconds = 0;
  stopwatch = setInterval(() => {
    document.querySelector('#timer').innerHTML = (seconds/100).toFixed(2)
    seconds++;
  }, 10);
}

function stopTimer () {
  console.log('Timer Ended');
  document.getElementById('user-input').value = ''
  if (seconds < parseFloat(bestTime) || !bestTime) {
    clearInterval(stopwatch)
    bestTime = seconds - 1
    setBestTime()
    getBestTime()
  } else{
    clearInterval(stopwatch)
  }

  isTyping = false
  generateText()
}

function restartTimer() {
  console.log('Timer Restarted');
  isTyping = false
  clearInterval(stopwatch)
  document.querySelector('#timer').innerHTML = (0).toFixed(2)
  resetUserInput()
  generateText()
  }

document.querySelector('#start-btn').addEventListener('click', () => {
  restartTimer()
})

function setBestTime() {
  localStorage.setItem('bestTime', bestTime)
} 
function getBestTime() {
  document.querySelector('#best-time').innerHTML = `${(localStorage.getItem('bestTime')/100).toFixed(2)} seconds`
}
getBestTime()

function resetUserInput() {
  document.querySelector('#user-input').value = ''
}