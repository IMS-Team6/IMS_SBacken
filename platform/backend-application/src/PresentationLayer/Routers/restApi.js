const express = require('express')
const jwt = require('jsonwebtoken');


module.exports = function({ sessionManager, globals }) {
    const router = express.Router();

    router.get('/sessions', async function(request, response) {

        sessionManager.manageGetSessions((errors, data) => {

            console.log(errors, data, 'Some log?', globals.errorTranslation(errors));
            if (errors.length == 0) {
                response.status(200).json(data);
            } else {
                response.status(500).json(globals.errorTranslation(errors))
            };

        });

    });

    router.get('/session/:sessionID', async function(request, response) {
        const sessionID = request.params.sessionID

        sessionManager.manageGetSessionWithID(sessionID, (errors, data) => {

            if (errors.length <= 0) {
                response.status(200).json(data);
            } else {
                response.status(500).json(globals.errorTranslation(errors));
            };

        });

    });

    router.post('/session/:sessionID', async(request, response) => {

        const sessionData = {
            sessionID: request.params.sessionID,
            positions: request.body.positions,
            robotState: request.body.robotState,
            collision: request.body.collision
        };
        sessionManager.managePostSessionData(sessionData, (errors, success) => {
            if (errors.length == 0) {
                response.status(200).json(success);
            } else {
                response.status(400).json(globals.errorTranslation(errors));
            };
        });

    });

    return router;
}