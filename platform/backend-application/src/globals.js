const path = require('path')

module.exports = function() {
    const exports = {};

    exports.uploadPath = function() {
        const uploadPath = path.join(__dirname, 'uploads') + '/';
        return uploadPath
    }

    exports.errorTranslation = function(error_arr) {

        const errorTranslations = {
            sessionIDNotANumerciStr: 'Session must be a string',
            positionMustNotBeNull: 'Position X and Y must not be null',
            positionWrongType: 'Wrong datatype for position X,Y',
            sessionIDNotExist: 'Session does not exist',
            checkYourRequest: 'Bad request, check for raw data in JSON',
            collisionIsBoolean: 'collision must be boolean',
            collisionMustExist: 'Collision must exist in the object',
            robotStateMustExist: 'Robot state must exist',
            positionsMustExist: 'Positions must exist',
            fileSizeLimit: 'File size is too big, max size 20MB',
            fileTypeNotSupported: 'File type is not supported',
            collisionsAtMustExist: 'Collision positions must exist',
            invalidImageKey: 'Wrong collision image key name',
            internalError: "Internal server error",
            imageDoesNotExist: "Image does not exist"
        }

        const errorMessages = error_arr.map(e => errorTranslations[e]);

        return errorMessages;
    };
    return exports;
}