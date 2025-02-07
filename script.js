let userInput
let isTyping = false
let timer
let text
let seconds
let stopwatch
let difficulty = localStorage.getItem('difficulty') || 'Normal'
let gameMode
let generateModes = {
  Timed: generateTimed,
  WPM: generateWPM,
  Challenge: generateChallenge,
  Practice: generatePractice
}
let score = 0
let highScore = localStorage.getItem('highScore') || 0
let words
let wordCount

let minutes
let wpm

function generateTimed() {
  let html = ''
  html = 
  `
  <h1>RapidType</h1>
        <p class="instruction">Type the sentence(s) below correctly as fast as you can!</p>
        
        <div class="text-box">
            <p id="sentence"></p>
        </div>

        <input type="text" id="user-input" placeholder="Start typing here..." autocomplete="off">

        <div class="stats">
            <p>⏳ Time: <span id="timer">0.00</span> seconds</p>
            <p>🏆 Best Time: <span id="best-time">0.00</span> seconds</p>
            <p>Difficulty: <span id="difficulty"></span></p>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center">
        <button id="start-btn">Start Over</button>
        <button id="reset-btn">Reset all scores</button>
        </div>

        <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; gap: 1vw">
        <div style="margin-top: 1vh; display:flex; flex-direction: column; justify-content: center; align-items: center; text-align: left">
            <select class="difficulty">
            <option value="Easy">Easy</option>
            <option value="Normal" selected>Normal</option>
            <option value="Hard">Hard</option>
            </select>
        </div>

        <div style="margin-top: 1vh; display:flex; flex-direction: column; justify-content: center; align-items: center; text-align: left">
            <select id="game-mode">
            <option value="Timed" selected>Timed</option>
            <option value="WPM">WPM</option>
            <option value="Challenge">Challenge</option>
            <option value="Practice">Practice</option>
            </select>
        </div>
        </div>
  `
  document.querySelector('.container').innerHTML = html

  if (difficulty) {
    document.querySelector('.difficulty').value = difficulty
  }

  addDifficultyListener()
  addGamemodeListener()
  addTypingListener()
  loadDifficulty()
  addRestartListener()
  addResetListener()
}

function generateWPM() {
  let html = ''
  html = 
  `
  <h1>RapidType</h1>
        <p class="instruction">Type the sentence(s) below correctly as fast as you can!</p>
        
        <div class="text-box">
            <p id="sentence"></p>
        </div>

        <input type="text" id="user-input" placeholder="Start typing here..." autocomplete="off">

        <div class="stats">
            <p>⏳ <span title="Words Per Minute">WPM</span>: <span id="wpm">0.00</span></p>
            <p>🏆 Highest WPM: <span id="wpmRecord">0.00</span></p>
            <p>Difficulty: <span id="difficulty"></span></p>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center">
        <button id="start-btn">Start Over</button>
        <button id="reset-btn">Reset all scores</button>
        </div>

        <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; gap: 1vw">
        <div style="margin-top: 1vh; display:flex; flex-direction: column; justify-content: center; align-items: center; text-align: left">
            <select class="difficulty">
            <option value="Easy">Easy</option>
            <option value="Normal" selected>Normal</option>
            <option value="Hard">Hard</option>
            </select>
        </div>

        <div style="margin-top: 1vh; display:flex; flex-direction: column; justify-content: center; align-items: center; text-align: left">
            <select id="game-mode">
            <option value="Timed">Timed</option>
            <option value="WPM" selected>WPM</option>
            <option value="Challenge">Challenge</option>
            <option value="Practice">Practice</option>
            </select>
        </div>
        </div>
  `
  document.querySelector('.container').innerHTML = html

  if (difficulty) {
    document.querySelector('.difficulty').value = difficulty
  }

  addDifficultyListener()
  addGamemodeListener()
  addTypingListener()
  loadDifficulty()
  addRestartListener()
  addResetListener()
}

function generateChallenge() {
  let html = ''
  html = 
  `
  <h1>RapidType</h1>
        <p class="instruction">Type as many sentences in time as you can!</p>
        
        <div class="text-box">
            <p id="sentence"></p>
        </div>

        <input type="text" id="user-input" placeholder="Start typing here..." autocomplete="off">

        <div class="stats">
            <p>⏳ Time left: <span id="timer">60</span> seconds</p>
            <p>🎖️ Score: <span id="score">0</span></p>
            <p>🏆 High Score: <span id="highscore">0</span></p>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center">
        <button id="start-btn">Start Over</button>
        <button id="reset-btn">Reset all scores</button>
        </div>

        <div style="margin-top: 1vh; display:flex; flex-direction: column; justify-content: center; align-items: center; text-align: left">
            <select id="game-mode">
            <option value="Timed">Timed</option>
            <option value="WPM">WPM</option>
            <option value="Challenge" selected>Challenge</option>
            <option value="Practice">Practice</option>
            </select>
        </div>
        </div>
  `
  document.querySelector('.container').innerHTML = html

  difficulty = 'Easy'

  document.querySelector('#highscore').textContent = highScore

  

  addGamemodeListener()
  addTypingListener()
  addRestartListener()
  addResetListener()

  document.getElementById('timer').textContent = 60
}

