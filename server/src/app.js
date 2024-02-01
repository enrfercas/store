const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors())

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(require('./routes/products.router'));

app.set('port', 3000);


module.exports = app;