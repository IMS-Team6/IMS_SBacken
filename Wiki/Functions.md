# **Code structure and functions**

***Change file name to "Software Design Description"***
- [**Code structure and functions**](#code-structure-and-functions)
  - [**The 3 Tier Architecture**](#the-3-tier-architecture)
  - [**Presentation Layer**](#presentation-layer)
    - [**Session API**](#session-api)
    - [**File Service API**](#file-service-api)
  - [**Business Logic Layer**](#business-logic-layer)
    - [**Session Manager**](#session-manager)
    - [**Session Validation**](#session-validation)
    - [**File Manager**](#file-manager)
    - [**File Validation**](#file-validation)
  - [**Data Access Layer**](#data-access-layer)
    - [**Connect MongoDB**](#connect-mongodb)
    - [**Session Repository**](#session-repository)
    - [**File Repository**](#file-repository)
    - [**File Handler**](#file-handler)
<br>
<br>

## **The 3 Tier Architecture**
*Three-tier architecture is a client-server software architecture pattern in which the user interface (presentation), functional process logic ("business rules"), computer data storage and data access are developed and maintained as independent modules, most often on separate platforms.*<br>
![alt text](https://github.com/IMS-Team6/IMS_SBackend/blob/main/Wiki/media/Backend_architecture.png)

<br><br>

## **Presentation Layer**
The Presentation Layer is only responsible for receiving http requests and sending back responses. The application layer sends data to *Business Logic Layer* to carry out logical processing of the data. 

### **Session API**
*`resAPI.js` is responseble for all sessions related requests.* To learn more about the API, read more in API_sessions.md

In order to fetch all sessions, the API call uses the `/sessions` path as the identifier. The call returns "sessions" objects in a list. 
```js 
router.get('/sessions', async function(request, response));
```
Thes API returns following responses:

`Status: 200 Body: Array[Object, Object...]` <br />
`Status: 400 Body: ['Bad request']`  <br />
`Status: 404 Body: ['Resource does not exists']`  <br />
`Status: 500 Body: ['Internal server error']`  <br />

***
<br>
To fetch a specific session the `/sessions/sessionID` must be passed as identifier. The URI `/sessions/:sessionID` passed to the function returns a session object.

```js
router.get('/sessions/:sessionID', async function(request, response));
```
Thes API returns following responses:

`Status: 200 Body: [Object{}]` <br />
`Status: 400 Body: ['Bad request']`  <br />
`Status: 404 Body: ['Resource does not exists']`  <br />
`Status: 500 Body: ['Internal server error']`  <br />

***
<br>

In order to post a session or update positions, the API call uses the URI path `/session/:sessionID` as parameter. The functions requiers a body cinsisting of session object.
```js
 router.post('/session/:sessionID', async function (request, response));
```
Thes API returns following responses:

`Status: 201 Body: ['Aknoweledged']` <br />
`Status: 400 Body: ['Bad request']`  <br />
`Status: 404 Body: ['Resource does not exists']`  <br />
`Status: 500 Body: ['Internal server error']`  <br />
<br>
***

### **File Service API**
*`fileService.js` is responseble for all requests related to files.* To learn more about the API, read more in API_sessions.md

In order to upload a collision image, the API call uses the `/upload/:sessionID` path as parameter. The call requires a body which includes a collision image file with the key name "collisionImg" and positions x and y.
```js 
router.post('/upload/:sessionID', (request, response, next))
```
Thes API returns following responses:

`Status: 200 Body: Array[Object, Object...]` <br />
`Status: 400 Body: ['Bad request']`  <br />
`Status: 404 Body: ['Bad request']`  <br />
`Status: 500 Body: ['Internal server error']`  <br />
<br>
***

To get all collision image objects belonging to a session, the API call requiers `/collisionImg/:sessionID` as URI path where `sessiondID` is the identifier. The call returns an array of collision objects.
```js 
router.get('/collisionImg/:sessionID', async function(request, response));
```
Thes API returns following responses:

`Status: 200 Body: Array[Object, Object...]` <br />
`Status: 400 Body: ['Bad request']`  <br />
`Status: 404 Body: ['Resource does not exists']`  <br />
`Status: 500 Body: ['Internal server error']`  <br />
<br>
***
In order to download all collision images from a session, the API call uses the /download/collisionImg/:sessionID/ path as parameters. The call returns and downloads a zip file containing collision images.

```js 
router.get('/download/collisionImg/:sessionID', async function(request, response));
```
Thes API returns following responses:

`Status: 200 Body: Array[Object, Object...]` <br />
`Status: 400 Body: ['Bad request']`  <br />
`Status: 404 Body: ['Resource does not exists']`  <br />
`Status: 500 Body: ['Internal server error']`  <br />
<br>
***
In order to get a specific collision image, the API call uses the `/collisionImg/:sessionID/:imgName` path as parameters. The call returns an collision object.

```js 
router.get('/collisionImg/:sessionID/:imgName', async function(request, response));
```
Thes API returns following responses:

`Status: 200 Body: [Object{}]` <br />
`Status: 400 Body: ['Bad request']`  <br />
`Status: 404 Body: ['Resource does not exists']`  <br />
`Status: 500 Body: ['Internal server error']`  <br />
<br>
***

In order to download a specific collision image, the API call uses the `/download/collisionImg/:sessionID/:imgName` path as parameters. The call returns and downloads an image file.
```js 
router.get('/download/collisionImg/:sessionID/:imgName', async function(request, response));
```
Thes API returns following responses:

`Status: 200 Body: Array[Object, Object...]` <br />
`Status: 400 Body: ['Bad request']`  <br />
`Status: 404 Body: ['Resource does not exists']`  <br />
`Status: 500 Body: ['Internal server error']`  <br />
<br>

***
***

## **Business Logic Layer**
The Business Logic Layer is responsible for providing business logic which includes the validations for requests. The layer carries out a request only if the request goes throuth validations. If the request is acceptable then the layer makes use of Data Access Layer to send queries to the database. If the request is not acceptable then Business Logic Layer responses back with errors.


Purpose of file and description of all functions

module function exporterar different functions from other two layers business and data acceess this function takes in two parameters session repository and session validation. in this file we have tre different functions that manges different things.
manageGesessions function manages to get all sessions
manageGetSessionWithID this function takes in session data as a parameter and also gets the robot states from the repository and if error occurs it validated the session id by calling the session validation where we have all validations for different functions.
managePostSessionData takes in session data as parameter and validates each session data and session id, it is where we look if the session id exist and if it doesnt it craetes one by calling the create sessions with id and returns back the created session id. we also craete the write the position by calling the write function from the repository and returns back the written position if no eror occurred.

### **Session Manager**
*`sessionManager.js` is responseble for managing data from presentation layer.*

`manageGetSessions()` does not take any parametes, and calls data access layer to fetch all sessions. 
```js 
  exports.manageGetSessions = async function(callback)
```
Return: `Array[Object{}, Object{}]`
<br>

***

`manageGetSessionWithID()` thakes in these, does this 
```js 
  exports.manageGetSessionWithID = async function(sessionID, callback)
```
Return: `Array[Object{}, Object{}]`
<br>

***

`managePostSessionData()` thakes in these, does this 
```js 
  exports.managePostSessionData = async function(sessionData, callback)
```

Return: `Array[Object{}, Object{}]`

<br>

***


### **Session Validation**
*`sessionValidation.js` is responseble for managing data from presentation layer.*

`validateSessionData()` thakes in these, does this 
```js 
  exports.validateSessionData = function(sessionData)
```
Return: `Array[Object{}, Object{}]`

<br>

***

this function manges the file upload and takes in upload data as a parameter it calls the validation session id function to validate the session id

`manageGetAllCollisionImg()` thakes in these, does this 
```js 
exports.validateSessionID = function(sessionID)
```
Return: `Array[Object{}, Object{}]`

<br>

***

this function manges the file upload and takes in upload data as a parameter it calls the validation session id function to validate the session id


### **File Manager**
*`fileManager.js` is responseble for managing data from presentation layer.*

`manageFileUpload()` thakes in these, does this 
```js 
exports.manageFileUpload = function(uploadData, request, callback)
```
Return: `Array[Object{}, Object{}]`

<br>

***

this function manges the file upload and takes in upload data as a parameter it calls the validation session id function to validate the session id

`manageSingleFileDownload()` thakes in these, does this 
```js 
exports.manageSingleFileDownload = async function(sessionID, imgName, callback)
```
Return: `Array[Object{}, Object{}]`

<br>

***

this function manges the file upload and takes in upload data as a parameter it calls the validation session id function to validate the session id

`manageMultipleFileDownload()` thakes in these, does this 
```js 
exports.manageMultipleFileDownload = async function(sessionID, callback)
```
Return: `Array[Object{}, Object{}]`

<br>

***

this function manges the file upload and takes in upload data as a parameter it calls the validation session id function to validate the session id

`manageGetCollisionImg()` thakes in these, does this 
```js 
exports.manageGetCollisionImg = async function(payload, callback) 
```
Return: `Array[Object{}, Object{}]`

<br>

***

this function manges the file upload and takes in upload data as a parameter it calls the validation session id function to validate the session id

`manageGetAllCollisionImg()` thakes in these, does this 
```js 
exports.manageGetAllCollisionImg = async function(sessionID, callback)
```
Return: `Array[Object{}, Object{}]`

<br>

***

this function manges the file upload and takes in upload data as a parameter it calls the validation session id function to validate the session id


### **File Validation**
*`fileValidation.js` is responseble for managing data from presentation layer.*
Purpose of file and description of all functions

`validateFile()` thakes in these, does this 
```js 
exports.validateFile = function(file) 
```
Return: `Array[Object{}, Object{}]`

<br>

***

`validateUploadData()` thakes in these, does this 
this function is for validating file  it takes file as a prameter and pushes eror messages into globals file where we specifying what each errors do 

```js 
exports.validateUploadData = function(collisionsAt)
```

Return: `Array[Object{}, Object{}]`

<br>

***
 

## **Data Access Layer**
The Data Access Layer is responsible for connecting and sending queries to the database. The layer catches the errors which might acquire while carrying out the queries and sends them to the Presentation Layer using Business Logic Layer.
### **Connect MongoDB**
*`connectMongodb.js` is responseble for managing data from presentation layer.*
Purpose of file and description of all functions

`run()` thakes in these, does this 
```js 
sync function run()
```
Return: `Array[Object{}, Object{}]`

<br>

***

in this function we use it to run the mongo db 
### **Session Repository**
*`sessionRepository.js` is responseble for storing session data to database.*
Purpose of file and description of all functions

`getSessionWithID()` thakes in these, does this 
```js 
exports.getSessionWithID = async function(thisSessionID)
```
Return: `Array[Object{}, Object{}]`

<br>

***
`createSessionWithID()` thakes in these, does this 
```js 
exports.createSessionWithID = async function(sessionData) {
```
Return: `Array[Object{}, Object{}]`

<br>

***
`writePositions()` thakes in these, does this 
```js 
exports.writePositions = async function(sessionData)
```
Return: `Array[Object{}, Object{}]`

<br>

***

### **File Repository**
*`fileRepository.js` is responseble for storing file related object to database.*
Purpose of file and description of all functions

`insertCollisionImg()` thakes in these, does this 
```js 
  exports.insertCollisionImg = async function(sessionID, collisionsAt, imgName)
```
Return: `Array[Object{}, Object{}]`

<br>

***
`getOneCollisionImg()` thakes in these, does this 
```js 
  exports.getOneCollisionImg = async function(sessionID, imgName)
```
Return: `Array[Object{}, Object{}]`

<br>

***
`getAllCollisionImg()` thakes in these, does this 
```js 
   exports.getAllCollisionImg = async function(sessionID) 
```
Return: `Array[Object{}, Object{}]`

<br>

***
### **File Handler**
*`fileHandler.js` is responseble for storing files to server*


`writeFileToServer()` thakes in these, does this 
```js 
exports.writeFileToServer = function(newPath, oldPath, callback) 
 ```
 Return: `Array[Object{}, Object{}]`

<br>

***

`highlightImageObjects()` thakes in these, does this 
```js 
exports.highlightImageObjects = function(newPath, oldPath, callback) 
 ```
 Return: `Array[Object{}, Object{}]`

<br>

***
 

