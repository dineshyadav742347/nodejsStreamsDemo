const path = require('path');
const fs = require('fs');

const matchesFile = path.resolve(__dirname, '..', 'mydata', 'matches.csv');

let s1 = fs.createReadStream(matchesFile, 'utf8');
let start = new Date().getTime();

console.log('Start: ', start);
s1.on('data', (chunk) => {
	console.log('.')
	// console.log(chunk);
});

let end = undefined;
s1.on('end', (chunk) => {
	end = new Date().getTime();
	console.log('end: ', end);
	console.log('duration: ', (end - start));
});

