import * as fs from 'fs';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const lines = input.split('\n');

let res = 0;

lines.forEach(line => {
    const chars = line.split('');
    const max = [];
    let start = 0;
    for (let remaining = 12; remaining > 0; remaining--) {
        let best = -1;
        let bestIndex = -1;
        for (let i = start; i <= chars.length - remaining; i++) {
            if (Number(chars[i]) > best){
                best = Number(chars[i]);
                bestIndex = i;
            }
        }
        max.push(String(best));
        start = bestIndex + 1;
    }
    res += Number(max.join(''))
});

console.log("res: ", res);