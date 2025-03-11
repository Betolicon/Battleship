const {humanPlayer, computerPlayer} = require('./player')
const Ship = require('./ship')

test('It should exist', () => {
    expect(humanPlayer).toBeDefined()
})

test('It should exist', () => {
    expect(computerPlayer).toBeDefined()
})

test('It should record the shot as a missed', () => {
    const player1 = new humanPlayer('Alberto', 'Human')
    const player2 = new computerPlayer()
    expect(player1.Attack(player2, 1, 1)).toBe("Missed")
})

test('It should return the coordinates of the computer', () => {
    const player2 = new computerPlayer()
    const player1 = new humanPlayer('Alberto', 'Human')
    expect(player2.makeMove(player1)).toBe('Missed')
})

test('The player should place the ship in the gameboard', () => {
    const player1 = new humanPlayer('Alberto', 'Human')
    const ship = new Ship('Destroyer', 3)
    expect(player1.placeShip(8, 5, ship)).toBe('Ship added')
})

test('The computer should place the ship in the gameboard', () => {
    const player1 = new computerPlayer()
    const ship = new Ship('Destroyer', 3)
    expect(player1.place(ship)).toBe('Ship added')
})