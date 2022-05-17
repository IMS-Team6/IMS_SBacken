const path = require('path');
const fs = require('fs');

module.exports = function() {
    const exports = {};

    exports.uploadPath = function() {

        const uploadPath = path.join(__dirname, 'uploads') + '/';

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        };

        return uploadPath
    }

    exports.errorTranslation = function(error_arr) {

        const errorTranslations = {
            sessionIDNotANumerciStr: 'SessionID must be a numeric string',
            positionMustNotBeNull: 'Position X and Y must not be null',
            positionWrongType: 'Invalid datatype for position X,Y should be numbers',
            sessionIDNotExist: 'Session does not exist',
            checkYourRequest: 'Bad request, check payload data',
            collisionIsBoolean: '"collision" must be boolean',
            collisionMustExist: '"collision" must exist in the object',
            robotStateMustExist: '"robotState" must exist',
            positionsMustExist: '"positions" must exist',
            fileSizeLimit: 'File size is too big, max size 2MB',
            fileTypeNotSupported: 'File type is not supported',
            collisionsAtMustExist: 'collisionsAt must exist',
            invalidImageKey: 'Invalid image key, must be "collisionImg"',
            internalError: 'Internal server error',
            imageDoesNotExist: 'No image or image object found',
            wrongRobotState: 'Session with provided sessionId has state STOP, create new session',
            positionTypeIsNotInteger: 'Postion X or  Y is not an rounded number, Integer',
            inavlidFileSignature: 'Invalid file signature, corrupt image',
            sessionDoesNotExist: 'This session does not exist',
            sessionsDoNotExist: 'There are currently no sessions',
            cannotUploadImgToStoppedSession: 'Unable to upload image to a session with "robotState" STOP',
            robotSateIncorrect: 'Incorrect "robotState", must be explicitly START, STOP or MOVING'
        }

        const errorMessages = error_arr.map(e => errorTranslations[e]);

        return errorMessages;
    };
    return exports;
}