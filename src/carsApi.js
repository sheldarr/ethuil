import Request from 'superagent';

const CarsApi = {
    getAll () {
        return new Promise((resolve, reject) => {
            Request
               .get('http://178.62.6.112:3033/car')
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
                .post('http://178.62.6.112:3033/car')
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
                .del(`http://178.62.6.112:3033/car`)
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
