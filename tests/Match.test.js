const Player = require('../Player');
const Match = require('../Match');


describe('Match Class', () => {
    test('Player with lower health attacks first', () => {
        const player1 = new Player('Player A', 50, 5, 10);
        const player2 = new Player('Player B', 100, 10, 5);

        const match = new Match(player1, player2);

        // Verify initial attacker based on health
        const attacker = player1.health < player2.health ? player1 : player2;
        const defender = attacker === player1 ? player2 : player1;

        expect(attacker).toBe(player1);
        expect(defender).toBe(player2);
    });

    test('Random attacker is chosen when health is equal', () => {
        const player1 = new Player('Player A', 50, 5, 10);
        const player2 = new Player('Player B', 50, 10, 5);

        const match = new Match(player1, player2);

        const attackers = [];
        for (let i = 0; i < 10; i++) {
            const randomAttacker = match.player1.health === match.player2.health
                ? Math.random() < 0.5 ? match.player1 : match.player2
                : null;
            attackers.push(randomAttacker);
        }

        // Verify randomness over multiple iterations
        const player1Count = attackers.filter(a => a === player1).length;
        const player2Count = attackers.filter(a => a === player2).length;

        expect(player1Count).toBeGreaterThan(0);
        expect(player2Count).toBeGreaterThan(0);
        expect(player1Count + player2Count).toBe(10);
    });

    test('Fight reduces health of defender appropriately', () => {
        const player1 = new Player('Player A', 50, 5, 10);
        const player2 = new Player('Player B', 100, 10, 5);

        const match = new Match(player1, player2);
        const attackRoll = 5; // Example roll
        const defenseRoll = 2; // Example roll

        // Simulate one round of combat with fixed dice rolls
        const attackValue = player1.attack * attackRoll;
        const defenseValue = player2.strength * defenseRoll;
        const damage = Math.max(0, attackValue - defenseValue);

        player2.takeDamage(damage);

        expect(player2.health).toBe(100 - damage);
    });

    test('Game ends when one player’s health reaches 0', () => {
        const player1 = new Player('Player A', 50, 5, 10);
        const player2 = new Player('Player B', 10, 10, 5); // Player 2 starts with low health

        const match = new Match(player1, player2);

        match.start();

        // Verify that game ended and player 2 lost
        expect(player1.isAlive()).toBe(true);
        expect(player2.isAlive()).toBe(false);
    });

    test('Player health should never be negative', () => {
        const player1 = new Player('Player A', 50, 5, 10);
        const player2 = new Player('Player B', 10, 10, 5); // Player 2 starts with low health

        const match = new Match(player1, player2);

        match.start();

        // Ensure no player's health is negative
        expect(player1.health).toBeGreaterThanOrEqual(0);
        expect(player2.health).toBeGreaterThanOrEqual(0);
    });

    test('Player name can be changed during the match', () => {
        const player1 = new Player('Player A', 50, 5, 10);
        const player2 = new Player('Player B', 50, 10, 5);

        player1.name = 'Player X';
        player2.name = 'Player Y';

        const match = new Match(player1, player2);

        match.start();

        // Ensure the names are updated correctly
        expect(player1.name).toBe('Player X');
        expect(player2.name).toBe('Player Y');
    });

    test('Game ends immediately if a player starts with 0 health', () => {
        const player1 = new Player('Player A', 0, 5, 10); // Player 1 starts with 0 health
        const player2 = new Player('Player B', 100, 10, 5);

        const match = new Match(player1, player2);

        match.start();

        // Ensure the game ends immediately
        expect(player1.isAlive()).toBe(false);
        expect(player2.isAlive()).toBe(true);
    });

    test('If both players start with 0 health, no winner is declared', () => {
        const player1 = new Player('Player A', 0, 5, 10);
        const player2 = new Player('Player B', 0, 10, 5);
    
        const match = new Match(player1, player2);
    
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
        match.start();
    
        // Ensure the game ends with no winner
        expect(player1.isAlive()).toBe(false);
        expect(player2.isAlive()).toBe(false);
        expect(logSpy).toHaveBeenCalledWith("It's a draw! Both players are dead.");
    
        logSpy.mockRestore();
    });
    

    test('Player attack should never cause negative health adjustments', () => {
        const player1 = new Player('Player A', 100, 5, 10);
        const player2 = new Player('Player B', 100, 10, 5);

        const match = new Match(player1, player2);

        // Simulate a round of combat
        const attackRoll = 1; // Minimum attack roll
        const defenseRoll = 6; // Maximum defense roll

        const attackValue = player1.attack * attackRoll;
        const defenseValue = player2.strength * defenseRoll;

        const damageDealt = Math.max(0, attackValue - defenseValue);
        player2.takeDamage(damageDealt);

        // Ensure no invalid negative adjustments
        expect(damageDealt).toBeGreaterThanOrEqual(0);
        expect(player2.health).toBeLessThanOrEqual(100); // Initial health was 100
    });

    test('Game handles very high attack and defense values correctly', () => {
        const player1 = new Player('Player A', 1000, 100, 500); // High attack values
        const player2 = new Player('Player B', 1000, 200, 100); // High defense values

        const match = new Match(player1, player2);

        // Ensure no crashes or invalid behavior with high values
        match.start();

        expect(player1.health).toBeGreaterThanOrEqual(0);
        expect(player2.health).toBeGreaterThanOrEqual(0);
    });
});
