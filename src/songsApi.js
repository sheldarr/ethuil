import Request from 'superagent';

const SongsApi = {
    getAll () {
        return new Promise((resolve, reject) => {
            Request
               .get('http://localhost:3033/song')
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
                .post('http://localhost:3033/song')
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
                .del(`http://localhost:3033/song/${id}`)
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
