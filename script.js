const scores = {
  wavelyn: 0,
  william: 0
};

function loadState() {
  const savedScores = JSON.parse(localStorage.getItem('scores'));
  if (savedScores) {
    scores.wavelyn = savedScores.wavelyn || 0;
    scores.william = savedScores.william || 0;
    updateDisplay('wavelyn');
    updateDisplay('william');
  }

  const completedWavelyn = localStorage.getItem('challenge_wavelyn');
  const completedWilliam = localStorage.getItem('challenge_william');

  if (completedWavelyn === 'true') {
    document.getElementById('wavelyn-challenge').classList.add('completed');
  }

  if (completedWilliam === 'true') {
    document.getElementById('william-challenge').classList.add('completed');
  }
}

function updateDisplay(player) {
  document.getElementById(`${player}-score`).textContent = scores[player];
}

function saveScores() {
  localStorage.setItem('scores', JSON.stringify(scores));
}

function changeScore(player, delta) {
  scores[player] += delta;
  if (scores[player] < 0) scores[player] = 0;
  updateDisplay(player);
  saveScores();
}

function completeChallenge(player) {
  const textElem = document.getElementById(`${player}-challenge`);
  textElem.classList.add('completed');
  localStorage.setItem(`challenge_${player}`, 'true');
}

window.onload = loadState;
