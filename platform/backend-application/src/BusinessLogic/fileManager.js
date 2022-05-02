const formidable = require('formidable');

module.exports = function({ fileValidation, globals, fileHandler, sessionValidation, database, fileRepository }) {

    const uploadPath = globals.uploadPath();

    const exports = {}

    exports.manageFileUpload = function(sessionID, request, callback) {
        const form = new formidable.IncomingForm();
        const errors = [];

        sessionValidation.validateSessionID(sessionID).forEach(error => {
            errors.push(error);
        });

        form.parse(request, async function(err, fields, files) {
            if (err) {
                callback(err, []);
                return;
            }
            const oldPath = files.collisionImg.filepath;
            const timeStamp = new Date().valueOf().toString()
            const newImgName = sessionID + '_' + timeStamp + '_' + files.collisionImg.originalFilename;
            const newPath = uploadPath + newImgName;

            const dbSuccess = await fileRepository.insertCollisionImg(sessionID, fields, newImgName);
            fileHandler.writeFileToServer(newPath, oldPath, function(err, success) {
                if (err > 0) {
                    errors.push(err)
                }
                callback(errors, { dbSuccess, success })
            })
        })
    }

    exports.manageSingelFileDownload = async function(sessionID, imgName, callback) {
        const errors = [];
        const oneImg = await fileRepository.getOneCollisionImg(sessionID, imgName);
        console.log(oneImg)
        const imgPath = uploadPath + oneImg.imgName;
        callback(errors, imgPath)
    }

    exports.manageMultipleFileDownload = async function(sessionID, callback) {
        const errors = [];
        const imgArrayPath = [];
        const imgArrayObjects = await fileRepository.getAllCollisionImg(sessionID);

        imgArrayObjects.forEach(imgObject => {
            imgArrayPath.push({
                name: imgObject.imgName,
                path: uploadPath + imgObject.imgName
            })
        })
        console.log(imgArrayPath, 'Array with path and name? ')
        callback(errors, imgArrayPath);
        //     [{
        //         path: uploadPath + '/1651508580390obstacle.png',
        //         name: '1651508580390obstacle.png'
        //     },
        //     {
        //         path: uploadPath + '/1651511981320obstacle.png',
        //         name: '1651511981320obstacle.png'
        //     },
        //     {
        //         path: uploadPath + '/1651511983024obstacle.png',
        //         name: '1651511983024obstacle.png'
        //     }
        // ]

    }

    return exports
}