const express = require("express")
const expressHandlebars = require('express-handlebars');
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()

module.exports = function ({ chargersRouter, transactionsRouter, reservationsRouter, authenticationRouter, adminRouter, chargePointsRouter, ocppInterface }) { //authenticationRouter


    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.use(function (request, response, next) {
        response.setHeader("Access-Control-Allow-Origin", "*") // "localhost:3000"
        response.setHeader("Access-Control-Allow-Methods", "*") // GET, POST, PUT, DELETE
        response.setHeader("Access-Control-Allow-Headers", "*")
        response.setHeader("Access-Control-Expose-Headers", "*")
        next()
    })


    app.use('/chargers', chargersRouter)

    return app
}
