const moongose = require('mongoose');
const Schema = moongose.Schema;

const CharacterSchema = new Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  classe: { type: String, required: true },
  userId: { type: moongose.ObjectId, required: true }
});

module.exports = moongose.model('Character', CharacterSchema);
