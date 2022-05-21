# Collision Image API Documentation:

Definition of a collision image:

    - An collision image is captured when a "collision" occurs
    - collision image is captured at certain coordinates

| Table of content:  |
----------------------
| [Post Collision Image](#post-collisionimg) |
| [Get Collision Images](#get-collision-images) |
| [Get Collision Image](#get-collision-image) |
| [Google Vision Classification](#google-vision-classification) |
| [API Mockup](#api-mockup) |

<br>

URI: http://3.72.195.76/api/${PATH} <br><br>

| TYPE | PATH                                          | Description                                                                      |
| ---- | --------------------------------------------- | -------------------------------------------------------------------------------- |
| GET  | collisionImg/${sessionID}                     | **Returns** an Array[] with all   with the unique sessionID                      |
| GET  | download/collisionImg/${sessionID}            | **Downloads** a collection of all images with sessionID, compressed in .zip file |
| GET  | collisionImg/${sessionID}/${ImgName}          | **Returns** specific Objects "collisionImg" from a session with unique ImgName   |
| GET  | download/collisionImg/${sessionID}/${ImgName} | **Downloads** a specific image                                                   |
| POST | upload/${sessionID}                           | Writes image to server and it's positions                                        |

<br>
<br>

## ----------- POST *collisionImg* -----------

| TYPE | URL                     | PATH                |
| ---- | ----------------------- | ------------------- |
| POST | http://3.72.195.76/api/ | upload/${sessionID} |

| Postman example                           | Additional setting                                         |
| ----------------------------------------- | ---------------------------------------------------------- |
| POST http://3.72.195.76/api/upload/123456 | Headers: Content/type : application/json                   |
|                                           | use the **Body** option and add Key and Value pairs bellow |


***NOTE! sessionID is passed in the URI***

| Key          | Value         | Data Type            | Purpose                          |
| ------------ | ------------- | -------------------- | -------------------------------- |
| collisionImg | some_img.jpeg | File: png, jpeg, jpg |                                  |
| posX         | 1             | Integer              | Returns Int value for position X |
| posY         | 2             | Integer              | Returns Int value for position Y |

Python Example:
```py

import requests
import json

# TODO: Replace ${someValues} with incoming data
# **Note** sessionID must exists
url = "http://3.72.195.76/api/upload/${sessionID}"

payload={
'posX': '${posX}',
'posY': '${posY}'
}
files=[
    #collisionImg is a key!            c:/path/to/image/theImg.jpeg      image/(png,jpeg,jpg)
  ('collisionImg',('${imageName}',open('${pathToImg}/${imageName}','rb'),'image/png'))
]
headers = {} # Keep the header empty

response = requests.request("POST", url, headers=headers, data=payload, files=files)

print(response.text) 
```
<br><br>

## ----------- GET *Collision Images* -----------

| TYPE | URL                     | PATH                               |
| ---- | ----------------------- | ---------------------------------- |
| GET  | http://3.72.195.76/api/ | collisionImg/${sessionID}          |
| GET  | http://3.72.195.76/api/ | download/collisionImg/${sessionID} |

| Postman example                                 | Additional setting |
| ----------------------------------------------- | ------------------ |
| GET  http://3.72.195.76/api/collisionImg/123456 | Not required!      |

| Key          | Value                    | Data Type       | Purpose                                                                |
| ------------ | ------------------------ | --------------- | ---------------------------------------------------------------------- |
| sessionID    | '1234... numeric string' | String          | Unique session identifier                                              |
| collisionsAt | {posX, posX}             | Object{Int,Int} | Returns objects with positions X and Y where collisions occurred       |
| posX         | 1                        | Int             | Returns Integer value for position X where collision image was capture |
| posY         | 2                        | Int             | Returns Integer value for position Y where collision image was capture |
| imgName      | 'someimg.jpg'            | String          | Unique image name identifier                                           |

The request returns a list with all collisionImg objects with ${sessionID}. The data looks like this: 

```json
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
<br><br>

## ----------- GET *collision image* -----------

| TYPE | URL                     | PATH                               |
| ---- | ----------------------- | ---------------------------------- |
| GET  | http://3.72.195.76/api/ | collisionImg/${sessionID}          |
| GET  | http://3.72.195.76/api/ | download/collisionImg/${sessionID} |

| Postman example                                                                      | Additional setting |
| ------------------------------------------------------------------------------------ | ------------------ |
| GET http://3.72.195.76/api/collisionImg/123456/123456_1652391941122_Screenshot_3.jpg | Not required!      |

| Key          | Value         | Data Type       | Purpose                                                                |
| ------------ | ------------- | --------------- | ---------------------------------------------------------------------- |
| SessionID    | '1234... '    | String          | Unique session identifier                                              |
| collisionsAt | {posX, posX}  | Object{Int,Int} | Returns objects with positions X and Y where collisions occured        |
| posX         | 1             | Int             | Returns Integer value for position X where collision image was capture |
| posY         | 2             | Int             | Returns Integer value for position Y where collision image was capture |
| imgName      | 'someimg.jpg' | String          | Unique image name identifier                                           |

The request returns single collisionImg object with ${sessionID} and ${imgName}. The data looks like this: 

```json
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
<br><br>

## ----------- Google Vision Classification -----------
The Google Vision API uses the *objectLocalization* function to fetch the object classification in the image. This is then highlighted with "pureimage" library.  The saved classified image looks like this. :) <br>
![alt text](https://github.com/IMS-Team6/IMS_SBackend/blob/main/Wiki/media/collisionImg_01.jpg)


## ----------- API MOCKUP -----------
![alt text](https://github.com/IMS-Team6/IMS_SBackend/blob/main/Wiki/media/API_Mockups_collisionImg.png)