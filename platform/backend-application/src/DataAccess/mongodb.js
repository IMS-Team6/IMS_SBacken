const { MongoClient } = require("mongodb");




//***************Is going to be useful when migrating to dedicated host*********** */
// Replace the following with values for your environment.
const username = encodeURIComponent("root"); 
const password = encodeURIComponent("password"); 
const clusterUrl = "localhost:27017"; 
const authMechanism = "DEFAULT"; 
// Replace the following with your MongoDB deployment's connection string.
//***************Is going to be useful when migrating to dedicated host*********** */



const uri = "mongodb://root:password@mongodb:27017/admin"
  //`mongodb+srv://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`;


// Create a new MongoClient
const client = new MongoClient(uri);


//Test the connection to server, check log!
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("mongodb").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    console.log("Close connection");
    await client.close();
  }
}

run();

  module.exports = client;