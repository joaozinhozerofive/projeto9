const buttonPlay = document.querySelector('.play')
const buttonPause = document.querySelector('.pause')
const buttonStop = document.querySelector('.stop')
const buttonSet = document.querySelector('.set')
const buttonSoundOn = document.querySelector('.sound-on')
const buttonSoundOff = document.querySelector('.sound-off')
const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')

const buttonPressAudio = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/button-press.wav?raw=true")
const kitchenTimer = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true")
const bgAudio = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/bg-audio.mp3?raw=true")

bgAudio.loop = true

let minutes = Number(minutesDisplay.textContent)
let seconds =  Number(secondsDisplay.textContent)
let timerTimeOut

function resetControls() {
  buttonPlay.classList.remove('hide')
  buttonPause.classList.add('hide')
  buttonSet.classList.remove('hide')
  buttonStop.classList.add('hide')
}

function btnPlay() {
  buttonPlay.classList.add('hide')
  buttonPause.classList.remove('hide')
  buttonSet.classList.add('hide')
  buttonStop.classList.remove('hide')
}


function btnPause () {
  buttonPause.classList.add('hide')
  buttonPlay.classList.remove('hide')
}

function btnSoundOffOn () {
  buttonSoundOn.classList.toggle('hide')
  buttonSoundOff.classList.toggle('hide')
}

function updateTimerDisplay(minutes, seconds) {
  minutesDisplay.textContent = String(minutes).padStart(2, "0")
  secondsDisplay.textContent = String(seconds).padStart(2, "0")
}

function resetTimer() {
  updateTimerDisplay(minutes, 0)
  clearTimeout(timerTimeOut)
}

function pressButton(){
  buttonPressAudio.play()
}

function timeEnd() {
  kitchenTimer.play()
}



function countdown(){
  timerTimeOut = setTimeout(function() {
    let seconds =  Number(secondsDisplay.textContent)
    let minutes = Number(minutesDisplay.textContent)
    let isFinished = minutes <=0 && seconds <= 0


    if (isFinished){
      timeEnd()
      resetControls()
      return
    }

    if (seconds <=0 && minutes >0) {
      seconds = 5
      --minutes

      console.log(minutes)
    }
    
    
    updateTimerDisplay(minutes, String(seconds - 1))


    countdown()
  }, 1000)
}

function getMinutes() {
  let newMinutes = prompt('Quantos minutos?')
  if (!newMinutes) {
    resetTimer()
    return
  }

  minutes = newMinutes
  updateTimerDisplay(minutes, 0)
}

buttonPlay.addEventListener('click', function() {
  btnPlay()
  countdown()
  pressButton()

})

buttonPause.addEventListener('click', function() {
  btnPause ()
  clearTimeout(timerTimeOut)
  pressButton()
})

buttonStop.addEventListener('click', function() {
  resetControls()
  resetTimer()
  pressButton()

})

buttonSoundOff.addEventListener('click', function() {
  btnSoundOffOn()
  bgAudio.pause()
})

buttonSoundOn.addEventListener('click', function() {
  btnSoundOffOn ()
  bgAudio.play()
})

buttonSet.addEventListener('click', function() {
  minutes= getMinutes()
  pressButton()
})