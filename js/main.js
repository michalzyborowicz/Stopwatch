const startBtn = document.querySelector('.start')
const pauseBtn = document.querySelector('.pause')
const stopBtn = document.querySelector('.stop')
const resetBtn = document.querySelector('.reset')
const histBtn = document.querySelector('.history')
const stopwatch = document.querySelector('.stopwatch')
const time = document.querySelector('.time')
const timeList = document.querySelector('.time-list')
const infoBtn = document.querySelector('.info')
const modal = document.querySelector('.modal-shadow')
const closeBtn = document.querySelector('.close')
let countTime
let minutes = 0
let seconds = 0

let timesArr = []

const handleStart = () => {
	clearInterval(countTime)
	countTime = setInterval(() => {
		if (seconds < 9) {
			seconds++
			stopwatch.textContent = `${minutes}:0${seconds}`
		} else if (seconds >= 9 && seconds < 59) {
			seconds++
			stopwatch.textContent = `${minutes}:${seconds}`
		} else if (seconds >= 59) {
			minutes++
			seconds = 0
			stopwatch.textContent = `${minutes}:00`
		}
	}, 1000)
}

const handlePause = () => {
	clearInterval(countTime)
}

const handleStop = () => {
	time.innerHTML = `Last time: ${stopwatch.textContent}`
	if (stopwatch.textContent !== '0:00') {
		time.style.visibility = 'visible'
		timesArr.push(stopwatch.textContent)
	}
	clearStuff()
}

const handleReset = () => {
	time.style.visibility = 'hidden'
	timesArr = []
	clearStuff()
}
const clearStuff = params => {
	clearInterval(countTime)

	stopwatch.textContent = '0:00'
	timeList.textContent = ''
	seconds = 0
	minutes = 0
}
const handleHist = () => {
	timeList.textContent = ''
	let lapNr = 1
	timesArr.forEach(time => {
		const record = document.createElement('li')
		record.innerHTML = `Lap nr ${lapNr} time: <span>${time}</span> `
		timeList.append(record)
		lapNr++
	})
}

const handleInfo = () => {
	if (!(modal.style.display === 'block')) {
		modal.style.display = 'block'
	} else {
		modal.style.display = 'none'
	}

	modal.classList.toggle('modal-animation')
}

startBtn.addEventListener('click', handleStart)
pauseBtn.addEventListener('click', handlePause)
stopBtn.addEventListener('click', handleStop)
resetBtn.addEventListener('click', handleReset)
histBtn.addEventListener('click', handleHist)
infoBtn.addEventListener('click', handleInfo)
closeBtn.addEventListener('click', handleInfo)
window.addEventListener('click', e =>e.target === modal ? handleInfo() : false)
