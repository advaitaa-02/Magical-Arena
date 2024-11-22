**Magical Arena**

**Description:**  
Magical Arena is a simple command-line game implemented in Node.js. In this game, two players engage in a battle using their health, strength, and attack attributes. Players take turns attacking and defending based on their attributes and dice rolls. The game ends when one player's health reaches zero.

**Project Structure:**  
MAGICAL_ARENA/  
├── Player.js  
├── Die.js  
├── Match.js  
├── index.js  
├── tests/  
│   ├── Player.test.js  
│   ├── Die.test.js  
│   ├── Match.test.js  
├── package.json  
├── package-lock.json  
├── README.md  


**Installation**  
After downloading the zip file, navigate to the project directory and install the required dependencies using:

Install dependencies:  
`npm install`  

Execute the following command to start the game:  

`node index.js`  

The project uses Jest for unit testing. To run all tests, use:  

`npm test`  

**Game Rules**
**Players:**
Each player has:  
**name**: The player's name (non-empty string).  
**health**: The player's health points (positive integer).  
**strength**: The player's defensive strength (positive integer).  
**attack**: The player's offensive attack power (positive integer).  
**Turn Order:**  
The player with lower health attacks first.  
If both players have equal health, the first attacker is chosen randomly.(**assumption by me**)  
**Combat Mechanics:**  
**Dice Rolls**: Both attack and defense use a 6-sided die (values 1-6).  
**Attack Value**: Calculated as attack * attack die roll.  
**Defense Value**: Calculated as strength * defense die roll.  
**Damage Dealt**: The defender's health decreases by max(0, attack value - defense value).  
**Winning the Game**:  
The game ends when one player's health reaches zero.  
If both players' health reaches zero simultaneously , the game is declared a draw.  