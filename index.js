if (process.env.NODE_ENV !== 'prod') {
  require('dotenv').config();
}

const express = require('express');
const db = require('./db');
const app = express();

// routes
const spells = require('./spells/routes.config');
const users = require('./user/routes.config');
const characters = require('./characters/routes.config');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/spells', spells);
app.use('/user', users);
app.use('/characters', characters);

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
