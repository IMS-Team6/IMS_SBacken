const formidable = require('formidable');
const vision = require('@google-cloud/vision');
const { call } = require('@google-cloud/vision/build/src/helpers');

const googleClient = new vision.ImageAnnotatorClient();

module.exports = function({ fileValidation, globals, fileHandler, sessionValidation, fileRepository, sessionRepository }) {

    const uploadPath = globals.uploadPath();
    const exports = {}

    exports.manageFileUpload = async function(uploadData, request, callback) {
        const form = new formidable.IncomingForm();
        const errors = [];
        sessionValidation.validateSessionID(uploadData.sessionID).forEach(error => {
            errors.push(error);
        });


        const response = await sessionRepository.getSessionWithIDAndState(uploadData.sessionID)
        if (response && response.length > 0) {
            errors.push(response)
            callback(errors, null);
            return;
        }

        form.parse(request, async function(err, fields, files) {
            if (err) {
                callback(['internalError'], []);
                return;
            }
            const collisionsAt = {
                posX: fields.posX,
                posY: fields.posY
            }

            fileValidation.validateUploadData(collisionsAt).forEach(error => {
                errors.push(error);
            });

            fileValidation.validateFile(files).forEach(error => {
                errors.push(error);
            });

            if (errors.length > 0) {
                callback(errors, null);
                return;
            }

            const oldPath = files.collisionImg.filepath;
            const timeStamp = new Date().valueOf().toString()
            const newImgName = uploadData.sessionID + '_' + timeStamp + '_' + files.collisionImg.originalFilename;
            const newPath = uploadPath + newImgName;


            fileHandler.writeFileToServer(newPath, oldPath, async function(err, success) {
                if (err > 0) {
                    errors.push(err)
                }

                const request = { image: { source: { filename: newPath } } }
                const [result] = await googleClient.objectLocalization(request);
                const objects = result.localizedObjectAnnotations;

                const highlightResult = await fileHandler.highlightImageObjects(newPath, objects);

                if (highlightResult && highlightResult.length > 0) {
                    errors.push(highlightResult)
                    callback(errors, null)
                    return;
                }

                const dbResponse = await fileRepository.insertCollisionImg(uploadData.sessionID, collisionsAt, newImgName);
                if (dbResponse.length > 0) {
                    dbResponse.forEach(error => {
                        errors.push(error)
                    })
                    callback(errors, null)
                    return
                }
                callback(errors, { dbResponse, success })
            })
        })
    }

    exports.manageSingleFileDownload = async function(sessionID, imgName, callback) {
        const errors = [];
        sessionValidation.validateSessionID(sessionID).forEach(error => {
            errors.push(error);
        });

        if (errors.length > 0) {
            callback(errors, null);
            return;
        }

        const oneImg = await fileRepository.getOneCollisionImg(sessionID, imgName);
        if (oneImg.length > 0) {
            oneImg.forEach(error => {
                errors.push(error)

            })
            callback(errors, null)
            return
        }
        const imgPath = uploadPath + oneImg.imgName;
        callback(errors, imgPath)
    }

    exports.manageMultipleFileDownload = async function(sessionID, callback) {
        const errors = [];
        const imgArrayPath = [];

        sessionValidation.validateSessionID(sessionID).forEach(error => {
            errors.push(error);
        });
        if (errors.length > 0) {
            callback(errors, null);
            return;
        }

        const imgArrayObjects = await fileRepository.getAllCollisionImg(sessionID);
        console.log(imgArrayObjects)

        if (imgArrayObjects[0] != undefined) {
            if (typeof imgArrayObjects[0] == "string") {
                imgArrayObjects.forEach(error => {
                    errors.push(error)
                })
                callback(errors, null)
                return
            }
        }

        //This can be avoided if path is stored in database, but that would later
        imgArrayObjects.forEach(imgObject => {
            imgArrayPath.push({
                name: imgObject.imgName,
                path: uploadPath + imgObject.imgName
            })
        })
        console.log(imgArrayPath, 'the images=')
        callback(errors, imgArrayPath);
    }

    exports.manageGetCollisionImg = async function(payload, callback) {
        const errors = [];

        sessionValidation.validateSessionID(payload.sessionID).forEach(error => {
            errors.push(error);
        });
        if (errors.length > 0) {
            callback(errors, null);
            return;
        }

        const oneImg = await fileRepository.getOneCollisionImg(payload.sessionID, payload.imgName);
        if (oneImg.length > 0) {
            oneImg.forEach(error => {
                errors.push(error)

            })
            callback(errors, null)
            return
        }
        callback(errors, oneImg)
    }

    exports.manageGetAllCollisionImg = async function(sessionID, callback) {
        const errors = [];

        sessionValidation.validateSessionID(sessionID).forEach(error => {
            errors.push(error);
        });
        if (errors.length > 0) {
            callback(errors, null);
            return;
        }

        const imgArrayObjects = await fileRepository.getAllCollisionImg(sessionID);

        if (imgArrayObjects[0] != undefined) {
            if (typeof imgArrayObjects[0] == "string") {
                imgArrayObjects.forEach(error => {
                    errors.push(error)
                })
                callback(errors, null)
                return
            }
        }
        callback(errors, imgArrayObjects);
        return
    }

    return exports
}