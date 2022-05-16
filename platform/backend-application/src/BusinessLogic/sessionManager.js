module.exports = function({ sessionValidation, sessionRepository }) {

    const exports = {};


    exports.manageGetSessions = async function(callback) {
        const errors = [];
        const getSessions = await sessionRepository.getSessions(errors);
        callback(errors, getSessions);
        return;
    };

    exports.manageGetSessionWithID = async function(sessionID, callback) {
        const errors = [];
        sessionValidation.validateSessionID(sessionID).forEach(error => {
            errors.push(error);
        });
        if (errors.length > 0) {
            callback(errors, null);
            return;
        }
        const getSessionId = await sessionRepository.getSessionWithID(sessionID);
        callback(errors, getSessionId);
        return;

    };

    exports.managePostSessionData = async function(sessionData, callback) {
        const errors = [];
        sessionValidation.validateSessionData(sessionData).forEach(error => {
            errors.push(error);
        });
        sessionValidation.validateSessionID(sessionData).forEach(error => {
            errors.push(error);
        });

        if (errors.length > 0) {
            callback(errors, null);
            return;
        }

        const exists = await sessionRepository.getSessionWithID(sessionData.sessionID)
        if (!exists) {
            const createSessionId = await sessionRepository.createSessionWithID(sessionData);
            callback(errors, createSessionId);
            return;
        }
        const writePosition = await sessionRepository.writePositions(sessionData);

        if (writePosition.length > 0) {
            writePosition.forEach(error => {
                errors.push(error);
            });

            callback(errors, null);
            return;
        };
        callback(errors, writePosition);
        return;
    }
    return exports;
}