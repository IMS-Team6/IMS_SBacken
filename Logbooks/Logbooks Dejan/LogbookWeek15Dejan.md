# Logbook Week 15 - Sprint 1 - API and migration to host - Total hours this week: ~23hours
  
    
  - Week started with sprint planning, loads of discussion about our next steps, our blockers etc. In the backend it was decided to start working on the base functionality of REST API to follow the three layered architecture(TLA). Hardware has decided to focus on the Bluetooth connection, there are some blockers in that regard, and front-end will focus on how to connect the Bluetooth module to the application and building the UI fragments. (120min) 

  - In the backend team, we have created some more tickets that describes features we need in order to fulfill our user stories. Bahja and Osman will work together(pair programming) on the API, the API should follow the TLA. My focus is the migration to host.(~120min) 

  - There has come up some discussion on how we get and store positions sent from the mower, given the requirements from front-end and mower we have come up with a object. This is probably going to be changed in the future.(30min) 

  - Looking into the position data, how it should be store, how it will be used etc. I've drawn a solution that might help the team better understand the solution. There are few viable solutions on how to draw. Either by projecting vector from vectors A->B(B-A), or vector from point A to point B. (120min) 

  - Looking into our host solution, keeping it cheap and futureproof. I've spent few hours trying to figure out how to use Azures' docker environment(because it's cheaper then other solutions, using GitHub backpack and getting 100$ azure credits) as it costs 13$/month and first 30days free. Although might change to AWS LightSail if Azure gets too complicated.(180min).
  - No luck with Azure, looked into how to create projects and upload dockerized environment but no sucess... After a few hours I gave up and switched to AWS lightsail as I was more fimiliar with this. (120min)
  - Swithced to AWS... Switching to AWS felt like it was an "easier" solution because of the fimiliarity, this did not go as planned. As described bellow:
      - Problems with docker-compose: Previously i've only uploaded a node project to AWS lightsail, ran a node command and that's it... With docker-compose things got a little bit more complicated. First Lightsail NodeJS server package is run in Bitnami, and had no Docker installed. To install docker there were few commands involved. But none of them worked without SUDO, and the documentation never mentions this... Luckely I've used linux based systems before and tried SUDO and it everything ran smooth, this took me just 2 hours to figure out. Until i ran into the problem with docker-compose, this got a bit more complicated and a lot of readings to understand how to solve this. Sure there was a lot of documentatio on this, but most of it missed the fact that docker-compose needs a new role added in order to run it. This was no easy task, but resultet in real joy when solved :) Took me just around 6-8 hours. 
      - setting up apache was straight forward, change the config file, save and reboot... Around 30min-1hour 
      - finally It works! 
  - Uploading the project to AWS Lightsail, few minutes as the Bitnami server already has git installed. All i had to do is git pull and change to developlent repo.
  - Retrospective for this week was okey, there were still some things to figure out in different teams. Our team (Backend), started working on positions requests. 120min  
  - Weekend: Helping Bahja setting up her environment on Mac M1 (True hell...) Spent over 6hours doing this, not sure if this can be counted in the project hours