function generatePractice() {
  let html = ''
  html = 
  `
  <h1>RapidType</h1>
        <p class="instruction">Practice without worrying about your score</p>
        
        <div class="text-box">
            <p id="sentence"></p>
        </div>

        <input type="text" id="user-input" placeholder="Start typing here..." autocomplete="off">

        <div class="stats">
        <p>⏳ Time: <span id="timer">0.00</span> seconds</p>
            <p>Difficulty: <span id="difficulty"></span></p>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center">
        <button id="start-btn">Start Over</button>
        <button id="reset-btn">Reset all scores</button>
        </div>

        <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; gap: 1vw">
        <div style="margin-top: 1vh; display:flex; flex-direction: column; justify-content: center; align-items: center; text-align: left">
            <select class="difficulty">
            <option value="Easy">Easy</option>
            <option value="Normal" selected>Normal</option>
            <option value="Hard">Hard</option>
            </select>
        </div>

        <div style="margin-top: 1vh; display:flex; flex-direction: column; justify-content: center; align-items: center; text-align: left">
            <select id="game-mode">
            <option value="Timed">Timed</option>
            <option value="WPM">WPM</option>
            <option value="Challenge">Challenge</option>
            <option value="Practice" selected>Practice</option>
            </select>
        </div>
        </div>
  `
  document.querySelector('.container').innerHTML = html

  if (difficulty) {
    document.querySelector('.difficulty').value = difficulty
  }

  addDifficultyListener()
  addGamemodeListener()
  addTypingListener()
  loadDifficulty()
  addRestartListener()
  addResetListener()
}

function generateGameMode() {
  gameMode = localStorage.getItem('gameMode') || 'Timed'
  generateModes[gameMode]()
}

generateGameMode()

document.getElementById('user-input').addEventListener('paste', (e) => {
  e.preventDefault();
});


function addDifficultyListener() {
  document.querySelector('.difficulty').addEventListener('change', (event) => {
      difficulty = event.target.value
      document.getElementById('difficulty').textContent = difficulty
      console.log('Current difficulty:', difficulty);
      localStorage.setItem('difficulty', difficulty)
      restartTimer()
      getBestTime()
  });
}



function addGamemodeListener() {
  document.querySelector('#game-mode').addEventListener('change', (event) => {
      gameMode = event.target.value
      console.log("Game mode selected:", gameMode)
      
      if (generateModes[gameMode]) {
        generateModes[gameMode]()
      } else {
        console.error("ERROR")
      }
      localStorage.setItem('gameMode', gameMode)
      restartTimer()
      getBestTime()
  });
}


