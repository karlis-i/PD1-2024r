//====================================================
//Function = generate a random number for dice roll
function rollDice(sides) {
    const result = Math.floor(Math.random() * sides) + 1;
    return result < 10 ? `0${result}` : result;
}

//Update the displayed dice type + roll result
function updateDiceResult(diceType, sides) {
    document.getElementById("dice-type").textContent = diceType;
    document.getElementById("dice-roll").textContent = rollDice(sides);
}
//====================================================
//Event listeners to the dice buttons
document.getElementById("d20-btn").addEventListener("click", function() {
    updateDiceResult("D20", 20);
});
document.getElementById("d12-btn").addEventListener("click", function() {
    updateDiceResult("D12", 12);
});
document.getElementById("d10-btn").addEventListener("click", function() {
    updateDiceResult("D10", 10);
});
document.getElementById("d8-btn").addEventListener("click", function() {
    updateDiceResult("D8", 8);
});
document.getElementById("d6-btn").addEventListener("click", function() {
    updateDiceResult("D6", 6);
});
document.getElementById("d4-btn").addEventListener("click", function() {
    updateDiceResult("D4", 4);
});
//====================================================
//(!)   : AI use
//Function - Character generation
function generateCharacter() {
    const classes = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];
    const races = ["Dragonborn", "Dwarf", "Elf", "Halfling", "Human", "Orc", "Tiefling", "Aasimar", "Gith", "Goblin", "Changeling"];
    const orders = ["LG", "NG", "CG", "LN", "TN", "CN", "LE", "NE", "CE"];

    //Name components
    const prefixes = ["Ara", "Bel", "Cor", "Dru", "Ela", "Fen", "Gal", "Har", "Ila", "Jan", "Kel", "Lor", "Mor", "Nor", "Ora", "Per", "Quin", "Riv", "Syl", "Ther", "Ul", "Vael", "Wyn", "Xan", "Yel", "Zor", "Lia", "Bri", "Ama", "Shi", "Tal"];
    const roots = ["dor", "wyn", "thar", "ion", "riel", "las", "gar", "vor", "rin", "dal", "mir", "tos", "shan", "dan", "lys", "ven", "tir", "myr", "thal", "lan", "sel", "nor", "ros", "loth", "ser", "dra", "vin", "mar", "cal", "tor"];
    const suffixes = ["ael", "is", "os", "yn", "ar", "or", "el", "is", "en", "as", "ir", "eth", "ian", "orn", "in", "or", "eth", "iel", "us", "al", "ias", "on", "er", "iel", "yr", "ian", "orn", "ra", "ara", "ina", "era", "el"];

    //Generate a random name using components
    const randomName = prefixes[Math.floor(Math.random() * prefixes.length)] +
      roots[Math.floor(Math.random() * roots.length)] +
      suffixes[Math.floor(Math.random() * suffixes.length)];

    //Update name field
    document.getElementById("name").textContent = randomName;

    // Randomly assign class, race, and order
    document.getElementById("class").textContent = classes[Math.floor(Math.random() * classes.length)];
    document.getElementById("race").textContent = races[Math.floor(Math.random() * races.length)];
    document.getElementById("order").textContent = orders[Math.floor(Math.random() * orders.length)];

    //Generate random stats
    const stats = generateStats();
    document.getElementById("strength").textContent = stats.strength;
    document.getElementById("dexterity").textContent = stats.dexterity;
    document.getElementById("constitution").textContent = stats.constitution;
    document.getElementById("wisdom").textContent = stats.wisdom;
    document.getElementById("charisma").textContent = stats.charisma;
    document.getElementById("intelligence").textContent = stats.intelligence;
}
//====================================================
//(!)   : AI use
//Function - Generate stats using point-buy system
//Source: https://www.skullsplitterdice.com/blogs/dnd/point-buy-5e
function generateStats(){
    const pointBuyTotal = 27;
    const statCosts = {8:0, 9:1, 10:2, 11:3, 12:4, 13:5, 14:7, 15:9};

    //Initial base stats
    const stats = {
        strength: 8,
        dexterity: 8,
        constitution: 8,
        wisdom: 8,
        charisma: 8,
        intelligence: 8
    };

    let pointsRemaining = pointBuyTotal;

    //Stat keys
    const statKeys = Object.keys(stats);

    //Randomly distribute points within 27-point limit
    while (pointsRemaining > 0) {
        //Select random stat to increase
        const randomStat = statKeys[Math.floor(Math.random() * statKeys.length)];
        const currentStatValue = stats[randomStat];

        //Check : can stat be increased?(max 15)
        if (currentStatValue < 15) {
            const nextValue = currentStatValue + 1;
            const costToUpgrade = statCosts[nextValue] - statCosts[currentStatValue];

            //Check : enough points to increase stat?
            if (pointsRemaining >= costToUpgrade) {
                stats[randomStat] = nextValue;
                pointsRemaining -= costToUpgrade;
            }
        }
    }

    return stats;
}
//====================================================
//Add event listener to generate button
document.querySelector(".generate-btn").addEventListener("click", generateCharacter);
//====================================================