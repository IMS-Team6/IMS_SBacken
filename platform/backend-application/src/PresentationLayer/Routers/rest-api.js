const express = require('express')
const jwt = require('jsonwebtoken');

/*

{
Positions: {
    session_id: "",
    session_duration:{
    start: "yyyy/m/d gtm+1",
    stop: ""
    },
x:[x1],
y:[y1]}
}
*/

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
    router.get('/position', async function (request, response) {
        
            response.status(201).json(
                await database.getPosition()
                );
    });

    router.get("/position/:sessionId", async function (request, response){
        const sessionId = request.params.sessionId;
        
    })

    router.post('/positions', async function (request, response) {
        
        response.status(201).json(
            await database.getPosition()
            );
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