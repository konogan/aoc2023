const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, '01.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

const red = 12;
const green = 13;
const blue = 14;

// a game is describe like this :
// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green

let games = [];
let incompatibleGame = [];

input.forEach((game) => {
    const temp = game.split(":");
    const gameID = temp[0].split(' ')[1];
    games.push(gameID);
    let gamesets = temp[1].split(';');
    gamesets.forEach((gameset) => {
        let colors = gameset.split(',');
        colors.forEach(color => {
            let col = color.split(' ');
            let currentColor = col[2];
            let cubes = col[1];
            switch (currentColor) {
                case 'blue':
                    if (cubes > blue) {
                        incompatibleGame.push(gameID);
                    }
                    break;
                case 'red':
                    if (cubes > red) {
                        incompatibleGame.push(gameID);
                    }
                    break;
                case 'green':
                    if (cubes > green) {
                        incompatibleGame.push(gameID);
                    }
                    break;
            }
        })

    })
})

const compatibleGame = games.filter(i => !incompatibleGame.includes(i))

const res = compatibleGame.map(g=>parseInt(g)).reduce((s, a) => s + a, 0);

console.log(res);
