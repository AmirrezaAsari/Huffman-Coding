const fs = require("fs");
const HuffmanTree = require("./tree");



function countCharacters(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    const charCounts = {};

    for (let i = 0; i < data.length; i++) {
        const char = data[i];
        if (!charCounts[char]) {
            charCounts[char] = 0;
        }
        charCounts[char]++;
    }
    
    return charCounts;
}
