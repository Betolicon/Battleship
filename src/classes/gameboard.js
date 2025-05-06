const Ship = require('./ship')

class Gameboard{
    constructor(){
        this.missedShots = []
        this.board = Array.from({ length: 9 }, () => Array(9).fill(null));
        this.ShipsSunk = []
        this.myShips = [{name: 'Aircraft Carrier', ship: new Ship('Aircraft Carrier', 5), coordinates: {}, orientation: ''},
                        {name: 'Battleship', ship: new Ship('Battleship', 4), coordinates: {}, orientation: ''},
                        {name: 'Cruiser', ship: new Ship('Cruiser', 3), coordinates: {}, orientation: ''},
                        {name: 'Submarine', ship: new Ship('Submarine', 3), coordinates: {}, orientation: ''},
                        {name: 'Destroyer', ship: new Ship('Destroyer', 2), coordinates: {}, orientation: ''}
        ]
    }

    _validate(coordinate) {
        return coordinate >= 0 && coordinate <= 8
    }
    
    _validateCoordinates(x, y, ship){
        if (!this._validate(x) || !this._validate(y)) 
            return false;
        if(Math.abs(x-y) !== ship.length)
            return false
        return true
    }

    _determineOrientation(ship){
        if(ship.length == 1)
            return 'Horizontal'
        return Math.floor(Math.random() * 2) == 1 ? 'Horizontal' : 'Vertical'
    }

    _valideteFit(x, y, ship, isHorizontal){
        const directionX = isHorizontal ? ship + y : y
        const directionY = isHorizontal ? x : ship + x

        if(directionX >= 9 || directionY >= 9)
            return false
        return true
    }

    _isEmpty(x, y, ship, isHorizontal){
        for (let i = 0; i < ship; i++) {
            const directionX = isHorizontal ? x : i + x
            const directionY = isHorizontal ? i + y : y
            if(this.board[directionX][directionY] !== null)
                return false
        }
        return true
    }

    _placeInTheBoard(x, y, ship, isHorizontal){
        for (let i = 0; i < ship.length; i++) {
            const directionX = isHorizontal ? x : i + x
            const directionY = isHorizontal ? i + y : y
            this.board[directionX][directionY] = ship
        }
    }
    _placeBoard(x, y, ship, orientation){
        const isHorizontal = orientation === 'Horizontal'
        if(!this._validateCoordinates(x, y, ship))
            return 'Ship not added'

        if(!this._valideteFit(x, y, ship.length, isHorizontal))
            return 'Invalid placement' 

        if(!this._isEmpty(x, y, ship.length, isHorizontal))
            return 'Invalid placement' 

        this._placeInTheBoard(x, y, ship, isHorizontal)

        const shipData = this.myShips.find(s => s.name === ship.name)
        if(shipData){
            shipData.coordinates = {x, y};
            shipData.orientation = orientation
        }
        return 'Ship added'
    }

    _getCoordinates(){
        return Math.floor(Math.random() * 9)
    }

    placeShips(){
        this.myShips.forEach(({ship}) =>{
            let x, y, orientation, validPlacement
            do {
                x = this._getCoordinates()
                y = this._getCoordinates()
                orientation = this._determineOrientation(ship)
                validPlacement = this._placeBoard(x, y, ship, orientation)
            } while (validPlacement === 'Invalid placement' || validPlacement === 'Ship not added');
        })      
    }

    _chekingAttack(x, y){
        if(this.board[x][y]){
                const shotStatus = this.board[x][y].shot;
        if (shotStatus === 'missed' || shotStatus === 'hit'){
            return true;
        }    
        return false
    }
    }

    _Attack(x, y){
        if(this.board[x][y] !== null){
            const ship = this.board[x][y]
            ship.hit()
            this.board[x][y] = {shot: 'hit', ship: ship};
            return true
        }
        return false
    }

    receiveAttack(x, y){
        if (!this._validate(x) || !this._validate(y))
            return false;

        if (this._chekingAttack(x, y))
            return 'You already attacked this point.'

        if(this._Attack(x, y))
            return 'Hit'

        this.missedShots.push({shot: 'missed', coordinates: {x, y}})
        this.board[x][y] = {shot: 'missed'};
        return 'Missed'
    }

    showShipsSunk(){
        for(const { ship } of this.myShips){
            if(ship.sunk){
                if(!this.ShipsSunk.includes(ship.name)){
                this.ShipsSunk.push(ship.name)
                return ship.name
                }
            }
        }
        return false
    }

    allShipsSunk(){
        return this.myShips.every(({ship}) => ship.sunk)
    }
}

module.exports = Gameboard