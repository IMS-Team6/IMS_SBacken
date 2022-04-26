const { query } = require('express')

const dbClient = require('./mongodb')


module.exports = function() {
    const exports = {}

    //This is a test function!
    exports.getPosition = async function () {
        await dbClient.connect();
        const users = dbClient.db("mongodb").collection("position")
        var result = await users.findOne();

        dbClient.close();
        return result;
    }

    exports.postSession = async function () {
        await dbClient.connect();
        const users = dbClient.db("mongodb").collection("position")
        var result = await users.insetOne()

        dbClient.close();
        return result;
    }




    return exports
    
}