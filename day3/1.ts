import * as fs from 'fs';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const lines = input.split('\n');

let res = 0;

lines.forEach(line => {
    let max = 0;
    const chars = line.split('');
    for (let i = 0; i < chars.length; i++) {
        for (let j = i + 1; j < chars.length; j++) {
            if (Number(chars[i] + chars[j]) > max) {
                max = Number(chars[i] + chars[j]);
            }
        }
    }
    res += max;
});

console.log("res: ", res);