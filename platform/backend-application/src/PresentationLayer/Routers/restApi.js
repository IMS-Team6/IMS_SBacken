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
        const postPosition = {
            sessionID: '1234134',
            roboteState: 'Moving',
            positions: {
                posX: 1,
                posY: 2,
            },
        }
        const sessionId = postPosition.sessionID
        positionManager.manageSession(postPosition, function(error) {
            if (error.length == 0) {
                response.status(200).json()
            } else {
                response.status(500).json(error)
            }
        })
    });


    return router
}