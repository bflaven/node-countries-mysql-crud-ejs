/**
 * node-countries-mysql-crud-ejs
 * Script file : test_webpage_1.js
 * Version : 1.0
 * Description: Test Web application Country Light App made with Node
*/
    var request = require('request'),
    s = require('string'),
    cheerio = require('cheerio'),
    expect = require('chai').expect,
    baseUrl = 'http://127.0.0.1:3000';
 
describe('HOMEPAGE', function () {
    it('should load properly', function (done) {
        request(baseUrl, function (error, response, body) {
            expect(error).to.be.not.ok;
            expect(response).to.be.not.a('undefined');
            expect(response.statusCode).to.be.equal(200);
            var $ = cheerio.load(body);

            // test label in <h1>...</h1>
            var baseline = $('h1').html();
            expect(s(baseline).contains('Node') && s(baseline).contains('Countries Light Application')).to.be.ok;

            done();
        });
    });
});// end describe

describe('COUNTRIES LIST', function () {
    it('should navigate to countries', function (done) {
        request(baseUrl + '/countries', function (error, response, body) {
            expect(error).to.be.not.ok;
            expect(response).to.be.not.a('undefined');
            expect(response.statusCode).to.be.equal(200);

            // test label in <title>...</title>
            var $ = cheerio.load(body);
            var title = $('title').html();
            expect(s(title).contains('All Countries')).to.be.ok;
            expect(title).to.equal("All Countries");

            // test label for the title for Capital column           
            $('#countries').each(function(index, el){
                var headline = $('#capital')[0].children[0].data;
                expect(headline).to.equal("Capital");
            });
            

            done();
        });
    });

});// end describe


describe('ADD COUNTRY', function () {

      it('should navigate to /countries/add', function (done) {
        request(baseUrl + '/countries/add', function (error, response, body) {
            expect(error).to.be.not.ok;
            expect(response).to.be.not.a('undefined');
            expect(response.statusCode).to.be.equal(200);

            // test label in <title>...</title>
            var $ = cheerio.load(body);
            var title = $('title').html();
            expect(s(title).contains('Add New Country')).to.be.ok;
            expect(title).to.equal("Add New Country");
            
            // test id for the input capital
            $('#countries #capital').each(function(index, el){ 
            var inputId = el.attribs.id;
            expect(inputId).contains('capital').to.be.ok;
            expect(inputId).to.equal("capital");
            });

            done();
        });
    });

});// end describe

/* CAUTION this records may not exist in your database be sure yo use an existing record /countries/edit/:id  */

describe('EDIT COUNTRY', function () {

    it('should navigate to /countries/edit/12', function (done) {
        request(baseUrl + '/countries/edit/12', function (error, response, body) {
            expect(error).to.be.not.ok;
            expect(response).to.be.not.a('undefined');
            expect(response.statusCode).to.be.equal(200);

            // test label in <title>...</title>
            var $ = cheerio.load(body);
            var title = $('title').html();
            expect(s(title).contains('Edit Country')).to.be.ok;
            expect(title).to.equal("Edit Country");

            // test id for the input capital, must exist
            $('#countries #capital').each(function(index, el){ 
            var inputId = el.attribs.id;
            expect(inputId).contains('capital').to.be.ok;
            expect(inputId).to.equal("capital");
            });
            

            done();
        });
    });
     

});// end describe

