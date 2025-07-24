const scores = {
  wavelyn: 0,
  william: 0
};

const challengeIds = [
  'challenge-wavelyn',
  'challenge-william',
  'challenge-wavelyn-extra',
  'challenge-william-extra',
  'challenge-bonus-pickle',
  'challenge-wavelyn-new',
  'challenge-william-animals',
  'challenge-bonus-sackboy',
  'challenge-wavelyn-teach',
  'challenge-william-help',
  'challenge-bonus-handshake',
  'challenge-wavelyn-lead',
  'challenge-william-facts'
];

function loadState() {
  const savedScores = JSON.parse(localStorage.getItem('scores'));
  if (savedScores) {
    scores.wavelyn = savedScores.wavelyn || 0;
    scores.william = savedScores.william || 0;
    updateDisplay('wavelyn');
    updateDisplay('william');
  }

  challengeIds.forEach(id => {
    if (localStorage.getItem(id) === 'true') {
      document.getElementById(id)?.classList.add('completed');
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
  checkVictory();
}

function completeChallenge(id) {
  const elem = document.getElementById(id);
  if (elem) {
    elem.classList.add('completed');
    localStorage.setItem(id, 'true');
  }
}

function checkVictory() {
  if (scores.wavelyn >= 10 && scores.william >= 10) {
    const banner = document.getElementById('celebration');
    const sound = document.getElementById('victory-sound');
    if (banner && sound) {
      banner.style.display = 'block';
      sound.play();

      // Launch confetti burst
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Optional: repeat burst for added celebration
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.4 }
        });
      }, 500);
    }
  }
}


function resetGame() {
  scores.wavelyn = 0;
  scores.william = 0;
  updateDisplay('wavelyn');
  updateDisplay('william');
  localStorage.removeItem('scores');

  challengeIds.forEach(id => {
    document.getElementById(id)?.classList.remove('completed');
    localStorage.removeItem(id);
  });

  document.getElementById('celebration').style.display = 'none';
}

window.onload = loadState;
