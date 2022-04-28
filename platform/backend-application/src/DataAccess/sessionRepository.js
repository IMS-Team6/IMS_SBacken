const { query } = require('express')

const dbClient = require('./mongodb')

module.exports = function() {
    const exports = {};
    // Returns array of sessions with sessionID, robotState, collision true||false
    exports.getSessions = async function() {
        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("session");
        const result = await sessions.find({}).project({ sessionID: 1, robotState: 1, collision: 1 }).toArray();

        dbClient.close();
        return result;
    }

    exports.getSessionWithID = async function(thisSessionID) {
        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("session");
        const result = await sessions.findOne({ sessionID: thisSessionID });

        dbClient.close();
        return result;
    }

    //Call this function on robotState: START
    exports.createSession = async function(sessionData) {
        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("session");
        //This duplicates the entier object from mongoDB without _id
        var duplicate = await sessions.find({ sessionID: '' }, { _id: 0 });

        // Set the values from sessinData to the duplicated object
        duplicate.sessionID = sessionData.sessionID;
        // duplicate.robotState = sessionData.robotState;
        // duplicate.positions.posX.push(sessionData.positions.posX);
        // duplicate.positions.posY.push(sessionData.positions.posY);

        // Insert the duplicated object, mongoDB will generate new unique _id (Not to be confused with sessionID)
        await sessions.insert(duplicate);

        const result = await sessions.find({}).toArray();

        dbClient.close();
        return result;
    }

    exports.insertPositions = async function(sessionData) {
        //This is mock data
        sessionDataMock = {
            sessionID: '123',
            robotState: 'Moving',
            positions: {
                posX: 1,
                posY: 2
            }
        };

        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("session");
        const result = await sessions.updateOne({ sessionID: sessionDataMock.sessionID }, { $push: { "positions.posX": sessionDataMock.positions.posX, "positions.posY": sessionDataMock.positions.posY } });
        dbClient.close();
        return result
    }

    exports.collisionOccured = async function(collisionData) {
        //This is mock data
        collisionDataMock = {
            sessionID: '123',
            collisionPos: {
                collX: 1,
                collY: 2
            }
        };
        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("session");
        const result = await sessions.updateOne({ sessionID: collisionDataMock.sessionID }, { $push: { "collisionPos.collX": collisionDataMock.collisionPos.collX, "collisionPos.collY": collisionData.collisionPos.collY } });

        dbClient.close();
        return result
    }





    return exports

}