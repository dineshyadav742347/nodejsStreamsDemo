const expect = require('chai').expect;
const path = require('path');
const fs = require('fs');
const request = require('superagent');

describe('Testing for writing data as stream from client to server', function() {
  it('Read data from file and send to server as stream ', function(done) {
    this.timeout(15000);
    let req = request
      // .post('http://localhost:3000/products/stream')
      .post('http://localhost:3000/file/streamtome')
      .type('json')
      .on('response', (res) => {
        console.log('got response ', res.status, ' data ', res.body);
        done();
      })
      .on('error', (err) => {
        console.log('got ERROR ', err.status, ' with response ', (err.response || err.response.error));
        done(err);
      })

    let inputFile = path.resolve(__dirname, "products_test_data.json");
    // let inputFile = path.resolve(__dirname, "sample_input.json");
    let productDataStream = fs.createReadStream(inputFile);
    productDataStream.pipe(req);
    productDataStream.on('end', () => console.log("Input stream ended"));
  })
})