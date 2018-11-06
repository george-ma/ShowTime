const Users = require('../models').User;

module.exports = {
  //create a new user
  create(req, res) {
    return Users
      .create({
        username: req.body.username,
        bio: " ",
        password: req.body.password,
        email: req.body.email,
        img: " ",
        is_admin: false,
        is_blocked: false
      })
      .then(users => res.status(200).send("okay"))
      .catch(error => res.status(400).send(error));
  },

  // list all users
  list(req, res) {
    return Users
      .findAll({
        attributes: ['id', 'username', 'email', 'bio','is_admin', 'is_blocked' ],
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((users) => res.status(200).send(users))
      .catch((error) => res.status(400).send(error));
  },

  // get a single user
  getUser(req, res) {
    return Users
      .findById(req.params.user, {
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt']
        },
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((users) => res.status(200).send(users))
      .catch((error) => res.status(400).send(error));
  },

  //update a user
  update(req, res) {
    return Users
      .findById(req.body.id, {
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt']
        },
      })
      .then(users => {
        if (!users) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return users
          .update({
            username: req.body.username,
            bio: req.body.bio,
            password: req.body.password,
            email: req.body.email,
            img: req.body.img,
            is_admin: req.body.is_admin,
            is_blocked: req.body.is_blocked
          })
          .then((users) => res.status(200).send(users))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  //remove a user
  removeUser(req, res) {
    return Users
      .findById(
        req.body.id
      )
      .then(user => {
        return user.destroy()
          .then(() => res.status(200).send("user deleted"))
          .catch((error) => res.status(400).send(error));
        })
      .catch(error => res.status(400).send(error));
  },

};
