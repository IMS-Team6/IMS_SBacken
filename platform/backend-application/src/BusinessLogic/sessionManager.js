module.exports = function({ sessionValidation, sessionRepository }) {

    const exports = {};


    exports.manageGetSessions = async function(callback) {
        const errors = [];
        const x = await sessionRepository.getSessions();
        callback(errors, x);
        return;
    };

    exports.manageGetSessionWithID = async function(sessionData, callback) {
        const errors = [];
        sessionValidation.validateSessionID(sessionData).forEach(error => {
            errors.push(error);
        });
        if (errors.length > 0) {
            callback(errors, null);
            return;
        }
        const x = await sessionRepository.getSessionWithID(sessionData);
        callback(errors, x);
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
            const x = await sessionRepository.createSessionWithID(sessionData);
            callback(errors, x);
            return;
        }
        const x = await sessionRepository.writePositions(sessionData);
        
        callback(errors, x);
        return;

    };


    return exports;

}