let sentences = {
  Easy:[
    "The cat sits on the warm sunny roof",
    "A bird flies high above the blue ocean",
    "She likes to read books in the quiet library",
    "The dog runs across the green grassy field",
    "He drinks cold water on a hot summer day",
    "They play soccer in the park every weekend",
    "The sun rises over the tall mountain peaks",
    "A rabbit hops quickly through the small garden",
    "She listens to music while walking to school",
    "He draws pictures with bright colorful crayons",
    "The wind blows leaves across the empty street",
    "They build sandcastles at the sandy beach",
    "A fish swims slowly in the clear blue lake",
    "She picks apples from the tall apple tree",
    "The stars shine brightly in the night sky",
    "He rides his bike along the narrow road",
    "A butterfly lands softly on a yellow flower",
    "They eat ice cream on a hot summer afternoon",
    "The train moves fast across the long bridge",
    "She watches cartoons in the cozy living room",
    "A squirrel climbs quickly up the big oak tree",
    "He writes a letter to his best friend today",
    "The clouds drift slowly across the open sky",
    "They jump into the cool refreshing swimming pool",
    "She helps her mother bake a chocolate cake"
  ],
  Normal: [
    "The boy walks to school every morning. He enjoys the fresh air and the sound of birds singing.",
    "She writes in her journal before bed. It helps her remember important moments from her day.",
    "The car stopped at the red light. The driver waited patiently for the signal to turn green.",
    "They built a treehouse in their backyard. It became their favorite place to play and read books.",
    "The sun set behind the mountains. The sky turned shades of orange, pink, and purple.",
    "He bought a new pair of shoes. They were comfortable and perfect for running.",
    "A dog barked loudly at the stranger. The owner quickly calmed it down with a gentle voice.",
    "She made a cup of tea. The warm drink helped her relax after a long day.",
    "They planted flowers in the garden. Soon, colorful petals bloomed all around them.",
    "The rain poured heavily all afternoon. People hurried to find shelter under buildings.",
    "He watched a movie on his laptop. The story was exciting and full of surprises.",
    "A bird built a nest in the tree. It carefully placed each twig in the perfect spot.",
    "The bus arrived at the station on time. Passengers quickly stepped inside and found seats.",
    "She wore a warm coat in winter. The cold wind made her glad she dressed warmly.",
    "They played chess in the park. The game was challenging, but they had fun.",
    "The chef cooked a delicious meal. The smell filled the entire kitchen with warmth.",
    "She bought a new book to read. The story was interesting and full of adventure.",
    "The waves crashed against the shore. Seagulls flew above, searching for food.",
    "He practiced playing the guitar. His skills improved with each passing day.",
    "They hiked up the steep hill. The view from the top was worth the effort.",
    "A cat slept on the sunny windowsill. Its fur looked warm and soft in the sunlight.",
    "She painted a beautiful landscape. The colors blended perfectly on the canvas.",
    "The children laughed at a funny joke. Their giggles filled the entire room.",
    "He saved money for a new phone. After months of waiting, he finally bought it.",
    "They watched the stars at night. The sky looked endless and full of wonder."
  ],
  Hard: [
    "The old man sat on the wooden bench, watching the pigeons peck at scattered crumbs. He had been coming to the park every morning for years.",
    "She carefully folded the letter and placed it in a small box. The words inside reminded her of a time long gone but never forgotten.",
    "The wind howled through the trees, rattling the windows of the old house. Shadows danced across the walls as the candle flickered in the dark.",
    "He struggled to finish the last chapter of his novel. The words wouldn’t come easily, but he knew he had to push through and complete it.",
    "They walked along the quiet beach, their footprints disappearing with the waves. The scent of salt filled the air as the sun dipped below the horizon.",
    "She placed her hands on the piano keys, hesitating for a moment. The melody she played brought back childhood memories of lessons with her grandmother.",
    "The train rumbled down the tracks, carrying passengers to unknown destinations. Some stared out the window, lost in thought, while others quietly read books.",
    "He held onto the photograph, running his fingers along its faded edges. It was the only thing he had left from a past he barely remembered.",
    "The scientist adjusted his glasses and examined the results again. If his calculations were correct, he had just discovered something groundbreaking.",
    "They gathered around the fire, sharing stories of adventure and mystery. The crackling flames cast long shadows as laughter echoed through the night.",
    "She stood on the balcony, looking down at the busy street below. The city never slept, and she found comfort in its constant movement.",
    "The detective studied the footprints in the mud, his mind racing with possibilities. He knew this clue could be the key to solving the case.",
    "A storm was approaching, dark clouds rolling in over the hills. The villagers hurried to prepare, securing their homes against the heavy winds.",
    "He stared at the chessboard, thinking several moves ahead. Each decision had consequences, and one mistake could cost him the entire game.",
    "She stepped onto the stage, heart pounding in her chest. The audience watched in silence as she took a deep breath and began to sing.",
    "The clock on the wall ticked loudly in the silent room. Each second that passed felt like an eternity as he waited for the news.",
    "They packed their bags and set off on a long journey. The road ahead was uncertain, but they were ready for whatever lay ahead.",
    "The professor wrote equations on the board, explaining complex theories. His students listened carefully, eager to understand the mysteries of the universe.",
    "A cat sat on the windowsill, tail flicking back and forth. It watched the rain fall outside, uninterested in the world beyond the glass.",
    "She brushed the dust off an old book and opened it carefully. The pages were yellowed, and the words told a story lost to time.",
    "The soldiers marched in perfect formation, their boots striking the ground. The air was filled with determination as they prepared for the battle ahead.",
    "He reached the mountain’s peak, exhausted but triumphant. The breathtaking view made every step of the grueling climb worth it.",
    "A little girl tugged at her mother’s sleeve, pointing excitedly at the balloons. The fair was full of lights, laughter, and the scent of caramel popcorn.",
    "She whispered a final goodbye before walking away. Some memories were too painful to carry, yet impossible to forget."
  ]
}


function generateText() {
  let randomText = sentences[difficulty][Math.floor(Math.random() * sentences[difficulty].length)]
  document.getElementById('sentence').textContent = randomText
}
generateText()

