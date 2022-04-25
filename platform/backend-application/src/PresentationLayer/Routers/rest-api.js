const express = require('express')
const jwt = require('jsonwebtoken');


module.exports = function({ database }) {
    const router = express.Router()

    //This is a test function
    router.get('/home', async function(request, response) {

        response.status(201).json(await database.getPosition());

    })


    return router
}