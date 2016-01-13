'use strict';

const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const backgroundStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/backgrounds');
    },
    filename: function (req, file, cb) {
        cb(null, `background_${Date.now()}${path.extname(file.fieldname)}`);
    }
});

const backgroundUpload = multer({ storage: backgroundStorage });

const carStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/cars');
    },
    filename: function (req, file, cb) {
        cb(null, `car_${Date.now()}${path.extname(file.fieldname)}`);
    }
});

const carUpload = multer({ storage: carStorage });

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

const handleErrors = function (req, res, action) {
    action().then((result) => {
        console.log('OK', result);
        res.status(result.statusCode).json(result.data);
    }).catch((error) => {
        console.log('ERROR', error);
        res.sendStatus(500);
    });
};

router.get('/', function (req, res) {
    console.log('GET: /');

    handleErrors(req, res, () => {
        return new Promise((resolve, reject) => {
            resolve({statusCode: 200, data: {}});
        });
    });
});

router.get('/background', function (req, res) {
    console.log('GET: /background');

    handleErrors(req, res, () => {
        return new Promise((resolve, reject) => {
            fs.readdir('./public/backgrounds', function (err, files) {
                if (err) {
                    reject(err);
                }

                resolve({statusCode: 200, data: files});
            });
        });
    });
});

router.post('/background', backgroundUpload.any(), function (req, res) {
    console.log('POST: /background');

    handleErrors(req, res, () => {
        return new Promise((resolve, reject) => {
            resolve({statusCode: 200, data: {}});
        });
    });
});

router.delete('/background', function (req, res) {
    console.log(`DELETE: /background ${JSON.stringify(req.body)}`);

    handleErrors(req, res, () => {
        return new Promise((resolve, reject) => {
            fs.unlink(`./public/backgrounds/${req.body.name}`, (err) => {
                if (err) {
                    reject(err);
                }

                resolve({statusCode: 200, data: {}});
            });
        });
    });
});

router.get('/car', function (req, res) {
    console.log('GET: /car');

    handleErrors(req, res, () => {
        return new Promise((resolve, reject) => {
            fs.readdir('./public/cars', function (err, files) {
                if (err) {
                    reject(err);
                }

                resolve({statusCode: 200, data: files});
            });
        });
    });
});

router.post('/car', carUpload.any(), function (req, res) {
    console.log('POST: /car');

    handleErrors(req, res, () => {
        return new Promise((resolve, reject) => {
            resolve({statusCode: 200, data: {}});
        });
    });
});

router.delete('/car', function (req, res) {
    console.log(`DELETE: /car ${JSON.stringify(req.body)}`);

    handleErrors(req, res, () => {
        return new Promise((resolve, reject) => {
            fs.unlink(`./public/cars/${req.body.name}`, (err) => {
                if (err) {
                    reject(err);
                }

                resolve({statusCode: 200, data: {}});
            });
        });
    });
});

router.get('/song', function (req, res) {
    console.log('GET: /song');

    handleErrors(req, res, () => {
        return new Promise((resolve, reject) => {
            fs.readFile('./public/songs.json', 'utf8', function (err, data) {
                if (err) {
                    reject(err);
                }

                var songs = JSON.parse(data);

                resolve({statusCode: 200, data: songs});
            });
        });
    });
});

router.post('/song', function (req, res) {
    console.log(`POST: /song ${JSON.stringify(req.body)}`);

    handleErrors(req, res, () => {
        return new Promise((resolve, reject) => {
            fs.readFile('./public/songs.json', 'utf8', function (err, data) {
                if (err) {
                    reject(err);
                }

                var songs = JSON.parse(data);

                var newId = _.max(songs, 'id').id + 1;
                req.body.id = newId;

                songs.push(req.body);

                fs.writeFile('./public/songs.json', JSON.stringify(songs));

                resolve({statusCode: 200, data: {}});
            });
        });
    });
});

app.use('/', router);
app.listen(port);

console.log('Api is running on port: ' + port);
