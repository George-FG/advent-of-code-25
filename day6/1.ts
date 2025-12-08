import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const evaluate = (currentTotal: number, n: number, symbol: string) => {
    switch (symbol) {
        case '+':
            return currentTotal + n;
        case '*':
            return currentTotal * n;
        default:
            return currentTotal;
    }
}



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const lines = input.split('\n');

const operatorString = lines.splice(-1, 1)[0];

const operators: string[] = [];
for (let s of operatorString) {
    if (['+', '*'].includes(s)) {
        operators.push(s);
    }
}

const rowResults: number[] = lines.map((v, i) => 0);

let count = 0;
let firstPass = true;
let currentNumber = "";
for (let line of lines){
    line += ' '; //to handle last number
    count = 0;
    for (let s of line) {
        if (!s.trim() && currentNumber.trim()) { //end of number
            if (firstPass) {
                rowResults[count] = Number(currentNumber);
            }
            else {
                rowResults[count] = evaluate(rowResults[count], Number(currentNumber), operators[count]);
            }
            
            currentNumber = "";
            count++;
        }else {
            currentNumber += s;
        }
        
    }
    firstPass = false;
}

console.log(rowResults.reduce((a, b) => a + b, 0));