function addTypingListener() {
document.getElementById('user-input').addEventListener('input', () => {
  text = document.getElementById('sentence').textContent
  userInput = document.querySelector('#user-input').value

  if(!isTyping) {
    isTyping = true
    if (gameMode === 'Challenge') {
      startCountdown()
    } else if (gameMode === 'WPM') {
      startWPM()
    } else {
      startTimer()
    }
  }
  if (isTyping && userInput == text && gameMode != "Challenge") {
    stopTimer()
  } else if (isTyping && userInput == text && gameMode === "Challenge") {
    score += 1
    document.querySelector('#score').textContent = score
    resetUserInput()
    generateText()
  }
  
})
}

let bestTimes = {
  Easy: localStorage.getItem('EasyBestTime') || null,
  Normal: localStorage.getItem('NormalBestTime') || null,
  Hard: localStorage.getItem('HardBestTime') || null
}
let bestWPMs = {
  Easy: localStorage.getItem('EasyBestWPM') || null,
  Normal: localStorage.getItem('NormalBestWPM') || null,
  Hard: localStorage.getItem('HardBestWPM') || null
}

function startTimer () {
  console.log('Timer Started');
  seconds = 0;
  stopwatch = setInterval(() => {
    document.querySelector('#timer').innerHTML = (seconds/100).toFixed(2)
    seconds++;
  }, 10);
}
function startCountdown () {
  console.log('Countdown Started');
  seconds = 6000;
  stopwatch = setInterval(() => {
    document.querySelector('#timer').innerHTML = (seconds/100).toFixed(2)
    seconds--;
    if (score > highScore) {
        highScore = score
        localStorage.setItem('highScore', highScore)
        document.querySelector('#highscore').textContent = highScore
      }
    if (seconds === 0) {
      document.querySelector('#timer').innerHTML = ((seconds)/100).toFixed(2)
      isTyping = false
      generateText()
      clearInterval(stopwatch)
    }
  }, 10);
}

function startWPM() {
  console.log('WPM Counter Started');
  seconds = 0;
  
  stopwatch = setInterval(() => {
    seconds++;
    console.log(userInput);
    updateWPM();
  }, 200);
}

function updateWPM() {
  words = userInput.split(' ');
  wordCount = words.filter(word => word.length > 0).length;

  minutes = seconds / 300;
  wpm = wordCount/minutes

  document.querySelector('#wpm').innerHTML = wpm.toFixed(2);
}

function stopWPM() {
  clearInterval(stopwatch);
  document.getElementById('user-input').value = ''
    if (wpm > parseFloat(bestWPMs[difficulty]) || !bestWPMs[difficulty]) {
      bestWPMs[difficulty] = wpm
      setBestWPM()
      getBestWPM()
    }
}

function stopTimer () {
  if (gameMode === 'WPM') {
    stopWPM()
    return
  } else {
    clearInterval(stopwatch)
    console.log('Timer Ended');
    document.getElementById('user-input').value = ''
    if (seconds < parseFloat(bestTimes[difficulty]) || !bestTimes[difficulty]) {
      bestTimes[difficulty] = seconds - 1
      setBestTime()
      getBestTime()
    }

    isTyping = false
    generateText()
  }
}

function restartTimer() {
  clearInterval(stopwatch)
  console.log('Timer Restarted');
  isTyping = false
  if (gameMode != 'Challenge' && gameMode != 'WPM') {
      document.querySelector('#timer').innerHTML = (0).toFixed(2)
  }
  resetUserInput()
  generateText()
  }

function addRestartListener() {
document.querySelector('#start-btn').addEventListener('click', () => {
  restartTimer()
})
}

function setBestTime() {
  if (gameMode === 'Practice'){
    return
  }
  else if (gameMode === 'WPM') {
    setBestWPM()
  } else {
    localStorage.setItem(difficulty + 'BestTime', bestTimes[difficulty])
  }
}


function getBestTime() {
  let bestTime = localStorage.getItem(difficulty + 'BestTime');
  if (gameMode === 'Timed')
  document.querySelector('#best-time').innerHTML = (bestTime/100).toFixed(2)
}
getBestTime()

function setBestWPM() {
  localStorage.setItem(difficulty + 'BestWPM', bestWPMs[difficulty])
}

function getBestWPM() {
  let bestWPM = localStorage.getItem(difficulty + 'BestWPM');
  if (gameMode === 'WPM')
  document.querySelector('#wpmRecord').textContent = Number(bestWPM).toFixed(2)
}
getBestWPM()

function resetUserInput() {
  document.querySelector('#user-input').value = ''
}
function loadDifficulty() {
  document.getElementById('difficulty').textContent = difficulty
}

function addResetListener() {
  let confirmed = false
  document.getElementById('reset-btn').addEventListener('click' ,() => {
    if (confirmed) {
      localStorage.clear()
      document.getElementById('reset-btn').textContent = 'Reset all scores'
      confirmed = false
      location.reload();
  
    } else{
        document.getElementById('reset-btn').textContent = 'Click again to confirm'
        confirmed = true
    }
    
  })
}

