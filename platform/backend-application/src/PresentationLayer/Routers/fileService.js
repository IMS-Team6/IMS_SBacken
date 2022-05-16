const express = require('express');
const zip = require('express-zip');


module.exports = function({ globals, fileManager, fileRepository }) {
    const uploadPath = globals.uploadPath();
    const router = express.Router()

    router.post('/upload/:sessionID', (request, response, next) => {

        const payload = {
            sessionID: request.params.sessionID,
        };

        fileManager.manageFileUpload(payload, request, function(errs, success) {
            if (errs.length > 0) {
                response.status(400).json(globals.errorTranslation(errs))
                return
            }
            response.status(200).json("success");
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

        const sessionID = request.params.sessionID
        const imgName = request.params.imgName

        fileManager.manageSingleFileDownload(sessionID, imgName, function(error, imgPath) {
            if (error.length > 0) {
                response.status(404).json(globals.errorTranslation(error));
                return
            }
            response.download(imgPath)
        })

    })

    router.get('/download/collisionImg/:sessionID', async function(request, response) {

        const sessionID = request.params.sessionID

        fileManager.manageMultipleFileDownload(sessionID, function(error, imgArrayPath) {
            if (error.length > 0) {
                response.status(404).json(globals.errorTranslation(error));
                return
            }
            console.log("imgArrayP:" + imgArrayPath);
            response.zip(imgArrayPath);
        })
    })
    return router
}