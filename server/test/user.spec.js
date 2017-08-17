const expect = require('chai').expect;
const dbUtils = require('../../db/lib/utils.js');
const User = require('../../db/models/users.js');



describe('User model tests', function () {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('Should be able to delete a record', function (done) {
    User.where({ id: 1 }).destroy()
      .then(function () {
        return User.where({ id: 1 }).fetch();
      })
      .then(function (result) {
        expect(result).to.equal(null);
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });

});