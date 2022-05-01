module.exports = function() {
    const exports = {};

    exports.validateSessionID = function(sessionData) {
        const error = [];
        const regex = /^[0-9]*$/;
        if (typeof sessionData != 'string' && regex.test(sessionData)) {
            error.push("sessionIDNotAStr");
        };
        return error;
    }

    exports.validateSessionPositions = function(sessionData) {
        const error = [];
        if ((sessionData.positions.posX || sessionData.positions.posY) == null) {
            error.push("positionMustNotBeNull");
        } else if ((sessionData.posX || sessionData.posY) == NaN) {
            error.push("positionWrongType");
        };
        return error;
    }
    return exports;
}