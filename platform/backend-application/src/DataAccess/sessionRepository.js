const { query } = require('express');
const dbClient = require('./connectMongodb');

module.exports = function() {
    const exports = {};
    // Returns array of sessions with sessionID, robotState, collision true||false
    exports.getSessions = async function() {
        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("session");
        const result = await sessions.find({}).project({ sessionID: 1, robotState: 1, collision: 1, _id: 0 }).toArray();

        dbClient.close();
        return result;
    }

    // exports.getSessionRobotState = async function(sessionID) {
    //     //return dbClient.serverStatus()
    //     await dbClient.connect()
    //     const sessions = dbClient.db("mongodb").collection("session");
    //     const result = await sessions.findOne({ robotState })
    //     console.log(result);
    //     dbClient.close();
    //     return result;
    // }

    exports.getSessionWithID = async function(thisSessionID) {
        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("session");
        const result = await sessions.findOne({ sessionID: thisSessionID });

        dbClient.close();
        return result;
    };
    //Call this function on robotState: START
    exports.createSessionWithID = async function(sessionData) {
        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("session");
        //This duplicates the entier object from mongoDB without _id
        var duplicate = await sessions.findOne({ sessionID: '987654'}, { _id: 0 });
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
        var dublicate = await sessions.findOne({ sessionID: sessionData.sessionID}, { _id: 0 });
        if(dublicate.robotState == "STOP" || sessionData.robotState == "START"){
            return ["wrongRobotState"];
        }

        let query = {};

        console.log("Trying to write positions...")
        if (sessionData.collision === true) {
            console.log("pushing X value ")
            query = { $set: { collision: sessionData.collision }, $push: { "positions.posX": sessionData.positions.posX, "positions.posY": sessionData.positions.posY, "collisionPos.collX": sessionData.positions.posX, "collisionPos.collY": sessionData.positions.posY } };
        } else {
            query = { $push: { "positions.posX": sessionData.positions.posX, "positions.posY": sessionData.positions.posY } };
        };
        const result = await sessions.updateOne({ sessionID: sessionData.sessionID }, query);

        console.log("writing result: " + result)
        dbClient.close();
        return result;
    };

    return exports;

}