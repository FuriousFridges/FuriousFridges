const expect = require('chai').expect;
const User = require('../../db/models/users.js');
const Question = require('../../db/models/questions.js');
const Answer = require('../../db/models/answers.js');
const dbUtils = require('../../db/lib/utils.js');

describe('Question board model tests', function () {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('Should be able create a user', (done) => {
    User.forge({ 
      firstName: 'John', 
      lastName: 'Doe',
      email: '123abc@example.com',
      photoUrl: 'greatphoto.jpg',
      visible: true 
    }).save()
      .then(() => {
        return User.fetchAll();   
      })
      .then(results => {
        expect(results.length).to.equal(1);
        expect(results.at(0).get('id')).to.equal(1);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Should be able to post a question', (done) => {
    User.forge({ 
      firstName: 'John', 
      lastName: 'Doe',
      email: '123abc@example.com',
      photoUrl: 'greatphoto.jpg',
      visible: true 
    }).save()
      .then(() => {
        return User.fetchAll();   
      })
      .then(user => {
        return Question.forge({
          question: 'Can I post a question?',
          user_id: user.models[0].attributes.id
        }).save(); 
      })
      .then(() => {
        return Question.fetchAll();
      })
      .then(results => {
        expect(results.length).to.equal(1);
        expect(results.at(0).get('id')).to.equal(1);
        expect(results.at(0).get('user_id')).to.equal(1);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Second user should be able to post an answer', (done) => {
    User.forge({ 
      firstName: 'John', 
      lastName: 'Doe',
      email: '123abc@example.com',
      photoUrl: 'greatphoto.jpg',
      visible: true 
    }).save()
      .then(() => {
        return User.forge({ 
          firstName: 'Jane', 
          lastName: 'Doe',
          email: '456abc@example.com',
          photoUrl: 'lovelyphoto.jpg',
          visible: true 
        }).save();
      })
      .then(user => {
        return Question.forge({
          question: 'Can I post a question?',
          user_id: 1
        }).save(); 
      })
      .then(() => {
        return Question.fetchAll();
      })
      .then(questions => {
        return Answer.forge({
          answer: 'Yes you can!',
          user_id: 2,
          question_id: questions.models[0].attributes.id
        }).save();
      })
      .then(() => {
        return Answer.fetchAll();
      })
      .then(results => {
        expect(results.length).to.equal(1);
        expect(results.at(0).get('id')).to.equal(1);
        expect(results.at(0).get('user_id')).to.equal(2);
        expect(results.at(0).get('question_id')).to.equal(1);
        done();
      })
      .catch(err => {
        done(err);
      });  
  });

});
