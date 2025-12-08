import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
let lines = input.split('\n');



const operatorString = lines.splice(-1, 1)[0];

const operators: string[] = [];
for (let s of operatorString) {
    if (['+', '*'].includes(s)) {
        operators.push(s);
    }
}


const rowNumbers: string[][] = [];

lines = lines.map((v) => " " + v);
let currentNumberLevel = 0; // 0 -> units, 1 -> tens etc
let currentSet = 0;
for (let i = lines[0].length; i >= 0; i--) {
    if (lines.some((line) => line[i] !== undefined && line[i].trim())) {
        lines.forEach((line) => {
            if (line[i] !== undefined && line[i].trim()){
                if (!rowNumbers[currentSet]) {
                    rowNumbers[currentSet] = [];
                }
                if (!rowNumbers[currentSet][currentNumberLevel]) {
                    rowNumbers[currentSet][currentNumberLevel] = "";
                }
                rowNumbers[currentSet][currentNumberLevel] += line[i];
            }
        })
        currentNumberLevel++;
    } else if (currentNumberLevel > 0) {
        currentNumberLevel = 0;
        currentSet++;
    }
}

rowNumbers.forEach((row, i) => {
            rowNumbers[i] = row.map((n) => Number(n).toString());
        });

const res: number[] = [];
for (let i = 0; i < rowNumbers.length; i++) {
    if (operators[operators.length - 1 - i] === '+') {
        res.push(rowNumbers[i].reduce((a, b) => Number(a) + Number(b), 0));
    } else {
        res.push(rowNumbers[i].reduce((a, b) => Number(a) * Number(b), 1));
    }
}


console.log(res.reduce((a, b) => a + b, 0));
