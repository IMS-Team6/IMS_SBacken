const express = require('express');
const zip = require('express-zip');


module.exports = function({ globals, fileManager, fileRepository }) {
    const uploadPath = globals.uploadPath();
    const router = express.Router()


    //This is a test function

    router.post('/upload/:sessionID', (request, response, next) => {

        const sessionID = request.params.sessionID;

        fileManager.manageFileUpload(sessionID, request, function(errs, success) {
            if (errs > 0) {
                response.send(err)
                return
            }
            response.send('success');

        });
    });


    router.get('/collisionImg/:sessionID', async function(request, response) {
        console.log('Multiple file download')

        const sessionID = request.params.sessionID
        const objects = await fileRepository.getAllCollisionImg(sessionID);

        response.json(objects)
    })
    router.get('/collisionImg/:sessionID/:imgName', async function(request, response) {
        console.log('Multiple file download')

        const sessionID = request.params.sessionID
        const imgName = request.params.imgName
        const objects = await fileRepository.getOneCollisionImg(sessionID, imgName);

        response.json(objects)
    })


    router.get('/download/collisionImg/:sessionID/:imgName', async function(request, response) {
        console.log('Single file download')

        const sessionID = request.params.sessionID
        const imgName = request.params.imgName

        fileManager.manageSingelFileDownload(sessionID, imgName, function(error, imgPath) {
            if (error > 0) {
                response.status(400).json('Failed')
            }
            response.download(imgPath)
        })

    })

    router.get('/download/collisionImg/:sessionID', async function(request, response) {
        console.log('Multiple file download')

        const sessionID = request.params.sessionID

        fileManager.manageMultipleFileDownload(sessionID, function(error, imgArrayPath) {
            if (error > 0) {
                response.status(400).json('Failed to download')
            }
            response.zip(imgArrayPath);
        })



    })



    return router
}