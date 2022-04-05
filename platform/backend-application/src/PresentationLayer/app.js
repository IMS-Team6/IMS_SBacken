const express = require("express")
const app = express()


module.exports = function ({ restAPI }) { 

    const app = express()


    app.use(function (request, response, next) {
        response.setHeader("Access-Control-Allow-Origin", "*") // "localhost:3000"
        response.setHeader("Access-Control-Allow-Methods", "*") // GET, POST, PUT, DELETE
        response.setHeader("Access-Control-Allow-Headers", "*")
        response.setHeader("Access-Control-Expose-Headers", "*")
        next()
    })


    app.use('/Routers/rest-api', restAPI)

    return app
}
