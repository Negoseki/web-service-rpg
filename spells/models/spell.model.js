const moongose = require('mongoose');
const Schema = moongose.Schema;

const spellSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  level: { type: Number, required: true },
  range: { type: String, required: true },
  components: [String],
  classes: [String],
  duration: {
    time: { type: Number, required: true },
    measure: { type: String, required: true }
  }
});

module.exports = moongose.model('Spell', spellSchema);
