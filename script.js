const scores = {
  wavelyn: 0,
  william: 0
};

const challenges = [
  'wavelyn',
  'william',
  'wavelyn-extra',
  'william-extra',
  'bonus-pickle'
];

function loadState() {
  const savedScores = JSON.parse(localStorage.getItem('scores'));
  if (savedScores) {
    scores.wavelyn = savedScores.wavelyn || 0;
    scores.william = savedScores.william || 0;
    updateDisplay('wavelyn');
    updateDisplay('william');
  }

  challenges.forEach(challenge => {
    if (localStorage.getItem(`challenge_${challenge}`) === 'true') {
      document.getElementById(`${challenge}-challenge`)?.classList.add('completed');
      document.getElementById(challenge)?.classList.add('completed');
    }
  });
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

function completeChallenge(id) {
  const elem = document.getElementById(id);
  if (elem) {
    elem.classList.add('completed');
    localStorage.setItem(`challenge_${id}`, 'true');
  }
}

window.onload = loadState;
