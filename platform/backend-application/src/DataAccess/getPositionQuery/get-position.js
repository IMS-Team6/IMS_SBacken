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

    return exports
}

// /*
// sessionID: One uniqie ID should be generated each time(session) robot is started. Should be generated only once a session
// robotState: When robot is ON, send a START state. While moving a MOVING state. When sessions ends an END/STOP state
// positions{}: I would argue that the object looks more readable whith the positions object. No other reasons for this object :P,
// posX, posY: Send position x and position y
// */
// // When sending positions, use the following object in the POST/PUT/PATCH request
// const sendPosition = {
//     sessionID: '',      //  datatype String
//     roboteState: '',    //  datatype String
//     positions: {        //  datatype Obejct
//         posX:1,         //  datatype Int,Float
//         posY:2,         //  datatype Int,Float
//     },
// }



// /*
// sessionID: Same sessionID as in positions. 
// collision: 
// collisionPos{}: I would argue that the object looks more readable whith the positions object. No other reasons for this object :P,
// collX, collY: Send position x and position y where the collision occured
// collisionImg: Attach image file when collision occures 
// */  
// // When collision Occures, use the following object in the POST/PUT/PATCH request
// const sendCollision = {
//     sessionID: '',           // Use the same sessionID as in sendPosition
//     collision: true,         // datatype Boolean 
//     collisionPos: {          // datatype Object
//         collX:1,              // datatype Int,Float
//         collY:2,              // datatype Int,Float
//     },          
//     collisionImg: Imagefile.jpg, // attached image file. 
// }

// /*
// To make everyone's life easier, sending a list of sessions with their ID should make the process of fetching specific sessions 
// much easier. The state should tell you whatever the robot has STARTED, MOVING or STOPPED/END, this allows you to select a session
// and draw the PATH. Collisions TRUE or FALSE should allow you to get collision image(s)
// */
// // GET request with a list of 10 latest sessions, their ID, State and if collisions occurred
// const getListOfSessions = {
//     collection: [                   // datatype Array 
//         {                  
//         sessionID:'',               // datatype String
//         robotState:'',              // datatype String
//         collisions: true ||false    // datatype Boolean
//     },
//     {
//         sessionID:'',               
//         robotState:'',
//         collisions: true ||false 
//     },
// ],
// }
// /* 
// Using the list above, you should be able to get a specific session with session ID. Robot state to be handles appropriately. positions 
// objects contains positions X and Y. These are stored simultaneously, meaning that posX[i] and posY[i] belong to same coordinate.
// collisions tells whatever there are any collisions in the selected session. (This could key could be delete, open for discussion)
// arguably using collisionPos and checking whatever it exits... 
// collisionPos returns positions for the occurred collisions in the selected session.
// */
// // GET a selected sessions with ID,
// const getSessionWithID = {
//     sessionID:'',                   // datatype String
//     robotState:'',                  // datatype String
//     positions: {                    // datatype Object
//         posX: [1,],                 // datatype Array[Int || Float]
//         posY: [2,],                 // datatype Array[Int || Float]
//     },
//     collisions: true || false,      // datatype Boolean
//     collisionPos:undefined ||{      // datatype Object
//         collX:[1,],                 // datatype Array[Int || Float]
//         collY:[2,],                 // datatype Array[Int || Float]
//     },
// }


/*
The idea is to GET collision image, it's description and position where it occurred. Although a session might have multiple collisions
therefor it feel like it's more appropriate to get all collision images in one session. Have to figure this one out, testing needs to
be done before we can say for sure. This gives you a rough idea how it might look.
*/
//GET a selected collision image
// const getCollisonImage = {  
//     [                               
//         {                        
//             sessionID:'',           
//             collisionImg: imageFile,
//             collisionOccuredAtPos:{
//                 collX: 1,
//                 collY: 2,
//             },
//             imgDescription: 'google API'
//         },
//     ]
// }