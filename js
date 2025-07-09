const scores = {
  wavelyn: 0,
  william: 0
};

function changeScore(player, delta) {
  scores[player] += delta;
  if (scores[player] < 0) scores[player] = 0;
  document.getElementById(`${player}-score`).textContent = scores[player];
}

function completeChallenge(player) {
  const textElem = document.getElementById(`${player}-challenge`);
  textElem.classList.add('completed');
}
