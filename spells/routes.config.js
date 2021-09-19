const express = require('express');
const router = express.Router();
const SpellController = require('./controllers/spells.controller');
const AuthValidation = require('../user/middlewares/auth.validation.middleware');

router.get('/', [SpellController.list]);
router.post('/', [AuthValidation.validJWTNeeded, SpellController.insert]);
router.get('/:spellId', [SpellController.findById]);
router.patch('/:spellId', [AuthValidation.validJWTNeeded, SpellController.patchById]);

module.exports = router;
