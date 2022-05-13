# Sessions API Doccumentation:

Defenition of a cillision image:
    - An collision image is captured when a "collision" occures
    - collision image is captured at certain coordinates

URI: http://3.72.195.76/api/${PATH}

TYPE  | PATH                |   Description
------|---------------------|------------
GET   |  collisionImg/${sessionID}                       |   **Returns** an Array[] with all   with the unique sessionID
GET   |  download/collisionImg/${sessionID}              |   **Downloads** a collection of all images with sessionID, compressed in .zip file
GET   |  collisionImg/${sessionID}/${ImgName}            |   **Returns** specific Objects "collisionImg" from a session with unique ImgName
GET   |  download/collisionImg/${sessionID}/${ImgName}   |   **Downloads** a specific image 
POST  |  upload/${sessionID}  |   Writes image to server and it's positions  


# ----------- POST *collisionImg* -----------

TYPE  | URL | PATH              
------|-----|--------
POST   |  http://3.72.195.76/api/ | upload/${sessionID}   

Postman examle| Additional setting |
-----|--------|--------------------|
POST | http://3.72.195.76/api/upload/123456 | Headers: Content/type : application/json |
||| Body |
---|------------------|
||| collisionImg: file: 


***NOTE! sessionID is passed in the URI***

Key | Value | Data Type | Purpose 
----|-------|----------|---------
collisionImg | some_img.jpeg | File: png, jpeg, jpg |  |
posX | 1 | Integer | Returns Int value for position X | 
posY | 2 | Integer | Returns Int value for position Y |
collision | True or False | Boolean | Collision occured | 

Python Example
```
payload={
  'posX': '13',
  'posY': '15'
  }
files=[
  ('collisionImg',('obstacle.png',open('/C:/Users/Dejansky/Desktop/obstacle.png','rb'),'image/png'))
]
headers = {
  'Content-Type': 'application/json'
}
```


# ----------- GET *collision images* (multi) -----------

TYPE  | URL | PATH              
------|-----|--------
GET   |  http://3.72.195.76/api/ | collisionImg/${sessionID} |
GET   |  http://3.72.195.76/api/ | /download/collisionImg/${sessionID} |

Postman examle| Additional setting |
--------------|--------------------|
| http://3.72.195.76/api/collisionImg/123456 |Not required! |


GET   |  http://3.72.195.76/api/ | collisionImg/${sessionID}
-----------------------------------------------------------|
Key | Value | Data Type | Purpose 
----|-------|----------|---------
SessionID | '1234... numeric string' | String | Unique session identifier |
robotState | "START", "STOP","MOVING"| String | Robot current state |
collision | True or False | Boolean | Easy check if sessions contains collisions | 
collisionsAt | {posX, posX} | Object{Int,Int} | Returns objects with positions X and Y where collisions occured |
posX | 1 | Int | Returns Integer value for position X where collision image was capture | 
posY | 2 | Int | Returns Integer value for position Y where collision image was capture|

The request returns a list with all collisionImg objects with ${sessionID}. The data looks like this: 

```
[
     {
        "_id": "627d800603e8a09950e6d1e7",
        "sessionID": "123456",
        "collisionsAt": {
            "posX": "13",
            "posY": "15"
        },
        "imgName": "123456_1652391941122_Screenshot_3.jpg"
    },
    {
        "_id": "627d829903e8a09950e6d1eb",
        "sessionID": "123456",
        "collisionsAt": {
            "posX": "13",
            "posY": "15"
        },
        "imgName": "123456_1652392601182_obstacle.png"
    },...
]
```


# ----------- GET *collision images* (multi) -----------

TYPE  | URL | PATH              
------|-----|--------
GET   |  http://3.72.195.76/api/ | collisionImg/${sessionID} |
GET   |  http://3.72.195.76/api/ | /download/collisionImg/${sessionID} |

Postman examle| Additional setting |
--------------|--------------------|
| http://3.72.195.76/api/collisionImg/123456 |Not required! |


GET   |  http://3.72.195.76/api/ | collisionImg/${sessionID}/${imgName}
-----------------------------------------------------------|
Key | Value | Data Type | Purpose 
----|-------|----------|---------
SessionID | '1234... numeric string' | String | Unique session identifier |
collisionsAt | {posX, posX} | Object{Int,Int} | Returns objects with positions X and Y where collisions occured |
posX | 1 | Int | Returns Integer value for position X where collision image was capture | 
posY | 2 | Int | Returns Integer value for position Y where collision image was capture|

The request returns single collisionImg object with ${sessionID} and ${imgName}. The data looks like this: 

```
     {
        "_id": "627d800603e8a09950e6d1e7",
        "sessionID": "123456",
        "collisionsAt": {
            "posX": "13",
            "posY": "15"
        },
        "imgName": "123456_1652391941122_Screenshot_3.jpg"
    }
```
