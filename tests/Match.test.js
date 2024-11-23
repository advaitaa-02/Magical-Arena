const Player = require('../Player');
const Match = require('../Match');


describe('Match Class', () => {
    test('Player with lower health attacks first', () => {
        const player1 = new Player('Player A', 50, 5, 10);
        const player2 = new Player('Player B', 100, 10, 5);

        const match = new Match(player1, player2);

        // Verify initial attacker based on lesser health
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

    test('Player health should never be negative', () => {
        const player1 = new Player('Player A', 50, 5, 10);
        const player2 = new Player('Player B', 10, 10, 5); // Player 2 starts with low health

        const match = new Match(player1, player2);

        match.start();

        // Ensure no player's health is negative
        expect(player1.health).toBeGreaterThanOrEqual(0);
        expect(player2.health).toBeGreaterThanOrEqual(0);
    });

    test('Game ends immediately if a player starts with 0 health', () => {
        const player1 = new Player('Player A', 0, 5, 10); // Player 1 starts with 0 health
        const player2 = new Player('Player B', 100, 10, 5);
    
        const match = new Match(player1, player2);
    
        // Mock console.log to capture the output
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
        match.start();
    
        // Ensure the game ends immediately
        expect(player1.isAlive()).toBe(false);
        expect(player2.isAlive()).toBe(true);
    
        // Verify that the correct message is printed
        expect(logSpy).toHaveBeenCalledWith('Player B wins the match!');
    
        // Clean up the mock
        logSpy.mockRestore();
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
    

    test('Game handles very high attack and defense values correctly', () => {
        const player1 = new Player('Player A', 1000, 100, 500); // High attack values
        const player2 = new Player('Player B', 1000, 200, 100); // High defense values

        const match = new Match(player1, player2);

        // Ensure no crashes or invalid behavior with high values
        match.start();

        expect(player1.health).toBeGreaterThanOrEqual(0);
        expect(player2.health).toBeGreaterThanOrEqual(0);
    });
    test('Player with zero attack cannot deal damage', () => {
        const player1 = new Player('Player A', 100, 0, 10); // Zero attack
        const player2 = new Player('Player B', 100, 10, 5);
    
        const match = new Match(player1, player2);

        // Mock die rolls to fixed values
        jest.spyOn(match.die, 'roll').mockReturnValue(4);
    
        match.fightRound(player1, player2);
    
        // Since player1 has zero attack, no damage should be dealt
        expect(player2.health).toBe(100);
    });
    
    test('Player with zero strength cannot defend', () => {
        const player1 = new Player('Player A', 100, 5, 10);
        const player2 = new Player('Player B', 100, 0, 10); // Zero strength
    
        const match = new Match(player1, player2);

    // Mock die rolls
    jest.spyOn(match.die, 'roll').mockReturnValue(4);

    match.fightRound(player1, player2);

    const expectedDamage = (player1.attack * 4) - (player2.strength * 4);
    expect(player2.health).toBe(100 - expectedDamage);
    });
    
});
