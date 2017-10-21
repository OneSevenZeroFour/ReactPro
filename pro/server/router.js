var login = require('./login/login');

module.exports = function(app) {
    app.all('*', function(req, res, next) {
        //console.log(req);
        res.append('Access-Control-Allow-Origin', "*");
        next();
    })

    app.get('/', function(req, res) {
        res.send('link to router')
    })

    login(app);
}