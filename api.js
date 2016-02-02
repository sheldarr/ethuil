const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const process = require('process');
const winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'api.log' })
    ]
});

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
    logger.info(`${req.method} ${req.originalUrl} ${req.ip}`);

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');

    next();
});

const handleErrors = function (req, res, action) {
    action().then((result) => {
        res.status(result.statusCode).json(result.data);
    }).catch((error) => {
        logger.error(`PID ${process.pid} ${error}`);
        res.sendStatus(500);
    });
};

router.get('/', function (req, res) {
    handleErrors(req, res, () => {
        return new Promise((resolve, reject) => {
            resolve({statusCode: 200, data: {}});
        });
    });
});

router.get('/background', function (req, res) {
    handleErrors(req, res, () => {
        return new Promise((resolve, reject) => {
            fs.readdir('./public/backgrounds', function (err, files) {
                if (err) {
                    reject(err);
                }

                files.splice(files.indexOf('.gitignore'), 1);

                resolve({statusCode: 200, data: files});
            });
        });
    });
});

router.post('/background', backgroundUpload.any(), function (req, res) {
    handleErrors(req, res, () => {
        return new Promise((resolve, reject) => {
            resolve({statusCode: 200, data: {}});
        });
    });
});

router.delete('/background', function (req, res) {
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
    handleErrors(req, res, () => {
        return new Promise((resolve, reject) => {
            fs.readdir('./public/cars', function (err, files) {
                if (err) {
                    reject(err);
                }

                files.splice(files.indexOf('.gitignore'), 1);

                resolve({statusCode: 200, data: files});
            });
        });
    });
});

router.post('/car', carUpload.any(), function (req, res) {
    handleErrors(req, res, () => {
        return new Promise((resolve, reject) => {
            resolve({statusCode: 200, data: {}});
        });
    });
});

router.delete('/car', function (req, res) {
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
    handleErrors(req, res, () => {
        return new Promise((resolve, reject) => {
            fs.readFile('./var/songs.json', 'utf8', function (err, data) {
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
    handleErrors(req, res, () => {
        return new Promise((resolve, reject) => {
            fs.readFile('./var/songs.json', 'utf8', function (err, data) {
                if (err) {
                    reject(err);
                }

                var songs = JSON.parse(data);

                var newId = _.max(songs, 'id').id + 1;
                var newSong = {id: newId, name: req.body.name, url: req.body.url};

                songs.push(newSong);

                fs.writeFile('./var/songs.json', JSON.stringify(songs));

                resolve({statusCode: 200, data: {}});
            });
        });
    });
});

router.delete('/song/:id', function (req, res) {
    handleErrors(req, res, () => {
        return new Promise((resolve, reject) => {
            fs.readFile('./var/songs.json', 'utf8', function (err, data) {
                if (err) {
                    reject(err);
                }

                var songs = JSON.parse(data);

                _.remove(songs, song => song.id === parseInt(req.params.id, 10));

                fs.writeFile('./public/songs.json', JSON.stringify(songs));

                resolve({statusCode: 200, data: {}});
            });
        });
    });
});

app.use('/', router);
app.listen(port, () => {
    logger.info(`PID ${process.pid} Api is running on port: ${port}`);
});
