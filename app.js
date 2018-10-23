/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
let scores, roundScores, activePlayer, gameIsPlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', () => {
  if(gameIsPlaying) {
    // 1. Número Randômico
    let dice = Math.ceil(Math.random() * 3);

    // 2. Mostrar o Resultado
    const diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    
    // 3. Atualizar a pontuação da rodada SE o nº obtivo NÃO for 1
    if(dice > 1) {      
      // Checar se dois 6 foram rolados em sequência
      if (roundScore === 3 && roundPrevScore === 3) {
        scores[activePlayer] = 0;
        document.getElementById('score-' + activePlayer).textContent = '0';

        console.log("Round: " + roundScore);
        console.log("Prev:  " + roundPrevScore);
        console.log("Active:  " + scores[activePlayer]);
        nextPlayer();
      } else {
        // Adicionar valor do dice ao roundScore
        roundScore += dice;
        document.getElementById('current-' + activePlayer).textContent = roundScore;       

        console.log("Round: " + dice);
        console.log("Prev:  " + roundPrevScore);
        console.log("Active:  " + scores[activePlayer]);
        
        roundPrevScore = dice;
      }     
    } else {
      // Próximo jogador
      nextPlayer();
    }
  }	
});

document.querySelector('.btn-hold').addEventListener('click', () => {
  if(gameIsPlaying) {
    //Adicionar roundScore a pontuação global do jogador ativo
    scores[activePlayer] += roundScore;
    //Atualizar a UI
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    //Checar se o jogador ganhou o jogo
    if(scores[activePlayer] >= 100) {
      document.getElementById('name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gameIsPlaying = false;
    } else {
      nextPlayer();
    }
  }    
});

function nextPlayer() {
  activePlayer = (activePlayer) ? 0 : 1;    
    roundScore = 0;
    roundPrevScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active'); 
    document.querySelector('.player-1-panel').classList.toggle('active'); 

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  //Setando valores iniciais
  scores = [10,10];
  roundScore = 0;
  roundPrevScore = 0;
  activePlayer = 0;
  gameIsPlaying = true;

  //Ocultando o dado inicialmente
  document.querySelector('.dice').style.display = 'none';

  //Setando scores iniciais para zero
  document.getElementById('score-0').textContent = '10';
  document.getElementById('score-1').textContent = '10';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}