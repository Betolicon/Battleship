class Ship{
    constructor(name, length, hits = 0){
        this.name = name
        this.length = length
        this.hits = hits
        this.sunk = this.isSunk()
    }

    hit(){
        if(this.sunk === false){
            this.hits++
            this.isSunk()
        }
        return (this.hits)
    }

    isSunk(){
        if(this.hits === this.length){
            return (this.sunk = true)
        }
        return (this.sunk = false)
    }
}

module.exports = Ship