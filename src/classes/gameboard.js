const Ship = require('./ship')

class Gameboard{
    constructor(){
        this.Ships = []
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

    _placeBoard(x, y, ship, orientation){
        if(this._validateCoordinates(x, y, ship) && ship){
            if(orientation == 'Horizontal'){
                if(ship.length + y >= 9)
                    return 'Invalid placement'
                for (let i = 0; i < ship.length; i++) {
                    if(y + i >= 9 || this.board[x][y + i] !== null)
                        return 'Invalid placement'
                }
                for(let i = 0; i < ship.length; i++)
                    this.board[x][y + i] = ship;
            }
            else{
                if(ship.length + x >= 9)
                    return 'Invalid placement'
                for (let i = 0; i < ship.length; i++) {
                    if(x + i >= 9 || this.board[x + i][y] !== null)
                        return 'Invalid placement'
                }
                for(let i = 0; i < ship.length; i++)
                    this.board[x + i][y] = ship;
            }
            this.Ships.push({ship: ship, 
                coordinates: {x, y},
                orientation: orientation})
            return 'Ship added'
        }
        return 'Ship not added'
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

    receiveAttack(x, y){
        if (!this._validate(x) || !this._validate(y))
            return false;

        if (this._chekingAttack(x, y))
            return 'You already attacked this point.'

        for (const {coordinates, ship, orientation} of this.Ships){
            if(orientation === 'Horizontal'){
                for (let i = 0; i < ship.length; i++) {
                    if(coordinates.x == x && coordinates.y + i == y){
                        ship.hit()
                    this.board[x][y] = {shot: 'hit', ship};
                    return 'Hit'
                }
                }
            }
            else{
                for (let i = 0; i < ship.length; i++) {
                    if(coordinates.x + i == x && coordinates.y == y){
                        ship.hit()
                    this.board[x][y] = {shot: 'hit', ship};
                    return 'Hit'
                }
                }
            }
        }

        this.missedShots.push({shot: 'missed', coordinates: {x, y}})
        this.board[x][y] = {shot: 'missed'};
        return 'Missed'
    }

    showShipsSunk(){
        const ship =  this.Ships.map(({ship}) => ship)
                                .find(ship => ship.sunk)
        if(ship && this.ShipsSunk.includes(ship.name) === false){
            this.ShipsSunk.push(ship.name)
            return ship.name
        }
        return false
    }

    allShipsSunk(){
        return this.Ships.every(({ship}) => ship.sunk)
    }
}

module.exports = Gameboard