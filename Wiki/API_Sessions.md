# Sessions API Doccumentation:

Defenition of a session:

    - A sessions can be created only once
    - Each session is unique
    - A sessions has a begging("START") and ending("STOP")  
    - A sessions contains all events initiated during its lifespan 

| Table of content:  |
------------------------------
[Get Session](#get-session)
[Get Sessions](#get-sessions)
[Post Session](#post-session)

URI: http://3.72.195.76/api/PATH <br>

| TYPE | PATH | Description                                         |
| ---- | -------------------- | ----------------------------------- |
| GET  | sessions             | Returns an Array[] with Objects of "sessions", a sessions contains sessionID: String, robotStatus: String, collision: Boolean |
| GET  | session/${sessionID} | Returns an session Object with all attributes   |
| POST | session/${sessionID} | Writes positions sent from robot, with current state and collision  |

<br>


## ----------- GET *Sessions* -----------

| TYPE | URL                     | PATH                 |
| ---- | ----------------------- | -------------------- |
| GET  | http://3.72.195.76/api/ | session/${sessionID} |

| Postman examle                        | Additional setting |
| ------------------------------------- | ------------------ |
| http://3.72.195.76/api/session/123456 | Not required!      |



| Key        | Value                    | Data Type | Purpose                                    |
| ---------- | ------------------------ | --------- | ------------------------------------------ |
| SessionID  | '1234... numeric string' | String    | Unique session identifier                  |
| robotState | "START", "STOP","MOVING" | String    | Robot current state                        |
| collision  | True or False            | Boolean   | Easy check if sessions contains collisions |

Description: In order to fetch positions from previous sessions and not only the latests
The request returns a list with session objects. The data looks like this: 

```json
[
    {
        "_id": "626ef4eef436caf350f32187", // This should not be returned! Although left for debug purpose
        "sessionID": "987654",             
        "robotState": "",                  
        "collision": false                 
    },
    {
        "_id": "626ef4eef436caf350f32188",
        "sessionID": "123456",             // Use this sessionID to get mock data
        "robotState": "Moving",
        "collision": true
    }
]
```


## ----------- GET *session* -----------

| TYPE | URL                     | PATH                 |
| ---- | ----------------------- | -------------------- |
| GET  | http://3.72.195.76/api/ | session/${sessionID} |

| Postman examle                        | Additional setting |
| ------------------------------------- | ------------------ |
| http://3.72.195.76/api/session/123456 | Not required!      |



| Key          | Value                    | Data Type     | Purpose                                                                    |
| ------------ | ------------------------ | ------------- | -------------------------------------------------------------------------- |
| SessionID    | '1234... numeric string' | String        | Unique session identifier                                                  |
| robotState   | "START", "STOP","MOVING" | String        | Robot current state                                                        |
| collision    | True or False            | Boolean       | Easy check if sessions contains collisions                                 |
| positions    | {posX[], posY[]}         | Object{[],[]} | Returns object with positions X and Y                                      |
| posX         | [1,2,3,4]                | Array[Int]    | Returns Array[] with Integer values for position X                         |
| posY         | [9,8,7,6]                | Array[Int]    | Returns Array[] with Integer values for position Y                         |
| collisionPos | {collX[], collY[]}       | Object{[],[]} | Returns objects with positions X and Y where collisions occured            |
| collX        | [1,2,3,4]                | Array[Int]    | Returns Array[] with Integer values for position X where collision occured |
| collY        | [9,8,7,6]                | Array[Int]    | Returns Array[] with Integer values for position Y where collision occured |

Description: To make it possible to draw robot path and collisions, the request fetches specified session using sessionID.
The request returns the entire session Object and it's attributes.

```json
{
    "_id": "626ef4eef436caf350f32188",  
    "sessionID": "123456",              
    "robotState": "Moving",             
    "positions": {                      
        "posX": [0,1,1,0,],             
        "posY": [0,1,2,3,]              
    },
    "collision": true,                  
    "collisionPos": {                   
        "collX": [1,0,-2,],             
        "collY": [1,3,2]                
    }
}
```

## ----------- POST *session* -----------

| TYPE | URL                     | PATH                 |
| ---- | ----------------------- | -------------------- |
| POST | http://3.72.195.76/api/ | session/${sessionID} |

| Postman examle                        | Additional setting                       |
| ------------------------------------- | ---------------------------------------- |
| http://3.72.195.76/api/session/123456 | Headers: Content/type : application/json |
|                                       | Body : Raw : JSON                        |

***NOTE! sessionID is passed in the URI***

| Key        | Value                    | Data Type | Purpose                               |
| ---------- | ------------------------ | --------- | ------------------------------------- |
| robotState | "START", "STOP","MOVING" | String    | Robot current state                   |
| positions  | {posX:1, posY:2}         | Object{}  | Returns object with positions X and Y |
| posX       | 1                        | Integer   | Returns Int value for position X      |
| posY       | 2                        | Integer   | Returns Int value for position Y      |
| collision  | True or False            | Boolean   | Collision occured                     |


#Follow these steps
![alt text](https://github.com/IMS-Team6/IMS_SBackend/blob/main/Wiki/media/postman_01.png)

Description: Robot should generate a sessionID only once it starts the first time, the sessionID is passed in the POST request!
The request must contain all values as in this object. sessionID must be a String consisting only of numbers 0-9!

```json
{   
    "robotState":"Moving",      
    "positions":{               
        "posX":9,              
        "posY":9               
    },
    "collision":true           
}
```

## ----------- API Mockup -----------
![alt text](https://github.com/IMS-Team6/IMS_SBackend/blob/main/Wiki/media/API_Mockups_sessions.png)