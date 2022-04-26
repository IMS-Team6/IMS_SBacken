const express = require('express')
const jwt = require('jsonwebtoken');


module.exports = function ({ database, positionManager }) {
    const router = express.Router()
    
    router.get('/position', async function (request, response) {

        response.status(201).json(
            await database.getPosition()
        );
    });

    router.get("/position/:sessionId", async function (request, response) {
        const sessionId = request.params.sessionId;

    })

    router.post('/session/:sessionId', async function (request, response) {
        const postPosition = {
            sessionID: '1234134',      
            roboteState: 'Moving',   
            positions: {               
                posX: 1,     
                posY: 2, 
            },
        }
        const sessionId = postPosition.sessionID
        positionManager.manageSession(postPosition, function (response, error) {
            if (error.length == 0) {
                response.status(200).json()
            } else {
                response.status(500).json(error)
            }
        })
    });

    // router.get('/', function(request, response){
    //     response.send('You are ar at home');
    // })

    // router.get('/', async function(request, response){

    //     database.getPosition( function(error){
    //         if(error.length == 0){
    //             response.status(200).json()
    //         }else{
    //             response.status(500).json(error)
    //         }
    //     });
    // });

    //router.listen(8080);
    return router
}