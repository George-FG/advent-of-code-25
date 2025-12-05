import * as fs from 'fs';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const lines = input.split('\n');
const [left, right] = input.split('\n\n');
const ranges = left.split('\n');
const IDs = right.split('\n');

let res = 0;

IDs.forEach(id => {
    let valid = false;
    ranges.forEach(range => {
        const [min, max] = range.split('-').map(Number);
        const num = Number(id);
        if (!valid && num >= min && num <= max) {
            res++;
            valid = true;
        }
    });
});


console.log("res: ", res);