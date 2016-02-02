import Configuration from '../var/configuration';
import Promise from 'promise-polyfill';
import Request from 'superagent';

const SongsApi = {
    getAll () {
        return new Promise((resolve, reject) => {
            Request
               .get(`${Configuration.apiAddress}/song`)
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

    create (song) {
        return new Promise((resolve, reject) => {
            Request
                .post(`${Configuration.apiAddress}/song`)
                .send(song)
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

    delete (id) {
        return new Promise((resolve, reject) => {
            Request
                .del(`${Configuration.apiAddress}/song/${id}`)
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

export default SongsApi;
