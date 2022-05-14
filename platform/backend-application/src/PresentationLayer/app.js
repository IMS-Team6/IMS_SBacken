const express = require("express");
const bodyParser = require('body-parser');


module.exports = function({ sessionAPI, fileServiceAPI }) {
    const app = express();

    app.use(bodyParser.json({ limit: '2mb' }));

    app.use(bodyParser.urlencoded({
        limit: '2mb',
        extended: true,
    }));

    app.use('/*', function(request, response, next) {
        console.log(request.method, request.url);

        response.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Allow-Headers", "*");
        response.setHeader("Access-Control-Allow-Expose-Headers", "*");

        next();
    });

    app.use('/api', sessionAPI);
    app.use('/api', fileServiceAPI);

    return app;
}