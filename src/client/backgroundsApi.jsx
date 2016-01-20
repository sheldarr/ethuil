import Promise from 'promise-polyfill';
import Request from 'superagent';

const BackgroundsApi = {
    getAll () {
        return new Promise((resolve, reject) => {
            Request
               .get('http://178.62.6.112:3033/background')
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
                .post('http://178.62.6.112:3033/background')
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
                .del(`http://178.62.6.112:3033/background`)
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
