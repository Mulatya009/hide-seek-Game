const hideSeek = {
    "choices": {'one': '#choice-one', 'two': '#choice-two', 'three': '#choice-three', 'four': '#choice-four'},
    "div": ['divOne', 'divTwo', 'divThree', 'divFour'],
    "cars": ['car1', 'car2', 'car3', 'car4', 'car5', 'car6', 'car7', 'car8', 'car9', 'car10', 'car11', 'car12', 'car13', 'car14', 'car15', 'car16', 'car17', 'car18', 'car19', 'car20'],
    "trials": 0,
    "car": '',
    "wins": 0,
    "tryOver": false,
}

// Global Constants
const CHOICES = hideSeek['choices'];

// game sounds
const gameOverSound = new Audio('sounds/game over.wav')
const gameOnSound = new Audio('sounds/piano.mp3')

const choices = document.querySelector('#choices');
let choiceOne = document.querySelector('#choice-one');
let choiceTwo = document.querySelector('#choice-two');
let choiceThree = document.querySelector('#choice-three');
let choiceFour = document.querySelector('#choice-four');

// Event Listeners
eventListeners()
function eventListeners(){
    document.addEventListener('DOMContentLoaded', bringChoices);
    choices.addEventListener('click', myChoice);
    document.getElementById('re-try').addEventListener('click', reTry);
}

// Functions
function bringChoices(){
    choiceOne.classList = ('one', 'bg-dark');
    choiceTwo.classList = ('two', 'bg-dark');
    choiceThree.classList = ('three', 'bg-dark');
    choiceFour.classList = ('four', 'bg-dark');   
}

function myChoice(e){
    if(hideSeek['tryOver'] === false){
        gameOnSound.play();
        let playerSelect = playerChoice(e);
        let choiceDiv = randomDiv();
        let message = computeResults(playerSelect, choiceDiv);
        let car = randomCar();
        showResults(choiceDiv, car, message);
    }   
}

function randomDiv(){
    let randomIndexDiv = Math.floor(Math.random() * 4);
    return hideSeek['div'][randomIndexDiv];
}

function randomCar(){
    let randomIndexCar = Math.floor(Math.random() * 20 );
    return hideSeek['cars'][randomIndexCar];
}

function showResults(choiceDiv, car, message){
    hideSeek['car'] = car;
    let ansDiv = determineDiv(choiceDiv);
    
    let carImg = document.createElement('img');
    carImg.src = `photo/${car}.jpg`;
    carImg.classList.add('won');

    ansDiv.appendChild(carImg);

    choiceOne.classList.remove('bg-dark');
    choiceTwo.classList.remove('bg-dark');
    choiceThree.classList.remove('bg-dark');
    choiceFour.classList.remove('bg-dark');
    
    let div = document.getElementById('mess');
    div.classList.remove('bg-dark');
    div.classList.add('bg-secondary')
    let messageResults = document.querySelector('#message-results');
    messageResults.classList = ('py-1', 'text-white')
    messageResults.textContent = message;

    hideSeek['trials']++;
    
    generalResults();

    hideSeek['tryOver'] = true;

}

function determineDiv(choiceDiv){
    let ansDiv;
    if(choiceDiv === 'divOne'){
        ansDiv = choiceOne;
    }
    if(choiceDiv === 'divTwo'){
        ansDiv = choiceTwo; 
    }
    if(choiceDiv === 'divThree'){
        ansDiv = choiceThree;
    }
    if(choiceDiv === 'divFour'){
        ansDiv = choiceFour;
    }
    return ansDiv;
}

function playerChoice(e){
    let playerChoiceDiv;
    playerChoiceDiv = e;
    playerChoiceDiv = e.target;
    playerChoiceDiv = e.target.id;

    return playerChoiceDiv;
}

