const express = require('express')
const jwt = require('jsonwebtoken');


module.exports = function () {
    const router = express.Router()

    router.get('/', function (request, response) {
     
        response.status(200).json()
    })


    return router
}