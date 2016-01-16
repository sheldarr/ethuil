import Request from 'superagent';

const SongsApi = {
    getAll () {
        return new Promise((resolve, reject) => {
            Request
               .get('http://178.62.6.112:3033/song')
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
                .post('http://178.62.6.112:3030/song')
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
                .del(`http://178.62.6.112:3033/song/${id}`)
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
