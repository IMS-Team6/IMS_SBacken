#API Doccumentation:

URL: http://3.72.195.76/api/PATH

TYPE  | PATH                |   Description
------|---------------------|------------
GET   |  sessions           |   Returns an Array[] with Objects of "sessions", a sessions contains sessionID: String, robotStatus: String, collision: Boolean
GET   |  session/sessionID  |   Returns an session Object with all attributes
POST  |  session/sessionID  |   Writes positions sent from robot, must contain collision status (ture||false)


In Depth description:

TYPE  | PATH                
------|-------------
GET   |  sessions   

Postman: http://3.72.195.76/api/session/123456 
Additional Postman setting: Not required!

Description: In order to fetch positions from previous sessions and not only the latests
The request returns a list with session objects. The data looks like this: 
```
[
    {
        "_id": "626ef4eef436caf350f32187", // This should not be returned! Although left for debug purpose
        "sessionID": "987654",             // Use this to fetch specific session
        "robotState": "",                  // Use this state to handle current ongoing session
        "collision": false                 // Use this check to draw collisions
    },
    {
        "_id": "626ef4eef436caf350f32188",
        "sessionID": "123456",             // Use this sessionID to get mock data
        "robotState": "Moving",
        "collision": true
    }
]
```

TYPE  | PATH                
------|-------------
GET   |  session/sessionID(123456)

Postman: http://3.72.195.76/api/session/123456 
Additional Postman setting: Not required!  

Description: To make it possible to draw robot path and collisions, the request fetches specified session using sessionID.
The request returns the entire session Object and it's attributes.

```
{
    "_id": "626ef4eef436caf350f32188",  //Same as previously mentioned
    "sessionID": "123456",              //
    "robotState": "Moving",             //
    "positions": {                      // Use this object to target posX and posY, can be used as following: positions.posX[i]
        "posX": [0,1,1,0,],             // Positions X, latests position is last in list
        "posY": [0,1,2,3,]              // Positions Y, latests position is last in list
    },
    "collision": true,                  // Tells whatever there are any collisions in the session
    "collisionPos": {                   // Use this object to target collX and collX, can be used as following: collisionPos.collX[i]
        "collX": [1,0,-2,],             // Collision at position X, latests collision is last in list
        "collY": [1,3,2]                // Collision at position Y, latests collision is last in list
    }
}
```

TYPE  | PATH                
------|--------------------
POST  |  sessions/sessionID

Postman: http://3.72.195.76/api/session/123456 
Additional Postman setting: 
Body -> raw -> JSON  //Make sure to have "Body" selected. Send "raw" data in JSON format 

#Follow these steps
![alt text](https://github.com/IMS-Team6/IMS_SBackend/blob/development/Wiki/media/postman_01.png)

Description: Robot should generate a sessionID only once it starts the first time, the sessionID is passed in the POST request!
The request must contain all values as in this object.

```
{   
    "robotState":"Moving",      // Tells us the current state of robot
    "positions":{               // And object containing position X and Y 
        "posX":9,               // Position X in numeric value
        "posY":9                // Position Y in numeric value
    },
    "collision":true            // Current collision state, true or false
}
```