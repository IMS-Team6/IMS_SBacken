module.exports = function() {
    const exports = {};

    exports.validateSessionID = function(sessionData) {
        const error = [];
        const regex = /^[0-9]*$/;
        if (typeof sessionData != 'string' && regex.test(sessionData)) {
            error.push("sessionIDNotANumerciStr");
        };
        return error;
    }

    exports.validateSessionData = function(sessionData) {
        const error = [];
        if (sessionData.positions == null || undefined) {
            error.push("positionsMustExist");
            return error
        };
        if (sessionData.positions.posX == null || sessionData.positions.posY == null) {
            error.push("positionMustNotBeNull");
        } else if (sessionData.positions.posX == NaN || sessionData.positions.posY == NaN) {
            error.push("positionWrongType");
        };
        if (typeof sessionData.robotState == (null || undefined)) {
            error.push("robotStateMustExist");
        };
        if (sessionData.collision == null || undefined) {
            error.push("collisionMustExist");
        } else if (typeof sessionData.collision != 'boolean') {
            error.push("collisionIsBoolean");
        };
        return error;
    }
    return exports;
}