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
This file is where we wrote our endpoints we have two get functions and one for post function, the get function one is for getting all sessions and the other one is for getting a session with a specific id and the post function is for creating the robotsate and it uses a paylod of session id, postion x and y robotsate the different state start,moving and stop and collision. The different status that has been used is code 200 for ok , 400 for bad request and 500 for internal server error.

### File Service API
Purpose of file and description of all functions



## Business Logic Layer
The Business Logic Layer is responsible for providing business logic which includes the validations for requests. The layer carries out a request only if the request goes throuth validations. If the request is acceptable then the layer makes use of Data Access Layer to send queries to the database. If the request is not acceptable then Business Logic Layer responses back with errors.
### Session Manager
Purpose of file and description of all functions
### Session Validation
Purpose of file and description of all functions
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
