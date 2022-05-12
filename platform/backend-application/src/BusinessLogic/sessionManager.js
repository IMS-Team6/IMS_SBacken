module.exports = function({ sessionValidation, sessionRepository }) {

    const exports = {};


    exports.manageGetSessions = async function(callback) {
        const errors = [];
        const getSessions = await sessionRepository.getSessions(errors);
        callback(errors, getSessions);
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
        const getSessionId = await sessionRepository.getSessionRobotState(sessionData.sessionID);
        callback(errors, getSessionId);
        return;

    };

    exports.managePostSessionData = async function(sessionData, callback) {
        const errors = [];
        sessionValidation.validateSessionData(sessionData).forEach(error => {
            console.log("Errors while validating sessionData!")
            errors.push(error);
        });
        sessionValidation.validateSessionID(sessionData).forEach(error => {
            console.log("Errors while validating sessionID!")
            errors.push(error);
        });

        if (errors.length > 0) {
            callback(errors, null);
            return;
        }

        const exists = await sessionRepository.getSessionWithID(sessionData.sessionID)
        if (!exists) {

            console.log("Session exists!!!!")
            const createSessionId = await sessionRepository.createSessionWithID(sessionData);
            callback(errors, createSessionId);
            return;
        }
        const writePosition = await sessionRepository.writePositions(sessionData);
        
        if(writePosition.length > 0){
            console.log("After writing positions..")
            writePosition.forEach(error => {
                errors.push(error);
                callback(errors, null);
                return;
        });
        callback(errors, writePosition);
        return;
    };

    // exports.manageGetSessionRobotState = async function(sessionData, callback) {
    //     const errors = [];
    //     positionValidation.validateSessionID(sessionData).forEach(error => {
    //         errors.push(error);
    //     });
    //     if (errors.length > 0) {
    //         callback(errors, null);
    //         return;
    //     }
    //     try {
    //         //const getState = await sessionRepository.getSessionRobotState(sessionData);
    //         const previousState = await sessionRepository.getSessionWithID(errors);
    //         if (getState == previousState) {
    //             callback(null, "Move");
    //         } else
    //             callback(null, "Stop");
    //         return;

    //     } catch (error) {
    //         callback(error, null)
    //     }
    }
    return exports;
}