const path = require('path');
const fs = require('fs');
const readline = require('readline');

const matchesFile = path.resolve(__dirname, '..', 'mydata', 'matches.csv');
let s1 = fs.createReadStream(matchesFile, 'utf8');

let start = new Date().getTime();
console.log('Start: ', start);

const rl = readline.createInterface({
  input: s1,
});

let l = 0;
rl.on('line', (line) => {
	// console.log('.');
	// if(l < 1)
		// console.log(line);
	++l;
});

rl.on('close', (chunk) => {
	let end = new Date().getTime();
	console.log('end: ', end);
	console.log("Found ", l, " lines");
	console.log('duration: ', (end - start));
});
