# Logbook Week 20 - Sprint 6 - Hotfixes, documentation - Total hours this week: ~13hrs, and going
*Note: Hours per week do not include lectures and other discussions...* 

  - Testing backend functionallity woth hardware team - 30min
  - Writing and creating documentation structure, solving first bug - 360min - 6hours 
    - Error: "Payload too big", A somewhat hard to find solution, but after a hour or two of google search a solution was found -> Body-parser limit
    - Error: "HTTPError: 400 Client Error: Bad Request for url", An issue which had multiple answers and solution on the web, but none that solved ours. Investigating our python request step by step, produced the solution -> headers should be empty.
  - Fixing bugs in main branch - ~300min - 5hrs 
    - 502 Proxy Error: Somehow the application crashed, later I discovered that corrupt file was uploaded, or wrong filename extenssion was added. 
    - Application started crashing, not all error handling was working as intended. Troubleshooting each function and performed testing. 
  - Sprint planing - ~30min 
  - Sync meeting - ~60min 
