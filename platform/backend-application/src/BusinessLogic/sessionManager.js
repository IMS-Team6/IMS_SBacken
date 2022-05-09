module.exports = function({ positionValidation, database }) {

    const exports = {};


    exports.manageGetSessions = async function(callback) {
        const errors = [];
        const getSessions = await database.getSessions(errors);
        callback(errors, getSessions);
        return;
    };

    exports.manageGetSessionWithID = async function(sessionData, callback) {
        const errors = [];
        positionValidation.validateSessionID(sessionData).forEach(error => {
            errors.push(error);
        });
        if (errors.length > 0) {
            callback(errors, null);
            return;
        }
        const getSessionId = await database.getSessionWithID(sessionData);
        callback(errors, getSessionId);
        return;

    };

    exports.managePostSessionData = async function(sessionData, callback) {
        const errors = [];
        positionValidation.validateSessionData(sessionData).forEach(error => {
            errors.push(error);
        });
        positionValidation.validateSessionID(sessionData).forEach(error => {
            errors.push(error);
        });

        if (errors.length > 0) {
            callback(errors, null);
            return;
        }

        const exists = await database.getSessionWithID(sessionData.sessionID)
        if (!exists) {
            const createSessionId = await database.createSessionWithID(sessionData);
            callback(errors, createSessionId);
            return;
        }
        const writePosition = await database.writePositions(sessionData);
        callback(errors, writePosition);
        return;

    };


    return exports;

}