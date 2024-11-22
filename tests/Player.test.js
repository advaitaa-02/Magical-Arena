const Player = require('../Player');

describe('Player Class', () => {
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
