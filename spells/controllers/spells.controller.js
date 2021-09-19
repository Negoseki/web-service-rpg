const Spell = require('../models/spell.model');

exports.insert = (req, res) => {
  var newSpell = new Spell(req.body);
  console.log(req.body);
  newSpell.save((err, result) => {
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
  Spell.find().exec((err, spells) => {
    if (err) {
      return res.send(500, err);
    }

    if (req.query) {
      Object.keys(req.query).forEach(key => {
        spells = spells.filter(s => (!!s[key] ? s[key].toLowerCase().indexOf(req.query[key].toLowerCase()) >= 0 : true));
      });
    }

    res.status(200).send({
      spells: spells
    });
  });
};

exports.findById = (req, res) => {
  Spell.findById(req.params.spellId).exec((err, spell) => {
    if (err) {
      return res.send(500, err);
    }
    res.status(200).send(spell);
  });
};

exports.patchById = (req, res) => {
  Spell.findOneAndUpdate(req.params.userId, req.body).exec((err, spell) => {
    if (err) {
      return res.send(500, err);
    }
    res.status(200).send();
  });
};
