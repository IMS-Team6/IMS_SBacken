const { query } = require('express')

const dbClient = require('./mongodb')

module.exports = function() {
    const exports = {}

    //This is a test function!
    exports.getSessions = async function() {
        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("session");
        const result = await sessions.find({}).project({ sessionID: 1, robotState: 1, collision: 1 }).toArray();

        dbClient.close();
        return result;
    }

    exports.getSessionWithID = async function(thisSessionID) {
        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("session")
        const result = await sessions.findOne({ sessionID: thisSessionID })

        dbClient.close();
        return result;
    }

    //Call this function on robotState: START
    exports.createSession = async function(sessionData) {
        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("session");
        var duplicate = await sessions.find({ sessionID: '' }, { _id: 0 });

        //Should
        duplicate.sessionID = sessionData.sessionID

        await sessions.insert(duplicate);

        const result = await sessions.find({}).toArray();

        dbClient.close();
        return result;
    }

    exports.insertPositions = async function(sessionData) {
        //This is mock data
        sessionData = {
            sessionID: '123',
            positions: {
                posX: 1,
                posY: 2
            }
        }

        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("session");
        await sessions.updateOne({ sessionID: sessionData.sessionID }, { $push: { "positions.posX": sessionData.positions.posX, "positions.posY": sessionData.positions.posY } });

        return
    }

    exports.collisionOccured = async function(collisionData) {
        //This is mock data
        collisionData = {
            sessionID: '123',
            collisionPos: {
                collX: 1,
                collY: 2
            }
        }
        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("session");
        await sessions.updateOne({ sessionID: collisionData.sessionID }, { $push: { "collisionPos.collX": collisionData.collisionPos.collX, "collisionPos.collY": collisionData.collisionPos.collY } });

        return
    }





    return exports

}