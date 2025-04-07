class Game{
    constructor(){
        this.players = []
    }

    addPlayers(player1, player2){
        if(player1 && player2){
            this.players.push(player1)
            this.players.push(player2)
            this.players[0].turn = true
            return 'Players added correctly'
        }
    }

    switchTurns(){
        const currentPlayer = this.players.findIndex(player => player.turn)
        if(currentPlayer !== -1){
            this.players[currentPlayer].turn = false
            const nextPlayer =(currentPlayer + 1) % this.players.length
            this.players[nextPlayer].turn = true
        }
    }

    checkWinner(){
        const computer = this.players[1].board.allShipsSunk()
        const human = this.players[0].board.allShipsSunk()

        if(computer)
            return this.players[0].name
        else if (human)
            return this.players[1].name
    }
}

module.exports = Game