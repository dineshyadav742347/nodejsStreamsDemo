const productDAO = require('./products.DAO');
const path = require('path');
const fs = require('fs');
const streamToMongoDB = require('stream-to-mongo-db').streamToMongoDB;
const JSONStream = require('JSONStream');

function fetchProducts(done) {
	productDAO.fetchProducts(done)
}

function fetchProductsAsStream(writableStream) {
	productDAO.fetchProductsAsStream(writableStream);
}

function fetchProductsFromFileAsStream(writableStream) {
	const dataFile = path.resolve(__dirname, 'products.json');
	let dataStream = fs.createReadStream(dataFile, 'utf8');
	dataStream.pipe(writableStream);
}

function saveProductsAsStream(readableStream) {
	const writableStream = streamToMongoDB({ dbURL: 'mongodb://localhost:27017/productStream', collection: 'products' });

	readableStream
	.pipe(JSONStream.parse('*'))
	.pipe(writableStream);
}

module.exports = {
	saveProductsAsStream,
	fetchProducts,
	fetchProductsAsStream,
	fetchProductsFromFileAsStream
}