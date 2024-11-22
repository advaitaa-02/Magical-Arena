const Die = require('../Die');

describe('Die Class', () => {
    test('Die roll generates a value between 1 and 6', () => {
        const die = new Die();

        for (let i = 0; i < 10; i++) {
            const roll = die.roll();
            expect(roll).toBeGreaterThanOrEqual(1);
            expect(roll).toBeLessThanOrEqual(6);
        }
    });

});
