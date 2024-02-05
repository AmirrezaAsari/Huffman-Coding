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
    const compressedData = Buffer.concat([Buffer.from(JSON.stringify(charCounts) + "\0"), Buffer.from(encodedText)]);
    fs.writeFileSync('compressed.cmp', compressedData);
}



function decodeFile(filePath){
    const compressedData = fs.readFileSync(filePath);
    const charCountsLastIndex = compressedData.indexOf(Buffer.from("\0"));
    const charCountsStr = compressedData.slice(0, charCountsLastIndex);
    const charCounts = JSON.parse(charCountsStr);
    const tree = buildHuffmanTree(charCounts);

    const encodedText = compressedData.slice(charCountsLastIndex + 1).toString('binary');
    let currentNode = tree;
    let decodedText = '';

    for (const bit of encodedText) {
        currentNode = bit === "0" ? currentNode.left : currentNode.right;
        if(currentNode.data){
            decodedText += currentNode.data;
            currentNode = tree;
        }

    }
    fs.writeFileSync("deCodedText.txt", decodedText);
    return decodedText;
}

module.exports = {encodeFile, decodeFile};
