let score=JSON.parse(localStorage.getItem('score'))||{
    wins:0,
    loss:0,
    ties:0
};

scoreUpdate();
/*
if(!score){
    score={
        wins:0,
        loss:0,
        ties:0
    };
};*/
let isAutoPlaying=false;
let intervalId;
function autoPlay(){
    if(!isAutoPlaying){
            intervalId=setInterval(()=>{
            const playerMove=pickComputerMove();
            playGame(playerMove);
        },1000);
        isAutoPlaying=true;
    }else{
        clearInterval(intervalId);
        isAutoPlaying=false;
    }
}

document.querySelector('.js-rock-button').addEventListener('click',()=>{
    playGame('Rock');
})

document.querySelector('.js-paper-button').addEventListener('click',()=>{
    playGame('Paper');
})

document.querySelector('.js-scissors-button').addEventListener('click',()=>{
    playGame('Scissors');
})
function playGame(userMove){
    const computerMove=pickComputerMove();
    let result='';
    if(computerMove===userMove){
        result='Tie.'
    }else if(computerMove==='Scissors' && userMove==='Rock' ||   computerMove==='Paper' && userMove==='Scissors'|| computerMove==='Rock' && userMove==='Paper'){
        result='You Win.'
    }else {
        result='You Lose.'
    }

    if(result==='You Win.'){
        score.wins++;
    }else if(result==='You Lose.'){
        score.loss++;
    }else if(result==='Tie.'){
        score.ties++;
    }
    localStorage.setItem('score',JSON.stringify(score));

    document.querySelector('.js-result').innerHTML=result;

    document.querySelector('.js-moves').innerHTML=`You<img src="${userMove}-emoji.png" class="move-icon">
<img src="${computerMove}-emoji.png" class="move-icon">Computer`;

    scoreUpdate();
//             alert(`You Picked ${userMove}.Computer picked ${computerMove}.${result}
// Wins:${score.wins} Loss:${score.loss} Ties:${score.ties}`);
    
}

function pickComputerMove(){
    let randomNumber=Math.random();
    let computerMove='';
    if(randomNumber>=0 && randomNumber<1/3){
        computerMove='Rock';
    }else if(randomNumber>=1/3 && randomNumber<2/3){
        computerMove='Paper';
    }else if(randomNumber>=2/3 && randomNumber<1){
        computerMove='Scissors';
    }
    return computerMove;
}

function scoreUpdate(){
    document.querySelector('.js-score').innerHTML=`Wins:${score.wins} Loss:${score.loss} Ties:${score.ties}`;
}