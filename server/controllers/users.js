const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.User.fetchAll()
    .then(users => {
      res.status(200).send(users);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.create = (req, res) => {
  models.User.forge({ firstName: req.user.first, 
                      lastName: req.user.last,
                      email: req.user.email,
                      photoUrl: req.user.profile_pic,
                      visible: true })
    .save()
    .then(result => {
      res.status(201).send(result.attributes); //--Sending info from profiles
    })
    .catch(err => {
      if (err.constraint === 'users_email_unique') {
        models.User.where({ email: req.user.email }).fetch()
          .then(result => res.status(200).send(result.attributes))
          .catch(err => {
            res.status(409).send(err);
          });
      } else {
        res.status(500).send(err);
      }
    });
};


module.exports.update = (req, res) => {
  models.User.where({ email: req.body.email}).fetch()
    .then(user => {
      return user.save({destination: req.body.destination, origin: req.body.origin, type: req.body.type, visible: req.body.visible}, {method: 'update'});
    })
    .then((user) => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};





