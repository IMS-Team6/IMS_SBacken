module.exports = function({ positionValidation, database }) {

    const exports = {};


    exports.manageGetSessions = async function(callback) {
        const errors = [];
        const x = await database.getSessions(errors);
        callback(errors, x);
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
        const x = await database.getSessionWithID(sessionData);
        callback(errors, x);
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
            const x = await database.createSessionWithID(sessionData);
            callback(errors, x);
            return;
        }
        const x = await database.writePositions(sessionData);
        callback(errors, x);
        return;

    };


    return exports;

}