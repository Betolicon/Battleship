const Ship = require('./ship')
const Board = require('./gameboard')
const { default: expect } = require('expect')

test('It should exist', () => {
    expect(Board).toBeDefined()
})

test('The ship must be placed in the gameboard', () => {
    const ship = new Ship('destroyer', 3)
    const board = new Board()
    expect(board.placeShips(0, 3, ship)).toBe('Ship added')
})

test('The ship must not be placed in the gameboard', () => {
    const ship = new Ship('destroyer', 3)
    const board = new Board()
    expect(board.placeShips(0, 11, ship)).toBe('Ship not added')
})

test('The ship must be received the attack', () => {
    const ship = new Ship('destroyer', 3)
    const board = new Board()
    board.placeShips(0, 3, ship)
    expect(board.receiveAttack(1, 3)).toBe('Hit')
})

test('It should say that the user already attacked that point', () => {
    const ship = new Ship('destroyer', 3)
    const board = new Board()
    board.placeShips(0, 3, ship)
    board.receiveAttack(1, 3)
    expect(board.receiveAttack(1, 3)).toBe('You already attacked this point.')
})

test('Missed shot', () => {
    const board = new Board()
    board.receiveAttack(1,3)
    expect(board.receiveAttack(1,3)).toBe('You already attacked this point.')
})

test('All the ships are sunk', () => {
    const ship = new Ship('destroyer', 2)
    const board = new Board()
    board.placeShips(4, 2, ship)
    board.receiveAttack(4, 2)
    board.receiveAttack(4, 3)
    const ship2 = new Ship('defender', 2)
    board.placeShips(0, 2, ship2)
    board.receiveAttack(0, 2)
    board.receiveAttack(1, 2)
    expect(board.allShipsSunk()).toBe(true)
})

test('Invalid placement', () => {
    const ship = new Ship('destroyer', 2)
    const board = new Board()
    board.placeShips(4, 2, ship)
    const ship2 = new Ship('defender', 2)
    expect(board.placeShips(4, 2, ship2)).toBe('Invalid placement')
})