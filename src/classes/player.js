const Board = require('./gameboard')

class Player {
    constructor(name, type){
        this.name = name
        this.type = type
        this.turn = false
        this.board = new Board()
    }

    getBoard(){
        return this.board.board
    }

    Attack(opponent, x, y){
        return opponent.board.receiveAttack(x, y)
    }

    placeShip(){
        return this.board.placeShips()
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

    _getCoordinates(){
        return Math.floor(Math.random() * 9)
    }

    makeMove(opponent){
        let x, y, attack
        do{
            x = this._getCoordinates()
            y = this._getCoordinates()

            attack = this.Attack(opponent, x, y)
        }while(attack === 'You already attacked this point.')

        return [attack, x, y]
    }
}

module.exports = {Player, humanPlayer, computerPlayer}