import request from 'superagent';
import $ from 'jquery';

import {
    serverUrl
} from './base.js';

const LOCAL_SERVER = serverUrl;

const DEV_SERVER = '';
const PRO_SERVER = '';

function getUrl(path) {
    if (path.startsWith('http')) {
        return path;
    }
    return `${LOCAL_SERVER}${path}`;
}
//var path = 'http://localhost:8000/login';
//console.log(request)
const HttpClient = {
    get: (path, query) => new Promise((resolve, reject) => {
        $('#spinner').show();
        var req = request
            .get(getUrl(path))
            .query(query)
            .end((err, res) => {
                $('#spinner').hide()
                if (err) {
                    reject(err);
                } else {
                    resolve(res.body);
                }
            })
    }),

    post: (path, formdata) => new Promise((resolve, reject) => {
        console.log('client');
        $('#spinner').show();
        //console.log('formdata', formdata);
        request
            .post(getUrl(path))
            .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
            .send(formdata)
            .end((err, res) => {
                $('#spinner').hide()
                if (err) {
                    reject(err);
                } else {
                    resolve(res.body);
                }
            })
    })
};

export default HttpClient;