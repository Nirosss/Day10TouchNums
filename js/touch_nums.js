'use strict'
var gNums = []
var timerId
var totalSeconds = 0
var gLimit = 16
var gNextNum = 0
var board = createBoard()
const difficulties = [
  { label: 'Easy', size: 16 },
  { label: 'Medium', size: 25 },
  { label: 'Hard', size: 36 },
]
renderButtons()

function init() {
  totalSeconds = 0
  gNextNum = 0
  board = createBoard()
  renderBoard(board)
}

function createBoard() {
  gNums = resetNums(gLimit)
  var board = []
  for (var i = 0; i < Math.sqrt(gLimit); i++) {
    board[i] = []
    for (var j = 0; j < Math.sqrt(gLimit); j++) {
      board[i][j] = {
        value: gNums[getRandomIntInclusive(0, gNums.length - 1)],
      }
      gNums.splice(gNums.indexOf(board[i][j].value), 1)
    }
  }

  return board
}

function renderBoard(board) {
  var strHTML = ''
  for (var i = 0; i < board.length; i++) {
    strHTML += `<tr>\n`
    for (var j = 0; j < board[0].length; j++) {
      var currCell = board[i][j]

      strHTML += `<td class= "number-${currCell.value}" onclick="clickedNum(this,${i},${j})"
      " data-i = "${i}" data-j="${j}"> ${currCell.value} </td> `
    }
    strHTML += `</tr>`
  }

  var elBoard = document.querySelector('.board table')
  elBoard.innerHTML = strHTML
}

function clickedNum(clicked, cellI, cellJ) {
  var clickedNum = board[cellI][cellJ].value
  if (gNextNum === 0) timerId = setInterval(countUpTimer, 10)
  if (clickedNum === gNextNum + 1) {
    document.querySelector(
      `.board table td.number-${clickedNum}`
    ).style.background = 'red'
    gNextNum++
    if (gNextNum === gLimit) clearInterval(timerId)
  }
}

function renderButtons() {
  var strHTML = ''
  for (var i = 0; i < 3; i++) {
    strHTML += `<button onclick="difficultiesSelector(this,${i})" "data=${i}"> ${difficulties[i].label} </button>`
  }
  var elButton = document.querySelector('.buttons')
  elButton.innerHTML = strHTML
}

function difficultiesSelector(difficulty, diffI) {
  gLimit = difficulties[diffI].size
  init()
}

function restart() {
  gNextNum = 0
  clearInterval(timerId)
  init()
}
