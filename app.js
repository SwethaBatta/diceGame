/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, dice1, gamePlaying, prevDice, prevDice1;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying)
    {
    //1. Random number
    var dice = Math.floor((Math.random() * 6) + 1);
    var dice1 = Math.floor((Math.random() * 6) + 1);
    
    //2. Display the result
    var diceDOM = document.querySelector('.dice');
    var diceDOM1 = document.querySelector('.dice1');
    diceDOM.style.display = 'block';
    diceDOM1.style.display = 'block';
    diceDOM.src = 'dice-'+dice+'.png';
    diceDOM1.src = 'dice-'+dice1+'.png';
    
    //3. Update the Round score if both the dice are not equal to 1
    if(dice !==1 && dice1 !==1)
    {
        if((prevDice===6 || prevDice1 ===6) && (dice===6 || dice1===6))
        {
            roundScore = 0;
            scores[activePlayer]=0;
            document.querySelector('#current-' + activePlayer).textContent ='0';
            document.querySelector('#score-' + activePlayer).textContent ='0';
        }
        else
        {
            roundScore+=dice+dice1;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        prevDice = dice;
        prevDice1 = dice1;

    }
    else
    {  
        nextPlayer();
    }
        
    }
})

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying)
    {
    //Add current score to global score
    scores[activePlayer]+=roundScore;
        
    //Update Global score in UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    //Check if the player won'
    var input = document.querySelector('.final-score').value;
    var winningScore;
    if(input){
        winningScore = input;
    }else{
        winningScore = 100;
    }
        console.log(winningScore)
    if(scores[activePlayer]>=winningScore){
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice1').style.display = 'none';
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        gamePlaying = false;
        //document.querySelector('.btn-roll').style.display = 'none';
        //document.querySelector('.btn-hold').style.display = 'none';
    }
    else{            
        //Next Player
        nextPlayer();
    }
    }
})  

document.querySelector('.btn-new').addEventListener('click', init);


function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //document.querySelector('.btn-roll').style.display = 'block';
    //document.querySelector('.btn-hold').style.display = 'block';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer(){
     activePlayer===0?activePlayer=1:activePlayer=0;
     roundScore=0;
     document.querySelector('#current-0').textContent = '0';
     document.querySelector('#current-1').textContent = '0';
     document.querySelector('.player-0-panel').classList.toggle('active');
     document.querySelector('.player-1-panel').classList.toggle('active');
     document.querySelector('.dice').style.display = 'none';
     document.querySelector('.dice1').style.display = 'none';
}