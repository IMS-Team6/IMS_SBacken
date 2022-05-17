const { query } = require('express');
const dbClient = require('./connectMongodb');

module.exports = function() {
    const exports = {};
    // Returns array of sessions with sessionID, robotState, collision true||false
    exports.getSessions = async function() {
        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("session");

        try {
            const result = await sessions.find({}).project({ sessionID: 1, robotState: 1, collision: 1, _id: 0 }).toArray();

            dbClient.close();
            if (result) {
                return result;
            } else {
                return ["sessionsDoNotExist"]

            }
        } catch {
            return ["internalError"]

        }
    }

    exports.getSessionWithID = async function(thisSessionID, callback) {
        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("session");


        try {
            const result = await sessions.findOne({ sessionID: thisSessionID });
            dbClient.close();

            if (result) {
                return result;
            } else {
                return ["sessionDoesNotExist"]
            }
        } catch {
            return ["internalError"]

        }

    };

    exports.getSessionWithIDAndState = async function(sessionID) {
        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("session");


        try {
            const resolved = await sessions.findOne({ sessionID: sessionID });
            dbClient.close();
            console.log(resolved, '????????')
            if (resolved && resolved.robotState == "STOP") {
                return ["cannotUploadImgToStoppedSession"];
            } else if (!resolved) {
                return ["sessionDoesNotExist"]
            }
            return resolved;
        } catch {
            return ["internalError"]

        }

    };

    //Call this function on robotState: START
    exports.createSessionWithID = async function(sessionData) {
        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("session");
        //This duplicates the entier object from mongoDB without _id
        var duplicate = await sessions.findOne({ sessionID: '987654' });
        // Set the values from sessinData to the duplicated object
        delete duplicate['_id']
        duplicate.sessionID = sessionData.sessionID;
        duplicate.robotState = sessionData.robotState;
        duplicate.collision = sessionData.collision;
        duplicate.positions.posX.push(sessionData.positions.posX);
        duplicate.positions.posY.push(sessionData.positions.posY);
        if (sessionData.collision === true) {
            duplicate.collisionPos.collX.push(sessionData.positions.posX);
            duplicate.collisionPos.collY.push(sessionData.positions.posY);
        }

        // Insert the duplicated object, mongoDB will generate new unique _id (Not to be confused with sessionID)
        const resultX = await sessions.insertOne(duplicate);

        dbClient.close();
        return resultX;
    };

    exports.writePositions = async function(sessionData) {

        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("session");

        let foundSession = await sessions.findOne({ sessionID: sessionData.sessionID })

        if (foundSession) {
            if (foundSession.robotState == "STOP" && (sessionData.robotState == "START" || sessionData.robotState == "MOVING" || sessionData.robotState == "STOP")) {
                return ["wrongRobotState"];
            }
        }

        try {
            let query = {};
            if (sessionData.collision === true) {
                query = { $set: { robotState: sessionData.robotState, collision: sessionData.collision }, $push: { "positions.posX": sessionData.positions.posX, "positions.posY": sessionData.positions.posY, "collisionPos.collX": sessionData.positions.posX, "collisionPos.collY": sessionData.positions.posY } };
            } else {
                query = { $set: { robotState: sessionData.robotState }, $push: { "positions.posX": sessionData.positions.posX, "positions.posY": sessionData.positions.posY } };
            };
            const result = await sessions.updateOne({ sessionID: sessionData.sessionID }, query);
            dbClient.close();
            return result;
        } catch {
            return ["internalError"]
        }
    };

    exports.updateCollisionImgStatus = async function(thiSessionID) {

        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("session");

        try {
            const query = { $set: { collisionImgExists: true } };
            const result = await sessions.updateOne({ sessionID: thiSessionID }, query);
            dbClient.close();
            return result;
        } catch {
            return ["internalError"]
        }
    };

    return exports;

}