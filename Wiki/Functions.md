# Code structure and functions

***Change file name to "Software Design Description"***
- [Code structure and functions](#code-structure-and-functions)
  - [The Tier Architecture](#the-tier-architecture)
  - [Presentation Layer](#presentation-layer)
    - [Session API](#session-api)
    - [File Service API](#file-service-api)
  - [Business Logic Layer](#business-logic-layer)
    - [Session Manager](#session-manager)
    - [Session Validation](#session-validation)
    - [File Manager](#file-manager)
    - [File Validation](#file-validation)
  - [Data Access Layer](#data-access-layer)
    - [Connect MongoDB](#connect-mongodb)
    - [Session Repository](#session-repository)
    - [File Repository](#file-repository)
    - [File Handler](#file-handler)

## The Tier Architecture
![alt text](https://github.com/IMS-Team6/IMS_SBackend/blob/main/Wiki/media/Backend_architecture.png)


## Presentation Layer
The Presentaiton Layer is only responsible for receiving http requests and sending back responses. The layer uses Business Logic Layer to carry out the http requests. 
### Session API
*Purpose of file and description of all functions...*


In order to fetch all sessions, the API call uses the /sessions path as parameter. The call returns "sessions" objects in a list. 
```js 
router.get('/sessions', async function(request, response));
```
This API call returns the following statuses:

Status: 200 Body: Array[Object, Object...] <br />
Status: 400 Body: ['Some error']  <br />
Status: 500 Body: ['Internal server error']  <br />


In order to fetch a specific session the sessionID must be included in the parameter, the API call uses /sessions/:sessionID path as parameters. The call returns a session object.
```js
router.get('/sessions/:sessionID', async function(request, response));
```
This API call returns the following statuses:

Status: 200 Body: [Object, Object]  <br />
Status: 400 Body: ['Some error']  <br />
Status: 500 Body: ['Internal server error']  <br />


In order to post a session or update positions, the API call uses the /session/:sessionID path as parameters. The call returns an "acknowledged" object.
```js
 router.post('/session/:sessionID', async function (request, response));
```
This API call returns the following statuses:

Status: 200 Body: [Object, Object] <br />
Status: 400 Body: ['Some error']  <br />
Status: 500 Body: ['Internal server error']  <br />


### File Service API
*Purpose of file and description of all functions...*

In order to upload a collision image, the API call uses the /upload/:sessionID path as parameters. The call requires a body which includes a collision image file with the key name "collisionImg" and positions x and y with the keys "posX" and "posY".
```js 
router.post('/upload/:sessionID', (request, response, next))
```
This API call returns the following statuses:

Status: 200 Body: ['success'] <br />
Status: 400 Body: ['Some error']  <br />
Status: 500 Body: ['Internal server error']  <br />


In order to get all collisions in a session, the API call uses the /collisionImg/:sessionID path as parameters. The call returns an array of collision objects.
```js 
router.get('/collisionImg/:sessionID', async function(request, response)
```
This API call returns the following statuses:

Status: 200 Body: Array[Object, Object...] <br />
Status: 400 Body: ['Some error']  <br />
Status: 500 Body: ['Internal server error']  <br />


In order to get a specific collision image, the API call uses the /collisionImg/:sessionID/:imgName path as parameters. The call returns an collision object.
```js 
router.get('/collisionImg/:sessionID/:imgName', async function(request, response)
```
This API call returns the following statuses:

Status: 200 Body: [Object, Object] <br />
Status: 400 Body: ['Some error']  <br />
Status: 500 Body: ['Internal server error']  <br />


In order to download a specific collision image, the API call uses the /download/collisionImg/:sessionID/:imgName path as parameters. The call returns and downloads an image file.
```js 
router.get('/download/collisionImg/:sessionID/:imgName', async function(request, response)
```
This API call returns the following statuses:

Status: 200 Body: [Object, Object] <br />
Status: 404 Body: ['Some error']  <br />
Status: 500 Body: ['Internal server error']  <br />


In order to download all collision images from a session, the API call uses the /download/collisionImg/:sessionID/ path as parameters. The call returns and downloads a zip file containing collision images.
```js 
router.get('/download/collisionImg/:sessionID', async function(request, response)
```
This API call returns the following statuses:

Status: 200 Body: [Object, Object] <br />
Status: 404 Body: ['Some error']  <br />
Status: 500 Body: ['Internal server error']  <br />


## Business Logic Layer
The Business Logic Layer is responsible for providing business logic which includes the validations for requests. The layer carries out a request only if the request goes throuth validations. If the request is acceptable then the layer makes use of Data Access Layer to send queries to the database. If the request is not acceptable then Business Logic Layer responses back with errors.
### Session Manager
Purpose of file and description of all functions

module function exporterar different functions from other two layers business and data acceess this function takes in two parameters session repository and session validation. in this file we have tre different functions that manges different things.
manageGesessions function manages to get all sessions
manageGetSessionWithID this function takes in session data as a parameter and also gets the robot states from the repository and if error occurs it validated the session id by calling the session validation where we have all validations for different functions.
managePostSessionData takes in session data as parameter and validates each session data and session id, it is where we look if the session id exist and if it doesnt it craetes one by calling the create sessions with id and returns back the created session id. we also craete the write the position by calling the write function from the repository and returns back the written position if no eror occurred.

### Session Validation
Purpose of file and description of all functions
```js 
 exports.validateSessionID = function(sessionData) 
```
this function is for validating session id it takes session data as a prameter and pushes eror messages into globals file where we specifying what each errors do 
```js 
exports.validateSessionData = function(sessionData)
```
this function is for validating session data such as postions x and y, collison and robotstate pushes eror messages into globals file where we specifying what each errors do.

### File Manager
Purpose of file and description of all functions
```js 
exports.manageFileUpload = function(uploadData, request, callback)
```
this function manges the file upload and takes in upload data as a parameter it calls the validation session id function to validate the session id

### File Validation
Purpose of file and description of all functions
```js 
exports.validateFile = function(file) 
```
this function is for validating file  it takes file as a prameter and pushes eror messages into globals file where we specifying what each errors do 

```js 
 exports.validateUploadData = function(collisionsAt)
 ```
 this function is for validating the uploaded data  it takes collisionsAt as a prameter and pushes eror messages into globals file where we specifying what each errors do 

## Data Access Layer
The Data Access Layer is responsible for connecting and sending queries to the database. The layer catches the errors which might acquire while carrying out the queries and sends them to the Presentation Layer using Business Logic Layer.
### Connect MongoDB
Purpose of file and description of all functions
```js 
sync function run()
```
in this function we use it to run the mongo db 
### Session Repository
Purpose of file and description of all functions
```js 
exports.getSessionWithID = async function(thisSessionID)
```
```js 
exports.createSessionWithID = async function(sessionData) {
```
```js 
exports.writePositions = async function(sessionData)
```

### File Repository
Purpose of file and description of all functions
```js 
  exports.insertCollisionImg = async function(sessionID, collisionsAt, imgName)
```
```js 
  exports.getOneCollisionImg = async function(sessionID, imgName)
```
```js 
   exports.getAllCollisionImg = async function(sessionID) 
```
### File Handler
Purpose of file and description of all functions
```js 
exports.writeFileToServer = function(newPath, oldPath, callback) 
 ```
 this function is for writing file to the server and takes in two parameter the new path and the old path and returns if the file was written in sucess or an error message
 

