const Character = require('../models/character.model');

exports.insert = (req, res) => {
  var newCharacter = new Character(req.body);
  newCharacter.userId = req.jwt.id;
  newCharacter.save((err, result) => {
    if (err) {
      res.status(400).send({
        message: 'Unable to save spell to database'
      });
      console.log(err);
    } else {
      res.status(201).send({ id: result.id });
    }
  });
};

exports.list = (req, res) => {
  Character.find({ userId: req.jwt.id }).exec((err, characters) => {
    if (err) {
      return res.send(500, err);
    }

    if (req.query) {
      Object.keys(req.query).forEach(key => {
        characters = characters.filter(s => (!!s[key] ? s[key].toLowerCase().indexOf(req.query[key].toLowerCase()) >= 0 : true));
      });
    }

    res.status(200).send({
      characters: characters
    });
  });
};

exports.findById = (req, res) => {
  Character.findById(req.params.id).exec((err, character) => {
    if (err) {
      return res.send(500, err);
    }
    if (!character.userId.equals(req.jwt.id)) {
      return res.status(403).send();
    }
    res.status(200).send(character);
  });
};

exports.patchById = (req, res) => {
  Character.findOneAndUpdate({ id: req.params.id, userId: req.jwt.id }, req.body).exec((err, spell) => {
    if (err) {
      return res.send(500, err);
    }
    res.status(200).send();
  });
};
