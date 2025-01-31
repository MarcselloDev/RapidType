let userInput
let isTyping = false
let timer
let text = document.getElementById('sentence').textContent


document.getElementById('user-input').addEventListener('input', () => {
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
  if (seconds < bestTime || bestTime === null) {
    clearInterval(stopwatch)
    bestTime = seconds - 1
    localStorage.setItem('bestTime', bestTime)
    document.querySelector('#best-time').innerHTML = `${(localStorage.getItem('bestTime')/100).toFixed(2)} seconds`
  } else{
    clearInterval(stopwatch)
  }

  isTyping = false
}

function restartTimer() {
  console.log('Timer Restarted');
  isTyping = false
  clearInterval(stopwatch)
  document.querySelector('#timer').innerHTML = (0).toFixed(2)
  document.querySelector('#user-input').value = ''
  }

document.querySelector('#start-btn').addEventListener('click', () => {
  restartTimer()
})

document.querySelector('#best-time').innerHTML = `${(localStorage.getItem('bestTime')/100).toFixed(2)} seconds`