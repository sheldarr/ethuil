'use strict'

const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: './public' });

const app = express();
const port = 3033;
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
    next();
});

router.get('/', function (req, res) {
    console.log('GET: /');
    res.sendStatus(200);
});

router.get('/car', function (req, res) {
    console.log('GET: /car');

    fs.readdir('./public/cars', function (err, files) {
        if (err) {
            console.log(err);
        }

        res.json(files);
    });
});

router.post('/car', upload.any(), function (req, res) {
    console.log('POST: /car');

    let car =  _.first(req.files);

    res.sendStatus(200);
});

router.get('/background', function (req, res) {
    console.log('GET: /background');

    fs.readdir('./public/backgrounds', function (err, files) {
        if (err) {
            console.log(err);
        }

        res.json(files);
    });
});

router.get('/song', function (req, res) {
    console.log('GET: /song');

    fs.readFile('./public/songs.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }

        var songs = JSON.parse(data);

        res.json(songs);
    });
});

app.use('/', router);

app.listen(port);
console.log('Api is running on port: ' + port);
