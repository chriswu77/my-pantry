const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const db = require('../database/index');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('hello');
});

module.exports = app;
