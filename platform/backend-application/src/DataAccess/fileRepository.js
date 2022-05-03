const { query } = require('express');
const dbClient = require('./connectMongodb');

module.exports = function() {
    const exports = {};

    exports.insertCollisionImg = async function(sessionID, fields, imgName) {
        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("collisonImg");
        //This duplicates the entier object from mongoDB without _id
        var collisionImg = await sessions.findOne({ sessionID: '' }, { _id: 0 });
        // Set the values from sessinData to the duplicated object
        delete collisionImg['_id']
        console.log(fields, 'from REpo')
        collisionImg.sessionID = sessionID;
        collisionImg.collisionsAt.posX = fields.posX;
        collisionImg.collisionsAt.posY = fields.posY;
        collisionImg.imgName = imgName;

        // Insert the duplicated object, mongoDB will generate new unique _id (Not to be confused with sessionID)
        const resultX = await sessions.insertOne(collisionImg);

        dbClient.close();
        return resultX;
    };

    exports.getAllCollisionImg = async function(sessionID) {
        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("collisonImg");
        //This duplicates the entier object from mongoDB without _id
        const result = await sessions.find({ sessionID: sessionID }).toArray();

        dbClient.close();
        return result;
    };

    exports.getOneCollisionImg = async function(sessionID, imgName) {
        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("collisonImg");
        //This duplicates the entier object from mongoDB without _id
        var result = await sessions.findOne({ sessionID: sessionID, imgName: imgName }, { _id: 0 });

        dbClient.close();
        return result;
    };



    return exports;

}