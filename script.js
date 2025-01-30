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

function startTimer () {
  console.log('Timer Started');

}

function stopTimer () {
  console.log('Timer Ended');
  document.getElementById('user-input').value = ''
}

function restartTimer () {
  console.log('Timer Restarted');
  isTyping = false
}