import Configuration from '../var/configuration';
import Promise from 'promise-polyfill';
import Request from 'superagent';

const BackgroundsApi = {
    getAll () {
        return new Promise((resolve, reject) => {
            Request
               .get(`${Configuration.apiAddress}/background`)
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
                .post(`${Configuration.apiAddress}/background`)
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
                .del(`${Configuration.apiAddress}/background`)
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
