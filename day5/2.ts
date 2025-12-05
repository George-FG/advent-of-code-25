import * as fs from 'fs';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const lines = input.split('\n');
const [left, right] = input.split('\n\n');
const ranges = left.split('\n');

let res = 0;

let rangesFound = [];

ranges.forEach(range => {
    let [min, max] = range.split('-').map(Number);
    let shouldAdd = true;
    let shouldRemoveRanges = [];
    rangesFound.forEach(({ l, r }) => {
        if (max < l || min > r) {
            //no overlap
        } else {
            if (min >= l && max <= r) {
                //inside
                shouldAdd = false;
            } else if (min < l && max >= l && max <= r) {
                //overlap left
                max = l - 1;
            } else if (min >= l && min <= r && max > r) {
                //overlap right
                min = r + 1;
            } else {
                //encompasss
                shouldRemoveRanges.push({ l, r });
            }
            
        }
    });
    if (shouldAdd) {
        rangesFound.push({ l: min, r: max });
        rangesFound = rangesFound.filter(({ l, r }) => {
            return !shouldRemoveRanges.some(rem => rem.l === l && rem.r === r);
        });
    }
});

rangesFound.forEach(({ l, r }) => {
    res += (r - l + 1);
});


console.log("res: ", res);