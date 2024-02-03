const fs = require("fs");

function readFile(filePath) {
    try {
        const fileData = fs.readFileSync(filePath, "utf-8");
        return fileData;
    } catch (err) {
        console.error('Error reading the file:', err);
        throw err; // Re-throw the error to handle it outside the function
    }
}



let filePath = "test.txt";
console.log(readFile(filePath));

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

    console.log(charCounts);
}

countCharacters('myFile.txt');