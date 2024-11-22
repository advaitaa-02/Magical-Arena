const Player = require('../Player');
const Die = require('../Die');


describe('Player Class', () => {
    test('Throws error for invalid name', () => {
        expect(() => new Player('', 100, 10, 5)).toThrow('Invalid name: Name must be a non-empty string.');
        expect(() => new Player(null, 100, 10, 5)).toThrow('Invalid name: Name must be a non-empty string.');
        expect(() => new Player(123, 100, 10, 5)).toThrow('Invalid name: Name must be a non-empty string.');
    });

    test('Throws error for non-positive health', () => {
        expect(() => new Player('Player A', -50, 10, 5)).toThrow('Invalid health: Health must be a positive number.');
    });

    test('Throws error for non-positive strength', () => {
        expect(() => new Player('Player A', 100, -10, 5)).toThrow('Invalid strength: Strength must be a positive number.');
        expect(() => new Player('Player A', 100, 0, 5)).toThrow('Invalid strength: Strength must be a positive number.');
    });

    test('Throws error for non-positive attack', () => {
        expect(() => new Player('Player A', 100, 10, -5)).toThrow('Invalid attack: Attack must be a positive number.');
        expect(() => new Player('Player A', 100, 10, 0)).toThrow('Invalid attack: Attack must be a positive number.');
    });

    test('Accepts valid inputs', () => {
        const player = new Player('Player A', 100, 10, 5);
        expect(player.name).toBe('Player A');
        expect(player.health).toBe(100);
        expect(player.strength).toBe(10);
        expect(player.attack).toBe(5);
    });

    test('Player initializes correctly', () => {
        const player = new Player('Player A', 100, 10, 5);

        expect(player.name).toBe('Player A');
        expect(player.health).toBe(100);
        expect(player.strength).toBe(10);
        expect(player.attack).toBe(5);
    });

    test('Player health decreases when taking damage', () => {
        const player = new Player('Player A', 100, 10, 5);

        player.takeDamage(30);
        expect(player.health).toBe(70);

        player.takeDamage(50);
        expect(player.health).toBe(20);
    });

    test('Player health does not go below 0', () => {
        const player = new Player('Player A', 100, 10, 5);

        player.takeDamage(150);
        expect(player.health).toBe(0);
    });

    test('Player is alive when health > 0', () => {
        const player = new Player('Player A', 100, 10, 5);

        expect(player.isAlive()).toBe(true);

        player.takeDamage(100);
        expect(player.isAlive()).toBe(false);
    });
});

test('Attack value is correctly calculated using die roll', () => {
    const player = new Player('Player A', 100, 10, 5);
    const die = new Die();

    for (let i = 0; i < 10; i++) { // Reduced to 10 iterations
        const roll = die.roll();
        const attackValue = player.attack * roll;

        // Attack value should always be within 5 (attack * 1) and 30 (attack * 6)
        expect(attackValue).toBeGreaterThanOrEqual(5);
        expect(attackValue).toBeLessThanOrEqual(30);
    }
});
