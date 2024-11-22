class Player {
    constructor(name, health, strength, attack) {
        if (typeof name !== 'string' || name.trim() === '') {
            throw new Error('Invalid name: Name must be a non-empty string.');
        }

        if (typeof health !== 'number' || health < 0) {
            throw new Error('Invalid health: Health must be a positive number.');
        }

        if (typeof strength !== 'number' || strength < 0) {
            throw new Error('Invalid strength: Strength must be a positive number.');
        }

        if (typeof attack !== 'number' || attack < 0) {
            throw new Error('Invalid attack: Attack must be a positive number.');
        }

        this.name = name;
        this.health = health;
        this.strength = strength;
        this.attack = attack;
    }

    isAlive() {
        return this.health > 0;
    }

    takeDamage(damage) {
        this.health = Math.max(this.health - damage, 0);
    }
}

module.exports = Player;
