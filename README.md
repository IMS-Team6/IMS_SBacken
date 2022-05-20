# Intelligent mobile systems - Team 6 
Jump down to [Get Started](#get-started) to learn how to run the application.

## Purpose
This backend application is written in collaboration with Husqvarna AB, Jönköping University and others. And is part of the course *Intelligenta mobila system*. Its purpose is for student to overcome the following challenges: 
-  Understand the task!
-  Apply knowledge from previous courses!
-  Learn and assess new skills!
-  Collaborate!  

## Backend Rest API 

This application is built with Express NodeJS in a dockerized environment. If you do not have Docker, use the following link to download Docker https://docs.docker.com/get-docker/. 
The task for backend is stated as following: 
-  *Backend1: The backend shall publish a REST API for reading and writing position data that is sent from the Mower. *
-  *Backend2: The REST API shall contain a service for reading and writing image data. *
-  *Backend3: When image is written, the service shall perform an image classification via for example Google API. *
  

## Get Started

1. Clone the repository, use `git clone https://github.com/IMS-Team6/IMS_SBackend.git`
2. Switch to directory `./platform` 
3. Run your favorit **CLI** (PowerShell, Bash etc...) in this directory
4. Run `docker-compose up --build -V` to start the docker containers, use `docker-compose down` to shutdown docker containers 
5. Use http://localhost:8080/api/sessions to fetch all sessions, the code will initiate two sessions (123456 and 987654).

## Assignment Mockup 
![alt text](https://github.com/IMS-Team6/IMS_SBackend/blob/main/Wiki/media/System_Mockup.png) 