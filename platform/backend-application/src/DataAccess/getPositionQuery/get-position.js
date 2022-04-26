const { query } = require('express')

const dbClient = require('../mongodb')


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

  exports.getPositionForMower = async function (){
      const positions = {
        Positions: {
            session_id: "", 
            session_duration:{
              start: "yyyy/m/d gtm+1", 
              stop: ""
            },
            x:[1], 
            y:[1]} 
      } 
      return positions
      }




    return exports
}