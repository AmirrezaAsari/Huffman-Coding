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