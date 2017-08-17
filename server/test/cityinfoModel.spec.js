const expect = require('chai').expect;
const dbUtils = require('../../db/lib/utils.js');
const Stats = require('../../db/models/cityinfo.js');



describe('city info model tests', function () {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('Should be able to retrieve data', function (done) {
    Stats.forge({ 
      city: 'san francisco',
      city_stats: 'string of info', 
      city_details: 'another string'
    }).save()
    .then(() => {
      return Stats.fetchAll();   
    })
      .then(function (results) {
        expect(results.length).to.equal(1);
        expect(results.at(0).get('id')).to.equal(1);
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });
});
