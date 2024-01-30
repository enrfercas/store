const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.use(require('./routes/products.router'));

app.set('port', 3000);


module.exports = app;