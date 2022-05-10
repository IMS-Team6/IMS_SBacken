const { query } = require('express');
const dbClient = require('./connectMongodb');

module.exports = function() {
    const exports = {};

    exports.insertCollisionImg = async function(sessionID, collisionsAt, imgName) {
        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("collisonImg");
        //This duplicates the entier object from mongoDB without _id
        var collisionImg = await sessions.findOne({ sessionID: '' }, { _id: 0 });
        // Set the values from sessinData to the duplicated object
        delete collisionImg['_id']
        collisionImg.sessionID = sessionID;
        collisionImg.collisionsAt.posX = collisionsAt.posX;  //.posX
        collisionImg.collisionsAt.posY = collisionsAt.posY;
        collisionImg.imgName = imgName;

        try{
            // Insert the duplicated object, mongoDB will generate new unique _id (Not to be confused with sessionID)
            const resultX = await sessions.insertOne(collisionImg);
            dbClient.close();
            return resultX;
        }catch{
            return ["internalError"]
        }
    };

    exports.getAllCollisionImg = async function(sessionID) {
        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("collisonImg");
        
        try{
            //This duplicates the entier object from mongoDB without _id
            const result = await sessions.find({ sessionID: sessionID }).toArray();
            dbClient.close();
            return result;
        }catch{
            return ["internalError"]
        }

        
    };

    exports.getOneCollisionImg = async function(sessionID, imgName) {
        await dbClient.connect();
        const sessions = dbClient.db("mongodb").collection("collisonImg");

        try{
            //This duplicates the entier object from mongoDB without _id
            var result = await sessions.findOne({ sessionID: sessionID, imgName: imgName }, { _id: 0 });
            dbClient.close();
            return result;
        }catch{
            return ["internalError"]
        }

        
    };



    return exports;

}