const express = require('express')
const jwt = require('jsonwebtoken');


module.exports = function ({database}) {
    const router = express.Router()

    router.use('/*',function (request, response, next) {
        console.log(request.method, request.url)

        response.setHeader("Access-Control-Allow-Origin", "http://localhost:8080")
        response.setHeader("Access-Control-Allow-Methods", "*")
        response.setHeader("Access-Control-Allow-Headers", "*")
        response.setHeader("Access-Control-Allow-Expose-Headers", "*")

        next()
    })

    //This is a test function
    router.get('/home', async function (request, response) {
        
            response.status(201).json(await database.getPosition());
        
    })


    return router
}