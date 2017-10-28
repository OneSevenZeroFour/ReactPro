var personal = require('./personal/personal');
var login = require('./login/login');
var register = require('./register/register');


module.exports = function(app) {
    app.all("*", function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');

        if (req.method == "OPTIONS") {
            res.send(200); /*让options请求快速返回*/
        } else {
            next();
        }
    })

    personal(app);
    login(app);
    register(app);
}