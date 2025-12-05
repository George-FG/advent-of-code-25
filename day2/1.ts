import * as fs from 'fs';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const ranges = input.split(',');

let res = 0;

ranges.forEach(range => {
    const [start, end] = range.split('-').map(n => Number(n));
    for (let i = start; i <= end; i++) {
        const s = String(i);
        const left = s.slice(0, s.length / 2);
        const right = s.slice(s.length / 2);
        if (left === right) {
            res += i;
        }
    }
});

console.log("res: ", res);