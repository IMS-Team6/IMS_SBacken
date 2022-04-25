const express = require("express")
const app = express()





module.exports = function({ restAPI, fileService }) {
    const app = express()
    app.use('/*', function(request, response, next) {
        console.log(request.method, request.url)

        response.setHeader("Access-Control-Allow-Origin", "http://localhost:8080")
        response.setHeader("Access-Control-Allow-Methods", "*")
        response.setHeader("Access-Control-Allow-Headers", "*")
        response.setHeader("Access-Control-Allow-Expose-Headers", "*")

        next()
    })



    app.use('/api/', restAPI)
    app.use('/api/', fileService)

    return app
}