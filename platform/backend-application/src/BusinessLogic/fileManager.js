const formidable = require('formidable');

module.exports = function({ fileValidation, globals, fileHandler, sessionValidation, fileRepository }) {

    const uploadPath = globals.uploadPath();
    const exports = {}

    exports.manageFileUpload = function(uploadData, request, callback) {
        const form = new formidable.IncomingForm();
        const errors = [];
        sessionValidation.validateSessionID(uploadData.sessionID).forEach(error => {
            errors.push(error);
        });

        if (errors.length > 0) {
            callback(errors, null);
            return;
        }

        console.log("trying to parse...");
        form.parse(request, async function(err, fields, files) {
            if (err) {
                callback(err, []);
                return;
            }
            const collisionsAt = {
                posX: fields.posX,
                posY: fields.posY
            }
            console.log("validating uploadData...");
            fileValidation.validateUploadData(collisionsAt).forEach(error => {
            console.log('error validating uploadData: ' + error)
            errors.push(error);
            });

            if(!files.collisionImg){
                errors.push("invalidImageKey")
                callback(errors, null)
                return
            }

            const file = files.collisionImg;
            fileValidation.validateFile(file).forEach(error => {
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
                const dbResponse = await fileRepository.insertCollisionImg(uploadData.sessionID, collisionsAt, newImgName);
                if(dbResponse.length > 0){
                    dbResponse.forEach(error => {
                        errors.push(error)
                        
                    })
                    callback(errors, null)
                    return
                }
                //When file written to server, and callback is sucess. Use newPath and send image to Google API! Store the img description object to imgCollision
                //Do it here...
                callback(errors, { dbResponse, success })
            })
        })
    }

    exports.manageSingleFileDownload = async function(sessionID, imgName, callback) {
        const errors = [];
        sessionValidation.validateSessionID(uploadData.sessionID).forEach(error => {
            errors.push(error);
        });
        if (errors.length > 0) {
            callback(errors, null);
            return;
        }

        const oneImg = await fileRepository.getOneCollisionImg(sessionID, imgName);
        console.log(oneImg)
        const imgPath = uploadPath + oneImg.imgName;
        callback(errors, imgPath)
    }

    exports.manageMultipleFileDownload = async function(sessionID, callback) {
        const errors = [];
        const imgArrayPath = [];

        sessionValidation.validateSessionID(uploadData.sessionID).forEach(error => {
            errors.push(error);
        });
        if (errors.length > 0) {
            callback(errors, null);
            return;
        }

        const imgArrayObjects = await fileRepository.getAllCollisionImg(sessionID);

        //This can be avoided if path is stored in database, but that would later
        imgArrayObjects.forEach(imgObject => {
            imgArrayPath.push({
                name: imgObject.imgName,
                path: uploadPath + imgObject.imgName
            })
        })
        console.log(imgArrayPath, 'Array with path and name? ')
        callback(errors, imgArrayPath);
    }

    return exports
}