import Promise from 'promise-polyfill';
import Request from 'superagent';

import configuration from '../var/configuration';

const BackgroundsApi = {
    getAll () {
        return new Promise((resolve, reject) => {
            Request
               .get(`${configuration.apiAddress}/background`)
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

    create (background) {
        return new Promise((resolve, reject) => {
            Request
                .post(`${configuration.apiAddress}/background`)
                .attach(background.name, background)
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
                .del(`${configuration.apiAddress}/background`)
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

export default BackgroundsApi;
