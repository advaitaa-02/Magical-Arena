const Die = require('./Die');

class Match {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.die = new Die();
    }

    start() {
        while (this.player1.isAlive() && this.player2.isAlive()) {
            const attacker = this.player1.health < this.player2.health ? this.player1 : this.player2;
            const defender = attacker === this.player1 ? this.player2 : this.player1;

            this.fightRound(attacker, defender);

            console.log(`${attacker.name} attacks ${defender.name}`);
            console.log(`${this.player1.name} health: ${this.player1.health}, ${this.player2.name} health: ${this.player2.health}`);
            console.log('--------------------------------------------');
        }

        const winner = this.player1.isAlive() ? this.player1 : this.player2;
        console.log(`${winner.name} wins the match!`);
    }

    fightRound(attacker, defender) {
        const attackRoll = this.die.roll();
        const defendRoll = this.die.roll();

        const attackValue = attacker.attack * attackRoll;
        const defendValue = defender.strength * defendRoll;

        const damage = Math.max(attackValue - defendValue, 0);
        defender.takeDamage(damage);

        // Log the die rolls and calculated damage
        console.log(`Die rolls: ${attacker.name} (Attack Roll: ${attackRoll}) | ${defender.name} (Defense Roll: ${defendRoll})`);
        console.log(`Damage Calculated: ${attacker.name} attack value = ${attackValue}, ${defender.name} defend value = ${defendValue}`);
        console.log(`Actual Damage to ${defender.name}: ${damage}`);
    }
}

module.exports = Match;
