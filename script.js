const score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  loses: 0,
  ties: 0
}

function updateScore() {
  document.getElementById('finalScore').innerText = `Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties}`;
}

updateScore();

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock')
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper')
});

document.querySelector('.js-scissor-button').addEventListener('click', () => {
  playGame('scissor')
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock')
  } else if (event.key === 'p') {
    playGame('paper')
  } else if (event.key === 's') {
    playGame('scissor')
  }
})

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'rock') {
    if (computerMove === 'scissor') {
      result = 'you win!'
    } else if (computerMove === 'paper') {
      result = 'you lose'
    } else if (computerMove === 'rock') {
      result = 'Tie'
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'you win!'
    } else if (computerMove === 'scissor') {
      result = 'you lose'
    } else if (computerMove === 'paper') {
      result = 'Tie'
    }

  } else if (playerMove === 'scissor') {
    if (computerMove === 'paper') {
      result = 'you win!'
    } else if (computerMove === 'rock') {
      result = 'you lose'
    } else if (computerMove === 'scissor') {
      result = 'Tie'
    }
  }

  if (result === 'you win!') {
    score.wins += 1;
  } else if (result === 'you lose') {
    score.loses += 1;
  } else if (result === 'Tie') {
    score.ties += 1;
  }


  document.getElementById('res').innerText = result;
  document.getElementById('moves').innerHTML = `You :  <img src="images/${playerMove}.png" class="icon"> || Computer : <img src="images/${computerMove}.png" class="icon">`;

  localStorage.setItem('score', JSON.stringify(score));
  updateScore();
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber > 0 && randomNumber <= 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber > 1 / 3 && randomNumber <= 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber > 2 / 3 && randomNumber <= 1) {
    computerMove = 'scissor'
  }

  return computerMove
}

document.querySelector('.reset-button').addEventListener('click', () => {
  resetScore();
})

function resetScore() {
  score.wins = 0;
  score.loses = 0;
  score.ties = 0;
  localStorage.setItem('score', JSON.stringify(score));
  updateScore();
}

let isAutoPlaying = false;
let intervalId;

document.querySelector('.auto-button').addEventListener('click',()=>{
  autoPlay();
})

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000)
    isAutoPlaying = true;
    document.querySelector('.auto-button').innerHTML = 'Stop'
  } else {
    clearInterval(intervalId)
    isAutoPlaying = false;
    document.querySelector('.auto-button').innerHTML = 'Auto Play'
  }

}
