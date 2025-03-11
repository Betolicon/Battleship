const Board = require('./gameboard')

class Player {
    constructor(name, type){
        this.name = name
        this.type = type
        this.board = new Board()
    }

    getBoard(){
        return this.board.board
    }

    Attack(opponent, x, y){
        return opponent.board.receiveAttack(x, y)
    }

    placeShip(x, y, ship){
        return this.board.placeShips(x, y, ship)
    }
}

class humanPlayer extends Player{
    constructor(name){
        super(name, 'Human')
    }
}

class computerPlayer extends Player{
    constructor(){
        super('Bot', 'Computer')
    }

    makeMove(opponent){
        const x = this._getCoordinates()
        const y = this._getCoordinates()
        return this.Attack(opponent, x, y)
    }

    place(ship){
        do {
            var x = this._getCoordinates()
            var y = this._getCoordinates()  
        } while(Math.abs(x - y) !== ship.length)

    return this.placeShip(x, y, ship)
    }
    
    _getCoordinates(){
        return Math.floor(Math.random() * 9)
    }
}

module.exports = {Player, humanPlayer, computerPlayer}