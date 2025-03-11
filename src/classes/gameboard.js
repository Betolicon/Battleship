class Gameboard{
    constructor(){
        this.Ships = []
        this.missedShots = []
        this.board = Array.from({ length: 9 }, () => Array(9).fill(null));
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

    placeShips(x, y, ship){
        if(this._validateCoordinates(x, y, ship) && ship){
            if(x > y){
                for (let i = 0; i < ship.length; i++) {
                    if(this.board[x][y + i] !== null)
                        return 'Invalid placement'
                    else
                        this.board[x][y + i] = ship;
                }
            }
            else{
                for (let i = 0; i < ship.length; i++) {
                    if(this.board[x + i][y] === null)
                        this.board[x + i][y] = ship;
                    else
                        return 'Invalid placement'
                }
            }
            this.Ships.push({ship: ship, 
                coordinates: {x, y}})
            return 'Ship added'
        }
        return 'Ship not added'
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

        for (const {coordinates, ship} of this.Ships){
            if(x > y){
                for (let i = 0; i < ship.length; i++) {
                    if(coordinates.x == x && coordinates.y + i <= y){
                        ship.hit()
                    this.board[x][y] = {shot: 'hit', ship};
                    return 'Hit'
                }
                }
            }
            else{
                for (let i = 0; i < ship.length; i++) {
                    if(coordinates.x + i <= x && coordinates.y == y){
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

    allShipsSunk(){
        return this.Ships.map(({ship}) => ship).every(ship => ship.sunk === true)
    }
}

module.exports = Gameboard