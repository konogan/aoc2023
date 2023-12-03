const path = require('path');
const fs = require('fs');
const {createCanvas} = require('canvas')
const CELL_SIZE = 10;

const lines = fs
    .readFileSync(path.join(__dirname, '01t.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

function isDigit(char) {
    return /^\d+$/.test(char);
}

let puzzle = [];
let maxX = 0;
let maxY;

maxY = lines.length;
for (let y = 0; y < lines.length; y++) {
    let line = lines[y].split('');
    puzzle[y] = [];
    maxX = line.length;
    for (let x = 0; x < line.length; x++) {
        let det = line[x];
        puzzle[y][x] = {
            val: det
        }
    }
}

const width = maxX * CELL_SIZE
const height = maxY * CELL_SIZE
const canvas_part1 = createCanvas(width, height)
const part1 = canvas_part1.getContext('2d')

let numbers = [];
for (let y = 0; y < maxY; y++) {
    let prevIsDigit = false;
    let currentNumber = '';
    let startX = 0;
    let startY = 0;
    for (let x = 0; x < maxX; x++) {
        let current = puzzle[y][x].val;

        //debug draw CELLLS
        part1.fillText(current, x * CELL_SIZE, y * CELL_SIZE + CELL_SIZE, CELL_SIZE);

        if (isDigit(current)) {
            currentNumber += current;
            if (!prevIsDigit) {
                startX = x;
                startY = y;
            }
            prevIsDigit = true;
        }
        let nextChar = puzzle[y][x + 1]?.val;
        if (!isDigit(nextChar)) {
            if (currentNumber !== "") {
                numbers.push({
                    num: currentNumber,
                    x: startX,
                    y: startY
                })
            }
            startX = 0;
            startY = 0;
            prevIsDigit = false;
            currentNumber = "";
        }
    }
}

console.log(numbers);

//*** part 1 **/

let results = [];
let invalids = [];

for (let i = 0; i < numbers.length; i++) {
    const candidate = numbers[i];
    let min_x = candidate.x - 1;
    let min_y = candidate.y - 1;
    let max_y = candidate.y + 1;
    let max_x = candidate.x + candidate.num.length + 1;
    let valid = false;

    part1.strokeStyle = "black";
    part1.lineWidth = 1;
    part1.strokeRect(min_x * CELL_SIZE, min_y * CELL_SIZE, (candidate.num.length + 2) * CELL_SIZE, CELL_SIZE * 3);

    for (let y = min_y; y <= max_y; y++) {
        for (let x = min_x; x < max_x; x++) {
            //limit on board
            if (y >= 0 && y <= maxY && x >= 0 && x << maxX && puzzle[y] && puzzle[y][x]) {
                // don't test the number itself
                if (x >= candidate.x && x < candidate.x + candidate.num.length && y === candidate.y) {
                    // part1.fillStyle = 'rgba(0,0,255,0.1)';
                    // part1.fillRect(candidate.x * CELL_SIZE, candidate.y * CELL_SIZE, candidate.num.length * CELL_SIZE, CELL_SIZE);
                } else {
                    // part1.fillStyle = 'rgba(0,255,255,0.5)';
                    // part1.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                    if (puzzle[y][x].val !== ".") {
                        valid = true;
                        // part1.fillStyle = 'rgba(0,255,0,0.5)';
                        // part1.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                    } else {
                        // part1.fillStyle = 'rgba(255,0,0,0.5)';
                        //part1.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                    }
                }
            }
        }
    }

    if (valid) {
        results.push(parseInt(candidate.num));

    } else {
        invalids.push(parseInt(candidate.num));
        part1.fillStyle = 'rgba(255,0,0,0.5)';
        part1.fillRect(min_x * CELL_SIZE, min_y * CELL_SIZE, (candidate.num.length + 2) * CELL_SIZE, CELL_SIZE * 3);
    }
}
const buffer = canvas_part1.toBuffer('image/png')
fs.writeFileSync(path.join(__dirname, '03_01.png'), buffer);

let res = results.reduce((s, a) => s + a, 0);
console.log('Part 1 : ' + res);

//*** part 2 **/
let gears = {};
let ratios = [];

for (let i = 0; i < numbers.length; i++) {
    const candidate = numbers[i];
    let min_x = candidate.x - 1;
    let min_y = candidate.y - 1;
    let max_y = candidate.y + 1;
    let max_x = candidate.x + candidate.num.length + 1;

    for (let y = min_y; y <= max_y; y++) {
        for (let x = min_x; x < max_x; x++) {
            if (y >= 0 && y <= maxY && x >= 0 && x << maxX && puzzle[y] && puzzle[y][x]) {
                //limit on board
                if (x >= candidate.x && x < candidate.x + candidate.num.length && y === candidate.y) {
                    // don't test the number itself
                } else {
                    if (puzzle[y][x].val === "*") {
                        let k = `${x}_${y}`;
                        if (gears[k]) {
                            ratios.push(parseInt(gears[k]) * candidate.num);
                        } else {
                            gears[k] = [];
                        }
                        gears[k].push(candidate.num);
                    }
                }
            }
        }
    }
}

let res2 = ratios.reduce((s, a) => s + a, 0);
console.log('Part 2 : ' + res2);



