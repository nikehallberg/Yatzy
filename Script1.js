
const dice = [1, 2, 3, 4, 5];
const heldDice = [false, false, false, false, false];
let rollCount = 0;
const maxRolls = 3;

const rollDiceButton = document.getElementById("rollDice");
const diceElements = [...document.querySelectorAll(".die")];
const scores = {
    ones: 0, twos: 0, threes: 0, fours: 0, fives: 0, sixes: 0,
    threeOfKind: 0, fourOfKind: 0, fullHouse: 0,
    smallStraight: 0, largeStraight: 0, yatzy: 0, chance: 0,
};
function isStraight(required) {
    const sorted = [...new Set(dice)].sort((a, b) => a - b);
    return sorted.join("").includes(required);
}

function calculateScore(category) {
    switch (category) {
        case "smallStraight": scores.smallStraight = isStraight("1234") ? 30 : 0; break;
        case "largeStraight": scores.largeStraight = isStraight("12345") ? 40 : 0; break;
    }
}

function calculateScore(category) {
    switch (category) {
        case "ones": scores.ones = dice.filter(d => d === 1).reduce((a, b) => a + b, 0); break;
        case "twos": scores.twos = dice.filter(d => d === 2).reduce((a, b) => a + b, 0); break;
        case "threeOfKind": scores.threeOfKind = hasNOfAKind(3) ? dice.reduce((a, b) => a + b, 0) : 0; break;
        default: break;
    }
    updateScoreboard();
}

function hasNOfAKind(n) {
    const counts = dice.reduce((acc, d) => { acc[d] = (acc[d] || 0) + 1; return acc; }, {});
    return Object.values(counts).some(count => count >= n);
}

function updateScoreboard() {
    for (const [key, value] of Object.entries(scores)) {
        document.getElementById(key).querySelector("span").textContent = value;
    }
}

function rollDice() {
    if (rollCount < maxRolls) {
        dice.forEach((_, i) => {
            if (!heldDice[i]) {
                dice[i] = Math.floor(Math.random() * 6) + 1;
            }
        });
        rollCount++;
        updateDiceUI();
    } else {
        alert("You've used all your rolls for this turn!");
    }
}

function toggleHold(index) {
    if (rollCount > 0) {
        heldDice[index] = !heldDice[index];
        updateDiceUI();
    }
}
function nextTurn() {
    if (rollCount === 0) {
        alert("You need to roll the dice at least once before ending your turn!");
        return;
    }
    resetDice();
    currentPlayer = currentPlayer % totalPlayers + 1;
    if (currentPlayer === 1) round++;
    document.getElementById("currentPlayer").textContent = `Player: ${currentPlayer}`;
    document.getElementById("round").textContent = `Round: ${round}`;
    checkGameOver();
}
function resetDice() {
    dice.fill(1);
    heldDice.fill(false);
    rollCount = 0;
    updateDiceUI();
}

function updateDiceUI() {
    diceElements.forEach((die, i) => {
        die.textContent = dice[i];
        die.style.backgroundColor = heldDice[i] ? "lightblue" : "white"; 
    });
}

diceElements.forEach((die, i) => {
    die.addEventListener("click", () => toggleHold(i));
});

rollDiceButton.addEventListener("click", rollDice);
nextTurnButton.addEventListener("click", nextTurn);
