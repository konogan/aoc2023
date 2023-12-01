const path = require('path');
const fs = require('fs');
const {parse} = require("nodemon/lib/cli");

const input = fs
    .readFileSync(path.join(__dirname, '01.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

//-************

let res1 = 0

input.forEach(line => {
    const digits = line
        .split('')
        .filter(c => !isNaN(parseInt(c)));

    let firstItem = (digits[0]);
    let lastItem = (digits[digits.length - 1]);
    let sum = parseInt(firstItem + lastItem);
    res1 += sum;
})

console.log(`Part 1  "${res1}"`);

//-************

const digitsA = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const digitsN = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

let res2 = 0

let processLine = (line) => {
    let firstPosition = 9999999
    let firstPositionValue = ''
    let lastPosition = -99999
    let lastPositionValue = ''
    digitsA.forEach((di, idx) => {
        let pos = line.indexOf(di);
        if (pos !== -1) {
            if (pos < firstPosition) {
                firstPosition = pos;
                firstPositionValue = String(idx + 1)
            }
        }
        let lpos = line.lastIndexOf(di);
        if (lpos !== -1) {
            if (lpos > lastPosition) {
                lastPosition = lpos;
                lastPositionValue = String(idx + 1);
            }
        }
    })
    digitsN.forEach((di, idx) => {
        let pos = line.indexOf(di);
        if (pos !== -1) {
            if (pos < firstPosition) {
                firstPosition = pos;
                firstPositionValue = String(idx + 1)
            }
        }
        let lpos = line.lastIndexOf(di);
        if (lpos !== -1) {
            if (lpos > lastPosition) {
                lastPosition = lpos;
                lastPositionValue = String(idx + 1)
            }
        }
    })

    let sum = parseInt(firstPositionValue + lastPositionValue);
    return sum;
}

input.forEach(line => {
    let sum = processLine(line);
    res2 += sum;
})

console.log(`Part 2  "${res2}"`);