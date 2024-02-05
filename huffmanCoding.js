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

function buildHuffmanTree(charCounts){
    const tree = [];
    for (const char in charCounts) {
        tree.push(new HuffmanTree(char, charCounts[char]));
    }
    while(tree.length > 1){
        tree.sort((a,b) => a.freq - b.freq);
        const left = tree.shift();
        const right = tree.shift();
        const parent = new HuffmanTree(null, left.freq + right.freq, left, right);
        tree.push(parent);
    }
    return tree[0];
}