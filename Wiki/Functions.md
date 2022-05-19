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
Purpose of file and description of all functions
This file is where we wrote our endpoints we have two get functions and one for post function, the get function one is for getting all sessions and the other one is for getting a session with a specific id and the post function is for creating the robotsate and it uses a paylod of session id, postion x and y robotsate the different state start,moving and stop and collision. 
get request 1 path name : /sessions
get request 2 path name : /session/:sessionID
post request path name :/session/:sessionID
The different status that has been used is code 200 for ok , 400 for bad request and 500 for internal server error.

### File Service API
Purpose of file and description of all functions
module function exporterar different functions from other two layers business and data acceess this function takes in 3 parameterar.the api end points for file server is specified in this file  4 different get request for getting different files and one post request for creating the file upload 
get request 1 getting all collion image : path name: /collisionImg/:sessionID
get request 2 getting one collison image: path name :/collisionImg/:sessionID/:imgName
get request 3 for getting downloaded single file : path name: /download/collisionImg/:sessionID/:imgName
get request 4 for getting downloaded multiple file: path name /download/collisionImg/:sessionID
post request for uploading the file: path name: upload/:sessionID:
status code that has been used  200 for ok , 400 for bad request and 404 for not found .

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
in this file we validate two different functions one for session id and the other one for session data we look all posible way to validate the postions , collison and robot state and we psuh our earror in globals file where we specifying what each errors do .
### File Manager
Purpose of file and description of all functions
### File Validation
Purpose of file and description of all functions
<br>

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
