db.auth("root","password")

// This is a test collection
db.createCollection('position');

db.position.insert(
 {
    Position: {x:"some X value", y:"some Y value"}
  }  
);

db.createCollection('collisonImg');

db.collisonImg.insert(
  {
     sessionID: '', 
     collision: true ||false, 
     collisionsAt: undefined || {
      posX: 1,
      posY: 2, 
     },
     imgURI: './'
   }  
 );