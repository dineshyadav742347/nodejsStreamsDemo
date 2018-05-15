const path = require('path');
const fs = require('fs');

const matchesFile = path.resolve(__dirname, '..', 'mydata', 'matches.csv');

let start = new Date().getTime();

fs.readFile(matchesFile, 'utf8', (data) => {
	end = new Date().getTime();
	console.log('end: ', end);
	console.log('duration: ', (end - start));
})
