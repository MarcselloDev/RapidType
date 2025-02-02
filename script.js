let userInput
let isTyping = false
let timer
let text
let difficulty = localStorage.getItem('difficulty') || 'Normal'

document.getElementById('user-input').addEventListener('paste', (e) => {
  e.preventDefault();
});

document.getElementById('difficulty').textContent = difficulty

document.querySelectorAll('.difficulty').forEach(radio => {
  radio.addEventListener('change', () => {
      difficulty = document.querySelector('input[name="difficulty"]:checked').value
      document.getElementById('difficulty').textContent = difficulty
      localStorage.setItem('difficulty', difficulty)
      restartTimer()
      getBestTime()
  })
})

if (difficulty) {
  document.querySelector(`input[name="difficulty"][value="${difficulty}"]`).checked = true
} else {
  document.querySelector('input[name="difficulty"][value="Normal"]').checked = true
}


let sentences = {
  Easy:[
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
  ],
  Normal: [
    "The toaster suddenly burst into flames. I guess it really wanted to make toast.",
    "The robot vacuum escaped through the back door. Last seen rolling towards the highway.",
    "She found a sock in the fridge for no reason. It was cold, but still had no explanation.",
    "A goat was standing on top of a car downtown. Nobody seemed to find this unusual.",
    "The vending machine refused to take my money. It just stared at me with pure disrespect.",
    "He tripped over absolutely nothing and fell. Gravity just wanted to remind him who's boss.",
    "A potato rolled off the table dramatically. It was a very unnecessary slow-motion moment.",
    "The streetlight flickered exactly three times. Then I heard a whisper behind me.",
    "The cat wore a tiny hat and danced on the table. Clearly, it was the star of the party.",
    "The sun decided to take a nap behind the clouds. Unfortunately, my beach plans did not survive.",
    "My coffee spilled all over the keyboard, again. The universe clearly wants me to stop working.",
    "The library had a secret room no one knew about. Until a book fell and revealed a hidden door.",
    "The dog wore sunglasses and drove a car. The police officer just gave him a nod of approval.",
    "A dragonfly flew past wearing a tiny cape. I can only assume it’s the superhero of insects.",
    "The bicycle decided it wanted to go swimming. It was last seen sinking into the lake.",
    "The alarm clock ran away to join a circus. I can’t even be mad, it deserves a better life.",
    "A squirrel stole my car keys. Now it’s probably joyriding through the neighborhood.",
    "The TV turned on by itself at 3 AM. It was just playing a cooking show on repeat.",
    "My phone auto-corrected 'hello' to 'help'. Now my friend thinks I’m in serious danger.",
    "A seagull swooped down and stole my fries. It didn’t even share with its friends."
  ],
  Hard: [
    "The toaster suddenly burst into flames, turning my breakfast into chaos. The fire alarm screamed while I panicked. My cat just watched, unimpressed. I unplugged it, but my toast was now charcoal. Great start to the morning.",
    "A pigeon stole my sandwich at the park, nodding smugly before flying away. A second pigeon landed, staring me down. They planned this. Defeated, I left hungry. Somewhere, a pigeon feast was happening at my expense.",
    "He accidentally bought 500 bananas online and now his kitchen is a jungle. Smoothies? Banana bread? No. Just panic. Fruit flies arrived like an army. He surrendered to the chaos. The bananas had officially taken over.",
    "The robot vacuum escaped through the back door, rolling towards freedom. It beeped once, as if saying farewell. I chased it but tripped. By the time I got up, it was gone. It’s probably happier now.",
    "She found a sock in the fridge and nobody knew why. Nobody claimed it. The mystery grew. The sock stayed there for weeks, untouched. Eventually, we accepted it. The fridge sock had become a household legend.",
    "A goat was standing on top of a car downtown, completely unbothered. People took pictures. It made direct eye contact with me, like it knew something. Then it left. I’m still thinking about that goat today.",
    "The vending machine refused my money, staring at me with pure disrespect. I tried again. It ate my coin but gave nothing back. I kicked it. It beeped mockingly. I left snackless, defeated by a machine.",
    "He tripped over absolutely nothing and fell. Gravity just personally attacked him. A group of pigeons silently judged. He stood up, pretending it didn’t happen. We all saw. The pigeons definitely saw. His dignity didn’t survive.",
    "A potato rolled off the table, landing dramatically. It was slow motion. The dog grabbed it and ran. It was his now. I considered chasing him, but honestly, he deserved it. The potato belonged to him.",
    "The streetlight flickered exactly three times, then everything went dark. Silence. My phone died. A breeze whispered my name. I remembered every horror movie ever. I walked home faster than I’ve ever moved in my life.",
    "The cat wore a tiny hat and danced on the table, fully committing. The dog tried to join but caused chaos. The table collapsed. The party stopped. The cat simply walked away. Pure confidence. Zero regrets.",
    "The sun decided to take a nap behind the clouds, ruining my beach day. My sunglasses became useless. A seagull laughed at me, or at least it felt that way. I left, defeated. The ocean remained unimpressed.",
    "My coffee spilled all over the keyboard, again. The universe clearly wants me to stop working. The computer beeped in sadness. I sighed. Maybe this is fate. I took a deep breath and grabbed more coffee.",
    "The library had a secret room nobody knew about. A book triggered the door. Naturally, I entered without thinking. Inside, there was a single flickering light. I am now trapped in a haunted library forever. Oops.",
    "The pizza delivery guy arrived on a skateboard, flipping it before handing me the box. Honestly, I was too impressed to complain about the late delivery. The pizza was cold, but my admiration for him was warm.",
    "The dog wore sunglasses and drove a car past me. Nobody seemed surprised. A cop nodded at him. I started questioning reality. Maybe I should let my cat get a driver’s license. It seems normal here.",
    "The elevator started going sideways for no reason, confusing everyone. Someone sipped their coffee like this was normal. I panicked internally. The doors opened to the same floor. We all left, pretending nothing happened. I need answers.",
    "A dragonfly flew past wearing a tiny cape, looking majestic. It hovered mid-air, observing me. I nodded respectfully. It nodded back. Then it vanished into the sky. Somewhere, a mosquito is trembling in fear. Incredible creature.",
    "The bicycle decided it wanted to go swimming, rolling straight into the lake. A duck seemed genuinely confused. I just stood there, watching the absurdity unfold. It sank. I left, questioning my life choices. Strange day.",
    "The alarm clock ran away to join a circus, leaving me oversleeping. Can’t even be mad, honestly. It deserves a better life. Now, it’s probably performing for crowds while I struggle to wake up on time.",
    "A squirrel stole my car keys, vanishing into the trees. Now I imagine it joyriding through town. I hope it knows traffic laws. My insurance won’t believe this. Honestly, I don’t believe it either. Absolute chaos.",
    "The TV turned on by itself at 3 AM, playing a cooking show. Now I suddenly crave cake. I don’t have ingredients. I’m haunted and hungry. Ghosts really need to be more considerate with their timing.",
    "My phone auto-corrected 'hello' to 'help,' causing immediate panic. My friend called emergency services. I tried explaining but made it worse. Now, sirens approach my house. I just wanted to say hi. Thanks, auto-correct. Truly helpful.",
    "A seagull swooped down and stole my fries, making direct eye contact. The audacity. I had no defense. It flapped away victorious. I considered revenge but knew I’d lose. This was its world. I just lived in it."
  ]
}


