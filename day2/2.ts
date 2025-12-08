import * as fs from 'fs';

import path from 'path';
import { fileURLToPath } from 'url';


const getMultiples = (num: number): number[] => {
    const multiples: number[] = [];
    for (let i = 1; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            multiples.push(i);
            if (i !== num / i) {
                multiples.push(num / i);
            }
        }
    }
    return multiples;
};


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const ranges = input.split(',');

let res = 0;

ranges.forEach(range => {
    const [start, end] = range.split('-').map(n => Number(n));
    for (let i = start; i <= end; i++) {
        const s = String(i);
        let found = false;
        getMultiples(s.length).forEach(multiple => {
            if (multiple === 1) return;
            const slices: string[] = [];
            for (let j = 0; j < multiple; j++) {
                slices.push(s.slice(j * (s.length / multiple), (j + 1) * (s.length / multiple)));
            }
            if (!found && slices.every(slice => slice === slices[0])) {
                res += i;
                found = true;
            }
        });
        
    }
});

console.log("res: ", res);