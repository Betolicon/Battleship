const Ship = require('./ship')

test('It should exist', () => {
    expect(Ship).toBeDefined()
})

test('Its name should be "destroyer"', () => {
    const ship = new Ship("destroyer", 2)
    expect(ship.name).toBe('destroyer')
})

test('the length should be 2', () => {
    const ship = new Ship('hola', 2)
    expect(ship.length).toBe(2)
})

test('The ship should have received 3 attacks', () => {
    const ship = new Ship(5)
    ship.hit()
    ship.hit()
    ship.hit()
    expect(ship.hits).toBe(3)
})

test('The ship should be sunked', () => {
    const ship = new Ship('destroyer', 3)
    ship.hit()
    ship.hit()
    ship.hit()
    expect(ship.isSunk()).toBe(true)
})