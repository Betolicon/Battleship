const {computerPlayer} = require('./classes/player')
const game = require('./classes/game')
const Game = new game()
const player2 = new computerPlayer()
player2.placeShip()

export function setName (player){
    const label = document.createElement('label') 
    label.innerText = `Player: ${player.name}`
    const playerdiv = document.getElementById('player1')
    playerdiv.append(label)
    player.placeShip()
    Game.addPlayers(player, player2)
    generateBoard(player)
}

const generateBoard = (player) =>{
    const gameboards = document.querySelectorAll('.gameboard')
    gameboards.forEach((gameboard, index) => {
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
    const currentPlayer = Game.players.findIndex(player => player.turn)
        if(currentPlayer === 0){
            console.log(player2.board.ShipsSunk)
        const attack = player.Attack(player2, cell.dataset.x, cell.dataset.y)
        attack === 'Hit' ? cell.style.backgroundColor = 'red': cell.style.backgroundColor = 'grey'
        messageShip(player, player2)
        messageWinner()
        }
        Game.switchTurns()  

    const nextPlayer = Game.players.find(player => player.turn && player.type === 'Computer')
        if(nextPlayer){
            setTimeout(() => {
                const attack = player2.makeMove(player)
                const cell = document.querySelector(`.cell[data-x="${attack[1]}"][data-y="${attack[2]}"]`);
                attack[0] === 'Hit' ? cell.style.backgroundColor = 'red': cell.style.backgroundColor = 'grey'
                messageShip(player2, player)
                messageWinner()
                Game.switchTurns()  
            }, 500);
        }
}

const messageWinner = () =>{
    const winner = Game.checkWinner()
    if(winner){
        const message = document.getElementById('alert')
        message.innerText = `${winner} has won`
        Game.players[0].turn = Game.players[1].turn = false
    }
}

const messageShip = (player, player1) =>{
    const message = document.getElementById('alert')
    const name = player1.board.showShipsSunk()
    if(name)
        message.innerText = `${player.name} has sunk ${name}`
}