const path = require('path');
const fs = require('fs');

const dayOne = path.resolve(__dirname, '..', 'mydata', 'orders_day1.csv');
const dayTwo = path.resolve(__dirname, '..', 'mydata', 'orders_day2.csv');
const totalDays = path.resolve(__dirname, '..', 'mydata', 'total_orders.csv');

let s1 = fs.createReadStream(dayOne, 'utf8');
let s2 = fs.createReadStream(dayTwo, 'utf8');
let s3 = fs.createWriteStream(totalDays, 'utf8');

s1.pipe(s3);
s2.pipe(s3);

s1.on('end', () => 'Finished ONE');
s2.on('end', () => 'Finished TWO');