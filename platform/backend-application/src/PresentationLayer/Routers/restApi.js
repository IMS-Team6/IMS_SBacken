const express = require('express')
const jwt = require('jsonwebtoken');


module.exports = function({ sessionManager }) {
    const router = express.Router()

    router.get('/session', async function(request, response) {
        const sessionId = '1234'

        sessionManager.manageSession(sessionId, function(object, error) {
            if (error.length == 0) {
                response.status(200).json(object)
            } else {
                response.status(500).json(error)
            }

        })

    })

    router.post('/session/:sessionId', async function(request, response) {
        const sessionId = request.body.sessionID
        const positions = request.body.positions
        const robotState = request.body.robotState

        database.insertPositions(sessionId, positions, robotState,
            function(object, error) {
                if (error.length == 0) {
                    response.status(201).json(object)
                } else {
                    response.status(404).json(error)
                }
            })
    });


    return router
}