let score= JSON.parse(localStorage.getItem('score')) || {
  wins:0,
  losses:0,
  ties:0
};
document.querySelector('.change').innerHTML=`Wins:${score.wins}, Losses:${score.losses}, Ties:${score.ties}`;

      // if (score===null){ //score===null or !score both are same
      //   score={
      //     wins:0,
      //     losses:0,
      //     ties:0
      //   }
      // } use of default operator-shortcut

let intervalId;
let isAutoPlaying=false;

function autoPlay(){
  if (!isAutoPlaying){
    intervalId= setInterval(()=>{
      playGame(decideMove())
    },1000);
    isAutoPlaying=true;
    document.querySelector('.autoplay').innerHTML='Stop Play'
  }
  else{
    clearInterval(intervalId);
    isAutoPlaying=false;
    document.querySelector('.autoplay').innerHTML='Auto Play'
  }
}  
document.querySelector('.autoplay')
  .addEventListener('click',()=>{
    autoPlay();
  });

document.querySelector('body').addEventListener('keydown',(event)=>{
  if(event.key==='r'){
    playGame('✊🏼');
  }
  else if(event.key==='p'){
    playGame('🖐🏼');
  }
  else if(event.key==='s'){
    playGame('✌🏼');
  }
  else if(event.key==='a'){
    autoPlay();
  }
})

document.querySelector('.rock')
  .addEventListener('click',()=>{
    playGame('✊🏼');
  });

document.querySelector('.paper')
  .addEventListener('click',()=>{
    playGame('🖐🏼');
  });
  
document.querySelector('.scissors')
  .addEventListener('click',()=>{
    playGame('✌🏼');
  });

document.querySelector('.reset')
  .addEventListener('click',()=>{
    document.querySelector('.confirmation').innerHTML=`Are you sure you want to reset the score? <button class="yes">Yes</button> <button class="no">No</button>`;
    document.querySelector('.yes')
      .addEventListener('click',()=>{
        document.querySelector('.confirmation').innerHTML='';
        score.wins=0;score.losses=0;score.ties=0;
        localStorage.removeItem('score');
        document.querySelector('.result').innerHTML='';
        document.querySelector('.moves').innerHTML='';
        document.querySelector('.change').innerHTML=`Wins:${score.wins}, Losses:${score.losses}, Ties:${score.ties}`;
      });
    document.querySelector('.no')
      .addEventListener('click',()=>{
        document.querySelector('.confirmation').innerHTML='';
      });
  });

document.querySelector('.yes')
  .addEventListener('click',()=>{
    document.querySelector('.confirmation').innerHTML='';
    score.wins=0;score.losses=0;score.ties=0;
    localStorage.removeItem('score');
    document.querySelector('.result').innerHTML='';
    document.querySelector('.moves').innerHTML='';
    document.querySelector('.change').innerHTML=`Wins:${score.wins}, Losses:${score.losses}, Ties:${score.ties}`;
  });

document.querySelector('.no')
  .addEventListener('click',()=>{
    document.querySelector('.confirmation').innerHTML='';
  });

function playGame(playerMove){
  let computerMove=decideMove();
  let result;
  if (playerMove === '✊🏼'){
    if (computerMove === '✊🏼'){
      result='It\'s a tie!';
    }
    else if(computerMove === '🖐🏼'){
      result='Computer wins!';
    }
    else{
      result='You win!';
    }
  }

  if (playerMove === '🖐🏼'){
    if (computerMove === '✊🏼'){
      result='You win!';
    }
    else if(computerMove === '🖐🏼'){
      result='It\'s a tie!';
    }
    else{
      result='Computer wins!';
    }
  }
  
  if (playerMove === '✌🏼'){
    if (computerMove === '✊🏼'){
      result='Computer wins!';
    }
    else if(computerMove === '🖐🏼'){
      result='You win!';
    }
    else{
      result='It\'s a tie!';
    }
  }
  if(result === 'You win!'){
    score.wins+=1;
  }
  else if(result === 'Computer wins!'){
    score.losses+=1;
  }
  else{
    score.ties+=1;
  }
  document.querySelector('.result').innerHTML=(`${result}`);
  document.querySelector('.moves').innerHTML=(`You chose ${playerMove}, The computer chose ${computerMove}.`);
  document.querySelector('.change').innerHTML=(`Wins:${score.wins}, Losses:${score.losses}, Ties:${score.ties}`);

  localStorage.setItem('score',JSON.stringify(score));
}

function decideMove (){
  let randomNumber = Math.random();
  let computerMove;
  if(randomNumber>=0 && randomNumber<1/3){
    computerMove='✊🏼';
  }
  else if (randomNumber>=1/3 && randomNumber<2/3){
    computerMove='🖐🏼';
  }
  else{
    computerMove='✌🏼';
  }
  return computerMove;      
}
