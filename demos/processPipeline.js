const path = require('path');
const fs = require('fs');

const matchesFile = path.resolve(__dirname, 'data.json');

let s1 = fs.createReadStream(matchesFile, 'utf8');
s1.pipe(process.stdout);