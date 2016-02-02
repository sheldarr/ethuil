import Configuration from '../var/configuration';
import Promise from 'promise-polyfill';
import Request from 'superagent';

const CarsApi = {
    getAll () {
        return new Promise((resolve, reject) => {
            Request
               .get(`${Configuration.apiAddress}/car`)
               .end((err, res) => {
                   if (err) {
                       console.log(err);
                   }

                   if (res.ok) {
                       resolve(res.body);
                   } else {
                       reject(res.text);
                   }
               });
        });
    },

    create (car) {
        return new Promise((resolve, reject) => {
            Request
                .post(`${Configuration.apiAddress}/car`)
                .attach(car.name, car)
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                    }

                    if (res.ok) {
                        resolve(res.body);
                    } else {
                        reject(res.text);
                    }
                });
        });
    },

    delete (name) {
        return new Promise((resolve, reject) => {
            Request
                .del(`${Configuration.apiAddress}/car`)
                .send({name: name})
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                    }

                    if (res.ok) {
                        resolve(res.body);
                    } else {
                        reject(res.text);
                    }
                });
        });
    }
};

export default CarsApi;