function computeResults(playerSelect, choiceDiv){
    
    let message, messageColor;

    // case when you select one *4
    if(playerSelect === 'choice-one' ){
        if( choiceDiv === 'divOne'){
            message = 'You Won a car!!!';;
            hideSeek['wins']++;
        }
        if( choiceDiv === 'divTwo'){
            message = 'You Failed!!!'
        }
        if( choiceDiv === 'divThree'){
            message = 'You Failed!!!'
        }
        if( choiceDiv === 'divFour'){
            message = 'You Failed!!!'
        }        
    }
    // case when you select two *4
    if(playerSelect === 'choice-two' ){
        if( choiceDiv === 'divOne'){
            message = 'You Failed!!!'
        }
        if( choiceDiv === 'divTwo'){
            message = 'You Won a car!!!';
            hideSeek['wins']++;
        }
        if( choiceDiv === 'divThree'){
            message = 'You Failed!!!'
        }
        if( choiceDiv === 'divFour'){
            message = 'You Failed!!!'
        }        
    }
    // case when you select three *4
    if(playerSelect === 'choice-three' ){
        if( choiceDiv === 'divOne'){
            message = 'You Failed!!!'
        }
        if( choiceDiv === 'divTwo'){
            message = 'You Failed!!!'
        }
        if( choiceDiv === 'divThree'){
            message = 'You Won a car!!!';
            hideSeek['wins']++;
        }
        if( choiceDiv === 'divFour'){
            message = 'You Failed!!!'
        }        
    }
    // case when you select four *4
    if(playerSelect === 'choice-four' ){
        if( choiceDiv === 'divOne'){
            message = 'You Failed!!!'
        }
        if( choiceDiv === 'divTwo'){
            message = 'You Failed!!!'
        }
        if( choiceDiv === 'divThree'){
            message = 'You Failed!!!'
        }
        if( choiceDiv === 'divFour'){
            message = 'You Won a car!!!';
            hideSeek['wins']++;
        }        
    }

    return message;
        
} 

function reTry(){ 
    hideSeek['tryOver'] = false;
    let wonCar = document.querySelector('.won');
    wonCar.remove();

    choiceOne.classList.add('bg-dark');
    choiceTwo.classList.add('bg-dark');
    choiceThree.classList.add('bg-dark');
    choiceFour.classList.add('bg-dark');

    let div = document.getElementById('mess');
    div.classList.remove('bg-secondary');
    div.classList.add('bg-dark');
    let messageResults = document.querySelector('#message-results');
    messageResults.classList = ('py-1', 'text-white')
    messageResults.textContent = 'Unlock your car';

}

function generalResults(){
    document.querySelector('#trials').textContent = hideSeek['trials'];
    document.querySelector('#wins').textContent = hideSeek['wins'];
    document.querySelector('#fails').textContent = hideSeek['trials'] - hideSeek['wins'];

    gameOver();
}

function gameOver(){
    if (hideSeek['trials'] <= 4){
        displayGameOverResults();
    }     
}

function displayGameOverResults(){
    const wrapper = document.querySelector('#cover');
    const header = 'GAME OVER';
    let message, messageColor, btnText;    

    if(hideSeek['wins'] === 0) {
        console.log('continue')
        
    }
    else if (hideSeek['wins'] === 1){
        message = 'CONGRATS, You unlocked this beautiful car' + ' ' + hideSeek['trials'] + ' ' + 'trial(s)';
        messageColor = 'text-success';
        btnText = 'Play again?';
        gameOnSound.pause();
        gameOverSound.play();

        wrapper.innerHTML = `
            <div id="cover-wrapper" class="text-center pt-4" style="background-color: rgba(230, 230, 230, .94158989);">
                <h1>${header}</h1><br>
                <h4 class="${messageColor}">${message}</h4><br>
                <img style="height: 250px; width: 400px;" src="photo/${hideSeek['car']}.jpg"><br>
                <button class="btn btn-block btn-info" onClick="playAgain()">${btnText}</button>
            </div>
        `;
        
    }
    if (hideSeek['trials'] === 3 && hideSeek['wins'] === 0){
        message = 'SORRY, Your trials are out!';
        messageColor = 'text-danger';
        btnText = 'Hey! ... Try again?';
        gameOnSound.pause();
        gameOverSound.play();

        wrapper.innerHTML = `
            <div id="cover-wrapper" class="text-center pt-5" style="background-color: rgba(230, 230, 230, .94158989);">
                <h1>${header}</h1><br>
                <h4 class="${messageColor}">${message}</h4><br>
                <button class="btn btn-block btn-info" onClick="playAgain()">${btnText}</button>
            </div>
        `;
    }

}

function playAgain(){
    window.location.reload();
}
