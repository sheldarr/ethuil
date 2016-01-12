import Request from 'superagent';

const BackgroundsApi = {
    getAll () {
        return new Promise((resolve, reject) => {
            Request
               .get('http://localhost:3033/background')
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
                .post('http://localhost:3033/background')
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
                .del(`http://localhost:3033/background`)
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
