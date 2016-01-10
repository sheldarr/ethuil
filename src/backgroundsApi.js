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
    }
};

export default BackgroundsApi;
