# Code structure and functions



- [Code structure and functions](#code-structure-and-functions)
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

## Presentation Layer
The Presentaiton Layer is only responsible for receiving http requests and sending back responses. The layer uses Business Logic Layer to carry out the http requests. 
### Session API
*Purpose of file and description of all functions...*


*Förklara vad funktionen gör, varför den gör det, vad den returnerar. Notera skriv INTE HUR den gör* <br>

This file is where we wrote our endpoints for session api, we have two get functions and one for post function.

```js 
router.get('/sessions', async function(request, response));
```
this funtion takes in /sessions as parameter and returns a list of all sessions in an  object. this function calls functions in business layer to look if any err occured and to validate 
status code 200  returns an object 
status code 500 returns 500 and error message
 
```js
router.get('/sessions/:sessionID', async function(request, response));
```
this funtion takes in /sessions/:sessionID as parameter and returns the session with that specific id. It calls functions in business layer for validations and to see if any err occured 
status code 200  returns an object 
status code 500 returns 500 and error message
```js
 router.post('/session/:sessionID', async function (request, response));
```
this funtion takes in /sessions/:sessionID as parameter and it uses a paylod of session id, postion x and y robotsate the different state start,moving and stop and collision.it asks business layer if any err occured and also to validate the states.
status code 200  returns an object 
status code 400 for error message

get request 1 path name : /sessions
get request 2 path name : /session/:sessionID
post request path name :/session/:sessionID


### File Service API
Purpose of file and description of all functions

This file is where we wrote our endpoints for file service api. Module function exporterar different functions from other two layers business and data acceess this function takes in 3 parameterar.The api end points for file server is specified in this file  4 different get request for getting different files and one post request for creating the file upload .
```js 
router.post('/upload/:sessionID', (request, response, next)
```
This funtion takes in /upload/:sessionID as parameter it calls a function in business layer for validations and to see if any err occured it returns all collion image
status code that has been used  200 if is succeeded
400 for error message .

```js 
router.get('/collisionImg/:sessionID', async function(request, response)
```
This funtion takes in /collisionImg/:sessionID as parameter it calls a function in data access layer and  it returns all collion image as an object.


```js 
router.get('/collisionImg/:sessionID/:imgName', async function(request, response)
```
This funtion takes in /collisionImg/:sessionID/:imgName as parameter it calls a function in data access layer and  it returns one collion image as an object.

```js 
router.get('/download/collisionImg/:sessionID/:imgName', async function(request, response)
```
This funtion takes in /download/collisionImg/:sessionID/:imgName as parameter it calls a function in business layer for validations and to see if any err occured it returns one single file that is downloaded. 
status code 404 for error message .

```js 
router.get('/download/collisionImg/:sessionID', async function(request, response)
```
This funtion takes in /download/collisionImg/:sessionID' as parameter it calls a function in business layer for validations and to see if any err occured it returns a multiple file that is downloaded. 
status code 404 for error message .


path name: upload/:sessionID:
path name: /collisionImg/:sessionID
path name :/collisionImg/:sessionID/:imgName
path name /download/collisionImg/:sessionID

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

### Session Repository
writePositions here 
Purpose of file and description of all functions
### File Repository
Purpose of file and description of all functions
### File Handler
Purpose of file and description of all functions
