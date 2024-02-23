"use strict";

var express = require('express');

// import express from 'express';

var app = express();
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server is listening on port ".concat(PORT));
});