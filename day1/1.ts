import * as fs from 'fs';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const lines = input.split('\n')

let res = 0;
let count = 50;

for (let i = 0; i < lines.length; i++) {
    const dir = lines[i][0];
    const dist = parseInt(lines[i].slice(1), 10);
    if (dir === 'L') {
        count -= dist;
    } else if (dir === 'R') {
        count += dist;
    }
    count %= 100;
    if (count < 0) {
        count += 100;
    }
    if (count === 0) {
        res += 1;
    }
}

console.log("result: ", res);