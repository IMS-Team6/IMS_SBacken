db.auth("root","password")

// This is a test collection
db.createCollection('position');
db.position.insert(
  {
      Positions: {
        session_id: "",
        session_duration:{
        start: "yyyy/m/d gtm+1",
        stop: ""
        },
        x: [],
        y: []
    }
  }  
);