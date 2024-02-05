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

function generateCodes(tree, code="", codes={}){
    if(!tree) return;
    if(tree.data){
        codes[tree.data] = code;
    }
    else{
        generateCodes(tree.left, code + "0", codes);
        generateCodes(tree.right, code + "1", codes);
    }
}

function encodeFile(filePath){
    const charCounts = countCharacters(filePath);
    const tree = buildHuffmanTree(charCounts);
    const codes = {};
    generateCodes(tree, '', codes);

    const text = fs.readFileSync(filePath, 'utf-8');
    let encodedText = "";

    for (const char of text) {
        encodedText += codes[char];
    }

    fs.writeFileSync('compressed.huf', encodedText);
}

const filePath = "test.txt";
encodeFile(filePath);
