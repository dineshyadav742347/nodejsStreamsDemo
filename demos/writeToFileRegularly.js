const path = require('path');
const fs = require('fs');
const numberToWords = require('number-to-words');

let number = 0, limit = 1000000, str = '';
while( number <= limit) {
	str += `${number} : ${numberToWords.toWords(number)}\n`;
	number++;
}

const generatedFile = path.resolve(__dirname, 'generated_regular.log');
fs.writeFile(generatedFile, str, 'utf8', (err, result) => {
	if(err) return console.log("Error in writing, ", err);
	console.log("Saved ", result);
});
