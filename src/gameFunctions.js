const {computerPlayer} = require('./classes/player')
const game = require('./classes/game')
const Game = new game()
const player2 = new computerPlayer()
let humanPlayer = ''

export function setName (player){
    humanPlayer = player
    const label = document.createElement('label')
    label.innerText = `Player: ${player.name}`
    const playerdiv = document.getElementById('player1')
    playerdiv.append(label)
    Game.addPlayers(player, player2)
    generateBoard(player)
}

const generateBoard = (player) =>{
    const gameboards = document.querySelectorAll('.gameboard')
    gameboards.forEach((gameboard, index) => {
        gameboard.innerHTML = '';
    for(let i = 0; i < 9; i++){
        const row = document.createElement('div')
        row.classList.add('row')
        gameboard.append(row)
        for(let j = 0; j < 9; j++){
            const cell = document.createElement('div')
            cell.classList.add('cell')
            cell.dataset.x = i
            cell.dataset.y = j
            if(index === 1)
                cell.addEventListener('click', () => {
                    sendAttack(cell, player)
                }, {once: true});
            row.append(cell)
        }
    }
    })
}

function sendAttack(cell, player) {
    if(Game.match){
        const attack = player.Attack(player2, cell.dataset.x, cell.dataset.y)
        attack === 'Hit' ? cell.style.backgroundColor = 'red': cell.style.backgroundColor = 'grey'
        messageShip(player, player2)
        messageWinner()
    }
    
    if(Game.match){
        setTimeout(() => {
            const attack = player2.makeMove(player)
            const cell = document.querySelector(`.cell[data-x="${attack[1]}"][data-y="${attack[2]}"]`);
            attack[0] === 'Hit' ? cell.style.backgroundColor = 'red': cell.style.backgroundColor = 'grey'
            messageShip(player2, player)
            messageWinner()
        }, 500);
    }
}

const messageWinner = () =>{
    const winner = Game.checkWinner()
    if(winner){
        const message = document.getElementById('alert')
        message.innerText = `${winner.name} has lost`
        const button = document.getElementById('restart')
        button.addEventListener('click', restartGame)
        button.style.opacity = '1'
        button.style.cursor = 'pointer'
    }
}

const messageShip = (player, player1) =>{
    const message = document.getElementById('alert')
    const name = player1.board.showShipsSunk()
    if(name)
        message.innerText = `${player.name} has sunk ${name}`
}

const restartGame = () =>{
    const button = document.getElementById('restart')
    button.removeEventListener('click', restartGame)
    button.style.opacity = 0
    button.style.cursor = 'default'
    const message = document.getElementById('alert')
    message.innerText = ''
    const playerDiv = document.getElementById('player1');
    const label = playerDiv.querySelector('label'); 
    if (label) 
        playerDiv.removeChild(label); 
    Game.restart()
    setName(humanPlayer)
}