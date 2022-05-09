module.exports = function({ globals }) {
    const exports = {}

    exports.validateFile = function(file) {
        const error = [];
        const maxFileSize = 1024 * 1024 * 1; //Add to globals folder   
        const allowedExtensions = /(\jpg|\jpeg|\svg|\png)$/i;   // allowed image formats: jpg/jpeg/png/svg

        console.log('Validating file type...')
        
        if (!allowedExtensions.exec(file.mimetype)) {
            error.push('fileTypeNotSupported')
            console.log('filetype: ' + file.mimetype)
            return error
          }

          console.log('Validating file size...')
          console.log('filesize: ' + file.size)
        if (file.size > maxFileSize) {
            error.push('fileSizeLimit')
        }
        return error
    }

    exports.validateUploadData = function(collisionsAt) {
        const error = [];
        if (collisionsAt == null || undefined) {
            console.log('collisionsAt: ' + collisionsAt.posX)
            error.push("collisionsAtMustExist");
            return error
        };
        if (collisionsAt.posX == null || collisionsAt.posY == null) {
            error.push("positionMustNotBeNull");
        } else if (collisionsAt.posX == NaN || collisionsAt.posY == NaN) {
            error.push("positionWrongType");
        };
        return error;
    };

    return exports
}