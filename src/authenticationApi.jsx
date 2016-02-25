import Configuration from '../var/configuration';
import Promise from 'promise-polyfill';
import Request from 'superagent';

const AuthenticationApi = {
    authenticate (authenticationKey) {
        return new Promise((resolve, reject) => {
            Request
               .post(`${Configuration.apiAddress}/authenticate`)
               .send({authenticationKey})
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

export default AuthenticationApi;
