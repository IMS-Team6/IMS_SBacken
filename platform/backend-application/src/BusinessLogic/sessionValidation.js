module.exports = function() {
    const exports = {};

    exports.validateSessionID = function(sessionID) {
        const error = [];
        const regex = /^[0-9]*$/;

        if (typeof sessionID !== 'string' || !regex.test(sessionID)) {
            error.push("sessionIDNotANumerciStr");
        };
        console.log(error)
        return error;
    };

    exports.validateSessionData = function(sessionData) {
        const error = [];
        if (sessionData.positions == null || undefined) {
            error.push("positionsMustExist");
            return error;
        };
        if (sessionData.positions.posX == null || sessionData.positions.posY == null) {
            error.push("positionMustNotBeNull");
        } else if (sessionData.positions.posX == NaN || sessionData.positions.posY == NaN) {
            error.push("positionWrongType");
        } else if ((sessionData.positions.posX % 1) != 0 || (sessionData.positions.posY % 1) != 0) {
            error.push("positionTypeIsNotInteger");
        }
        console.log(sessionData, 'Session Data!!!')
        if (typeof sessionData.robotState == (null || undefined)) {
            error.push("robotStateMustExist");
        } else if (
            sessionData.robotState !== 'START' &&
            sessionData.robotState !== 'MOVING' &&
            sessionData.robotState !== 'STOP') {
            error.push("robotSateIncorrect");
        };
        if (sessionData.collision == null || undefined) {
            error.push("collisionMustExist");
        } else if (typeof sessionData.collision != 'boolean') {
            error.push("collisionIsBoolean");
        };
        return error;
    };

    return exports;
};