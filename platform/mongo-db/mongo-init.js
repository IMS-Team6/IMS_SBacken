db.auth("root","password")

// This is a test collection
db.createCollection('position');

db.position.insert(
 {
    Position: {x:"some X value", y:"some Y value"}
  }  
);