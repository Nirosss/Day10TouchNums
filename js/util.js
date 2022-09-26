function drawNum() {
  var drawNum = gNums[getRandomIntInclusive(0, gNums.length - 1)]
  gNums.splice(gNums.indexOf(drawNum), 1)
  return drawNum
}

function resetNums(gLimit) {
  gNums = []
  for (var i = 0; i < gLimit; i++) {
    gNums[i] = i + 1
  }
  return gNums
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function countUpTimer() {
  ++totalSeconds
  var minute = Math.floor(totalSeconds / 6000)
  var seconds = totalSeconds / 100 - minute * 60
  document.getElementById('count_up_timer').innerHTML = minute + ':' + seconds
}
