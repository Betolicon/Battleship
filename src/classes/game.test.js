const Player = require('./player')
const Game = require('./game')
const Ship = require('./ship')
const { default: expect } = require('expect')

test('It should exist', () => {
    expect(Game).toBeDefined()
})

test('It should add both players', () => {
    const game = new Game()
    const player1 = new Player.humanPlayer('Albert0')
    const player2 = new Player.computerPlayer()
    expect(game.addPlayers(player1, player2)).toBe('Players added correctly')
})

test('Player 1 should win', () => {
    const game = new Game()
    const player1 = new Player.humanPlayer('Albert0')
    const player2 = new Player.computerPlayer()
    const ship1 = new Ship('destroyer', 1)
    game.addPlayers(player1, player2)
    player1.placeShip(1, 0, ship1)
    player2.Attack(player1, 1, 0)
    expect(game.checkWinner()).toBe('Albert0')
})

test('Player 2 should win', () => {
    const game = new Game()
    const player1 = new Player.humanPlayer('Albert0')
    const player2 = new Player.computerPlayer()
    const ship1 = new Ship('destroyer', 1)
    const ship2 = new Ship('destroyer', 1)
    game.addPlayers(player1, player2)
    player1.placeShip(1, 0, ship1)
    player2.placeShip(0, 1, ship2)
    player2.Attack(player1, 1, 0)
    expect(game.checkWinner()).toBe('Bot')
})