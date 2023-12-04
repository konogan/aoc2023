const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, '01.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

let cardList = [];

input.forEach((line) => {
    let tmp = line.split(': ');
    let tmpNum = tmp[1].split('|');
    let winningNumbers = tmpNum[0]
        .split(' ')
        .map(n => n.trim())
        .filter(n => n !== '')
        .map(n => parseInt(n));
    let playedNumbers = tmpNum[1]
        .split(' ')
        .map(n => n.trim())
        .filter(n => n !== '')
        .map(n => parseInt(n));

    const winningNumbersFounds = playedNumbers
        .filter(function (n) {
            return winningNumbers.indexOf(n) > -1;
        }).sort();

    cardList.push({
        winningNumbersFounds: winningNumbersFounds,
        score: winningNumbersFounds.length ? Math.pow(2, winningNumbersFounds.length - 1) : 0,
        count: 1,
    });
});

// part 1 ---------------------------------------
const res = cardList.map(g => parseInt(g.score)).reduce((s, a) => s + a, 0);
console.log('Part 1 :' + res);

// part 2 ---------------------------------------
for (let i = 0; i < cardList.length; i++) {
    for (let j = 0; j < cardList[i].winningNumbersFounds.length; j++) {
        cardList[i + j + 1].count += cardList[i].count;
    }
}

const res2 = cardList.map(g => parseInt(g.count)).reduce((s, a) => s + a, 0);
console.log('Part 2 :' + res2);