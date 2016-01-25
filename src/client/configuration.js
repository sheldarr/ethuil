const fs = require('fs');

let configuration = {};

fs.readFile('../../var/configuration.js', 'utf8', function (err, data) {
    if (err) {
    }

    configuration = JSON.parse(data);
});

export default configuration;
