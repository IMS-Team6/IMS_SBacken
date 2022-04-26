db.auth("root", "password")

db.createCollection('session');

db.session.insert({
    Session: {
        sessionID: "",
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
});