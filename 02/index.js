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
            let cubes = parseInt(col[1]);
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

const res = compatibleGame.map(g => parseInt(g)).reduce((s, a) => s + a, 0);

console.log(res);

// part 2 ---------------------------------------

let res2 = 0;
input.forEach((game) => {
    const temp = game.split(":");
    const gameID = temp[0].split(' ')[1];
    let lowest_blue = 0;
    let lowest_green = 0;
    let lowest_red = 0;

    let gamesets = temp[1].split(';');
    gamesets.forEach((gameset) => {
        let colors = gameset.split(',');
        colors.forEach(color => {
            let col = color.split(' ');
            let currentColor = col[2];
            let cubes = parseInt(col[1]);
            switch (currentColor) {
                case 'blue':
                    if (cubes > lowest_blue) {
                        lowest_blue = cubes;
                    }
                    break;
                case 'red':
                    if (cubes > lowest_red) {
                        lowest_red = cubes;
                    }
                    break;
                case 'green':
                    if (cubes > lowest_green) {
                        lowest_green = cubes;
                    }
                    break;
            }

        })

    })

    console.log(gameID, 'lowest_green', lowest_red + ' red', lowest_green + ' green', lowest_blue + ' blue', lowest_green * lowest_blue * lowest_red)
    res2 += (lowest_green * lowest_blue * lowest_red)
})
console.log(res2);
