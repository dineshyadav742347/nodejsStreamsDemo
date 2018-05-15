const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./appconfig');
const logger = require('./logger');
const mongoConnection = require('./mongoConnection');
const fs = require('fs');

let app = express();

// Configure morgan to log your requests, with a standard date & time format
morgan.token('time', (req, res) => new Date().toISOString());
app.use(morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms'));

// Static hosting of webapp
let staticPath = path.resolve(__dirname, 'dist');
logger.debug("[*] Setting Static path to [", staticPath, "]");
app.use(express.static(staticPath));

mongoConnection();

app.post('/file/streamtome', (req, res) => {
	// req.on('data', (chunk) => console.log(chunk.toString()));
	req.on('data', (chunk) => console.log('.'));
	// let saveToFileStream = fs.createWriteStream(path.resolve(__dirname, 'mydata',  'incoming.log'), 'utf8');
	// req.pipe(saveToFileStream);
	req.on('end', () => res.status(200).send('thanks'));
});

app.post('/file/streamtodb', (req, res) => {
	const productCtrl = require('./modules/products/products.controller');
	productCtrl.saveProductsAsStream(req);
	req.on('end', () => res.status(200).send('thanks'));
});

// Setup bodyParsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/products', require('./modules/products'));

// Catch all route
app.use((req, res) => {
	logger.error(`Request resource ${req.method} ${req.url} not fulfilled ..!`)
	return res.status(404).send("Requested resource not found..!");
});

module.exports = app;