function generateText() {
  let randomText = sentences[difficulty][Math.floor(Math.random() * sentences[difficulty].length)]
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

let bestTimes = {
  Easy: localStorage.getItem('EasyBestTime') || null,
  Normal: localStorage.getItem('NormalBestTime') || null,
  Hard: localStorage.getItem('HardBestTime') || null
}

function startTimer () {
  console.log('Timer Started');
  seconds = 0;
  stopwatch = setInterval(() => {
    document.querySelector('#timer').innerHTML = (seconds/100).toFixed(2)
    seconds++;
  }, 10);
}

function stopTimer () {
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

function restartTimer() {
  clearInterval(stopwatch)
  console.log('Timer Restarted');
  isTyping = false
  document.querySelector('#timer').innerHTML = (0).toFixed(2)
  resetUserInput()
  generateText()
  }

document.querySelector('#start-btn').addEventListener('click', () => {
  restartTimer()
})

function setBestTime() {
  localStorage.setItem(difficulty + 'BestTime', bestTimes[difficulty]);
}

function getBestTime() {
  let bestTime = localStorage.getItem(difficulty + 'BestTime');
  document.querySelector('#best-time').innerHTML = (bestTime/100).toFixed(2)
}
getBestTime()

function resetUserInput() {
  document.querySelector('#user-input').value = ''
}