const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb')

// Import our mongoose connection
const { mongoose } = require('./server/db/mongoose');
const multer = require('multer');
const path = require('path');

const DIR = '../public/src/assets';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
});
let upload = multer({storage: storage});

// Set up the express app
const app = express();

//post to listen to
app.set('port', 8000);

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Require our routes into the application.
require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

//upload route
app.post('/upload',upload.single('photo'), function (req, res) {
    if (!req.file) {
        return res.status(400).send({
          success: false
        });

      } else {
        return res.send({
          success: true
        })
      }
});

module.exports = app;
