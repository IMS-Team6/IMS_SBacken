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
Return: `callback(Array[Object{},...], error)`
<br>

***

`manageGetSessionWithID()` thakes in these, does this 
```js 
  exports.manageGetSessionWithID = async function(sessionID, callback)
```
Return: `callback(Array[Object{},...], error)`
<br>

***

`managePostSessionData()` thakes in these, does this 
```js 
  exports.managePostSessionData = async function(sessionData, callback)
```

Return: `callback(Array[Object{},...], error)`

<br>

***


### **Session Validation**
*`sessionValidation.js` is responseble for managing data from presentation layer.*

`validateSessionData()` thakes in these, does this 
```js 
  exports.validateSessionData = function(sessionData)
```
Return: `Array[error...]`

<br>

***

this function manges the file upload and takes in upload data as a parameter it calls the validation session id function to validate the session id

`manageGetAllCollisionImg()` thakes in these, does this 
```js 
exports.validateSessionID = function(sessionID)
```
Return: `Array[error...]`

<br>

***


### **File Manager**
*`fileManager.js` is responseble for managing data from presentation layer.*

`manageFileUpload()` takes `uploadData`, `request` and a `callback` function as parameters. uploadData consists of sessionID, the `requests` consists of file and other data. The function handles the logic and returns a callback with an object or error.  
```js 
exports.manageFileUpload = function(uploadData, request, callback)
```
Return: `callback(Objects{}, [errors])`

<br>

***

`manageSingleFileDownload()` takes in `sessionID`, `imgName` and a `callback` function. It manages the logic and returns a callback with a image object or error.
```js 
exports.manageSingleFileDownload = async function(sessionID, imgName, callback)
```
Return: `callback(Object{}, [errors])`

<br>

***

`manageMultipleFileDownload()` takes a `sessionID` as parameter, and manages the logic. The callback returns an Array with collision image objects or errors.  
```js 
exports.manageMultipleFileDownload = async function(sessionID, callback)
```
Return: `callback(Array[Object{},...], [errors])`

<br>

***

`manageGetCollisionImg()` takes in the `payload` and a `callback` parameter. Payload consist of `sessionID` and `imgName`.  The callback return an object or error. 
```js 
exports.manageGetCollisionImg = async function(payload, callback) 
```
Return: `callback(Array[Object{},...], [errors])`

<br>

***

`manageGetAllCollisionImg()` manages the logic before fetching data from data access layer. The callback return an object or error. 
```js 
exports.manageGetAllCollisionImg = async function(sessionID, callback)
```
Return: `callback(Array[Object{},...], [errors])`

<br>

***

### **File Validation**
*`fileValidation.js` is responseble for managing data from presentation layer.*
Purpose of file and description of all functions

`validateFile()` takes in a file as parameters, it checks whatever the files is supored etc.  
```js 
exports.validateFile = function(file) 
```
Return: `Array[error...]`

<br>

***

`validateUploadData()` takes in `collisionsAt` object that is sent together with a file, and validates its data.

```js 
exports.validateUploadData = function(collisionsAt)
```

Return: `Array[error...]`

<br>

***

## **Data Access Layer**
The Data Access Layer is responsible for connecting and sending queries to the database. The layer catches the errors which might acquire while carrying out the queries and sends them to the Presentation Layer using Business Logic Layer.

### **Connect MongoDB**
*`connectMongodb.js` is responseble for connecting to mongoDB* Returns a `client connection`

`run()` Checks whatever it's possible to connect to mongoDB.
```js 
sync function run()
```
Return: `Success or Fail`

<br>

***

### **Session Repository**
*`sessionRepository.js` is responseble for storing session data to database.*
Purpose of file and description of all functions

`getSessions()` takes no parameters, fetches all session object stored in collection
```js 
exports.getSessions = async function()
```
Return: `Array[Object{}, Object{}...] or [errors]`

<br>

***

`getSessionWithID()` fetches a session with the given `sessionID`
```js 
exports.getSessionWithID = async function(thisSessionID)
```
Return: `Object{} or [errors]`

<br>

***
`createSessionWithID()` creates a session with given `sessionData`(sessionData is defined in the API) 
```js 
exports.createSessionWithID = async function(sessionData)
```
Return: `[['aknowleged:1']] or [errors]`

<br>

***
`getSessionWithIDAndState()` uses `sessionID` to fetch a singel session.
```js 
exports.getSessionWithIDAndState = async function(sessionID)
```
Return: `Object{}`

<br>

***
`writePositions()` takes in `sessionData` as parameter (sessionData is defined in the API). This functions updates a session and the data sent.
```js 
exports.writePositions = async function(sessionData)
```
Return: `[['aknowleged:1']] or [errors]`

<br>

***

`updateCollisionImgStatus()` uses `sessionID` to update whatever a session has a image stored.
```js 
exports.updateCollisionImgStatus = async function(thiSessionID)
```
Return: `[['aknowleged:1']] or [errors]`

<br>

***

### **File Repository**
*`fileRepository.js` is responseble for storing file related object to database.*
Purpose of file and description of all functions

`insertCollisionImg()` takes `sessionID`, `collisionsAt` and `imgName` as parameters. These are later used to store a unique collision image object.
```js 
  exports.insertCollisionImg = async function(sessionID, collisionsAt, imgName)
```
Return: `[['aknowleged:1']] or [errors]`

<br>

***
`getOneCollisionImg()` takes in `sessionID` and `imgName` as parameters, these parameters are used to fetch a single cillision image objects related to the sessionID and imgName.
```js 
  exports.getOneCollisionImg = async function(sessionID, imgName)
```
Return: `Object{} or [errors]`

<br>

***
`getAllCollisionImg()` takes in `sessionID` as parameter, the sessionID is later used to fetch all cillision image objects related to that sessionID.
```js 
   exports.getAllCollisionImg = async function(sessionID) 
```
Return: `Array[Object,...] or [errors]`

<br>

***
### **File Handler**
*`fileHandler.js` is responseble for storing files to server*


`writeFileToServer()` takes in `newPath`, `oldPath` and a `callback` function as parameters. oldPath is synced into rawdata which is later written to newPath. The callback function returns success or fail. 
```js 
exports.writeFileToServer = function(newPath, oldPath, callback) 
 ```
 Return: `Success or [errors]`

<br>

***

`highlightImageObjects()` takes `inputFile`, and a `objects` as parameters. The function highlights the objects objects and writes them to inputFile. 
```js 
exports.highlightImageObjects = async function(inputFile, objects)
 ```
 Return: `Success or [errors]`

<br>

***
 

