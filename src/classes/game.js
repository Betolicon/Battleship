class Game{
    constructor(){
        this.players = []
        this.match = true
    }

    addPlayers(player1, player2){
        if(player1 && player2){
            this.players.push(player1)
            this.players.push(player2)
            this.players[0].turn = true
            this._start()
            return 'Players added correctly'
        }
    }

    _start(){
        this.players.forEach((player) =>{
            player.placeShip()
        })
    }

    switchTurns(){
        const currentPlayer = this.players.findIndex(player => player.turn)
        if(currentPlayer !== -1){
            this.players[currentPlayer].turn = false
            const nextPlayer =(currentPlayer + 1) % this.players.length
            this.players[nextPlayer].turn = true
        }
    }

    restart(){
        this.players.forEach((player) => {
            player.board.missedShots = []
            player.board.board = Array.from({ length: 9 }, () => Array(9).fill(null));
            player.board.ShipsSunk = []

            for(const { ship } of player.board.myShips){
                ship.hits = 0
                ship.sunk = false
            }  
        })
        this.players = []
        this.match = true
    }

    checkWinner(){
        const loser = this.players.find(player => player.board.allShipsSunk())
        if(loser){
            this.match = false
            return loser
        }
        return null
    }
}

module.exports = Game