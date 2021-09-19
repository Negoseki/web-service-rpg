const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.insert = (req, res) => {
  const user = User.findOne({ username: req.body.username }, (err, user) => {
    if(!!user){
      return res.status(404).send({
        message: 'username already exists'
      });
    }


    var newUser = new User(req.body);
    console.log(req.body);
    newUser.setPassword(req.body.password);
    newUser.save((err, result) => {
      if (err) {
        res.status(400).send({
          message: 'Unable to save user to database'
        });
        console.log(err);
      } else {
        res.status(201).send({ id: result.id });
      }
    });
  });
};

exports.login = (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (!user) {
      res.status(400).send({
        message: 'User not found.'
      });
    }

    if (user.validPassword(req.body.password)) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 300
      });
      res.status(201).send({
        auth: true,
        token
      });
    } else {
      res.status(400).send({
        message: 'Wrong Password'
      });
    }
  });
};
