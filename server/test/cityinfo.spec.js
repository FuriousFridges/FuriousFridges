const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const dbUtils = require('../../db/lib/utils.js');
const passport = require('../middleware/passport');
const models = require('../../db/models');



describe('GET /cityinfo', function() {
  it('should return all city stats', function(done) {
    chai.request(server)
    .get('/cityinfo')
    .end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    // res.body.categories.should.be.a('array');
    // res.body.length.should.equal(4);
    // res.body.categories[0].score_out_of_10.should.have.property('housing');
    // res.body.categories[1].score_out_of_10.should.equal('cost_of_living');
    // res.body.categories[8].score_out_of_10.should.have.property('healthcare');
    // res.body.categories[10].score_out_of_10.should.equal('environmental_quality');
    // res.body.categories[11].score_out_of_10.should.have.property('economy');
    // res.body.categories[14].score_out_of_10.should.equal('leisure_and_culture');
    // res.body.categories[5].score_out_of_10.should.have.property('commute');
    // res.body.categories[7].score_out_of_10.should.have.property('safety');
    // res.body.categories[9].score_out_of_10.should.have.property('education');
    // res.body.sumary.should.have.property('summary');
    done();
    });
  });
});