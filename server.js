const express = require('express');
const path = require('path');

const app = express();

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3030, function () {
    console.log('Server is running on port: 3030');
});
