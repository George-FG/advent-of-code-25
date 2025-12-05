import * as fs from 'fs';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const lines = input.split('\n');

let res = 0;

let removedAtleastOne = true;
while (removedAtleastOne) {
    removedAtleastOne = false;
    let found = [];

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++){
            let adj = 0;
            for (let dx = -1; dx <=1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    if (dx === 0 && dy === 0) continue;
                    const x = i + dx;
                    const y = j + dy;
                    if (x >= 0 && x < lines.length && y >= 0 && y < lines[i].length) {
                        if (lines[x][y] === '@') {
                            adj++;
                        }
                    }
                }
            }
            if (lines[i][j] === '@' && adj < 4) {
                res++;
                removedAtleastOne = true;
                found.push([i, j]);
            }
        }
    }
    for (const [i, j] of found) {
        lines[i] = lines[i].substring(0, j) + '.' + lines[i].substring(j + 1);
    }
}


console.log("res: ", res);