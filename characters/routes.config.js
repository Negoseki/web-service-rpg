const express = require('express');
const router = express.Router();
const CharacterController = require('./controllers/characters.controller');
const AuthValidation = require('../user/middlewares/auth.validation.middleware');

router.get('/', [AuthValidation.validJWTNeeded, CharacterController.list]);
router.post('/', [AuthValidation.validJWTNeeded, CharacterController.insert]);
router.get('/:id', [AuthValidation.validJWTNeeded, CharacterController.findById]);
router.patch('/:id', [AuthValidation.validJWTNeeded, CharacterController.patchById]);

module.exports = router;
