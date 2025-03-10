'use strict'

var gSize = 4
var gNums = []
var gCurrNum = 1
var gTimer = 60
var gInterval

function onInit() {
  resetNums()
  renderBoard()
}

function renderBoard() {
  var strHTML = ''

  for (var i = 0; i < gSize; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < gSize; j++) {
      var randNum = getRndNum()
      strHTML += `<td onclick='onCellClicked(this, ${randNum})'>
                      ${randNum}
                  </td>`
    }
    strHTML += '</tr>'
  }
  const elBoard = document.querySelector('table')
  elBoard.innerHTML = strHTML
}

function resetNums() {
  gNums = []
  for (var i = 1; i <= gSize ** 2; i++) {
    gNums.push(i)
  }
}

function onCellClicked(elCell, clickedNum) {
  if (gCurrNum === clickedNum) {
    if (clickedNum === 1) startTimer()
    elCell.style.backgroundColor = 'green'
    gCurrNum++
  } else {
    elCell.style.backgroundColor = 'red'
    setTimeout(() => {
      elCell.style.backgroundColor = ''
    }, 300)
  }
  if (gCurrNum > gSize ** 2) {
    clearInterval(gInterval)
  }
}

function getRndNum() {
  const idx = getRandomInt(0, gNums.length)
  const num = gNums[idx]
  gNums.splice(idx, 1)
  return num
}

function startTimer() {
  // if (gInterval) return
  gInterval = setInterval(() => {
    gTimer -= 0.01
    document.querySelector('.timer').innerText = gTimer.toFixed(3)

    if (gTimer <= 0.0) {
      clearInterval(gInterval)
      document.querySelector('.timer').innerText = '0.000'
    }
  }, 10)
}

function setDifficulty(newSize) {
  gSize = newSize
  onRestart()
}

function onRestart() {
  gCurrNum = 1
  gTimer = 60
  clearInterval(gInterval)
  gInterval = null
  document.querySelector('.timer').innerText = '60.000'
  onInit()
}
