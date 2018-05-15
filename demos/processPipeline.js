const path = require('path');
const fs = require('fs');
const { Transform } = require('stream');
const JSONStream = require('JSONStream');
const through2 = require('through2');

const myCustomProcessorStream = new Transform({
	readableObjectMode: true,
	writableObjectMode: true,
  transform(chunk, encoding, done) {
    // Your custom transform code goes here
    // console.log("Received ", chunk);
    chunk.quantity = 10000;
    done(null, JSON.stringify(chunk));
  }
});

const matchesFile = path.resolve(__dirname, 'data.json');

let s1 = fs.createReadStream(matchesFile, 'utf8');
s1
.pipe(JSONStream.parse("*"))
.pipe(myCustomProcessorStream)
// .pipe(through2(function (chunk, encoding, done) {
// 	console.log("What is chunk ", chunk)
// }))
.pipe(process.stdout);