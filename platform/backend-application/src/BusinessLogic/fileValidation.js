module.exports = function({ globals }) {
    const exports = {}

    exports.validateFile = function(files) {
        const error = [];
        const maxFileSize = 1024 * 1024 * 1; //Add to globals folder   
        const allowedExtensions = /(\jpg|\jpeg|\png)$/i; // allowed image formats: jpg/jpeg/png/svg

        if (!files.collisionImg) {
            error.push('fileTypeNotSupported')
            return
        }

        if (!allowedExtensions.exec(files.collisionImg.mimetype)) {
            error.push('fileTypeNotSupported')
            return error
        }

        if (files.size > maxFileSize) {
            error.push('fileSizeLimit')
        }
        return error
    }

    exports.validateUploadData = function(collisionsAt) {
        const error = [];
        if (collisionsAt == null || undefined) {
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