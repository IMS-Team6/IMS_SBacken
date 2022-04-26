db.auth("root","password")

// This is a test collection
db.createCollection('session');

db.session.insert(
  {
      Session: {
        session_id: "",
        robotState: "",
        positions: {
          posX: [],
          posY: []
        },
        collision: true || false,
        collisionPos: {
          collX: [],
          collY: []
        },
    }
  }
);