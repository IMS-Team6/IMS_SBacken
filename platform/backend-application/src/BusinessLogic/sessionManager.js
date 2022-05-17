module.exports = function({ sessionValidation, sessionRepository }) {

    const exports = {};


    exports.manageGetSessions = async function(callback) {
        const errors = [];
        const getSessions = await sessionRepository.getSessions(errors);

        if (getSessions[0] != undefined) {
            if (typeof getSessions[0] == "string") {
                getSessions.forEach(error => {
                    errors.push(error)
                })
                callback(errors, null)
                return
            }
        }
        callback([], getSessions)
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
        if (getSessionId && getSessionId.length > 0) {
            errors.push(getSessionId)
            callback(errors, null);
            return;
        }
        callback([], getSessionId)
        return;


    };

    exports.managePostSessionData = async function(sessionData, callback) {
        const errors = [];

        sessionValidation.validateSessionData(sessionData).forEach(error => {
            errors.push(error);
        });

        sessionValidation.validateSessionID(sessionData.sessionID).forEach(error => {
            errors.push(error);
        });

        if (errors.length > 0) {
            callback(errors, null);
            return;
        }

        const response = await sessionRepository.getSessionWithID(sessionData.sessionID)
        if (response && response.length > 0) {
            const createSessionId = await sessionRepository.createSessionWithID(sessionData);
            callback([], createSessionId);
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