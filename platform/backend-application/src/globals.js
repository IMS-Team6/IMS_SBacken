module.exports = function() {
    const exports = {};

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
            positionsMustExist: 'Positions must exist'
        }

        const errorMessages = error_arr.map(e => errorTranslations[e]);

        return errorMessages;
    };
    return exports;
}