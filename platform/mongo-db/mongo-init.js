db.auth("root","password")

db.createCollection('session');

db.session.insert(
  {
      Session: {
        sessionId: "",
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