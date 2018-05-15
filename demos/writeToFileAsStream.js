const path = require('path');
const fs = require('fs');
const numberToWords = require('number-to-words');

const generatedFile = path.resolve(__dirname, 'generated.log');
let writeFS = fs.WriteStream(generatedFile, 'utf8');

let number = 0, limit = 1000000;
while( number <= limit) {
	writeFS.write(`${number} : ${numberToWords.toWords(number)}\n`);
	number++;
}
writeFS.end();