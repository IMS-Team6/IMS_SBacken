db.auth("root", "password")

db.createCollection('session');

db.createCollection('collisonImg');

db.collisonImg.insert({
    sessionID: '',
    collisionsAt: {
        posX: 1,
        posY: 2,
    },
    imgName: './'
});

db.session.insert({
    sessionID: "987654",
    robotState: "",
    positions: {
        posX: [],
        posY: []
    },
    collision: false,
    collisionPos: {
        collX: [],
        collY: []
    },
});

db.session.insert({
    sessionID: "123456",
    robotState: "MOVING",
    positions: {
        posX: [0, 1, 1, 0, -1, -2, -2, -1],
        posY: [0, 1, 2, 3, 3, 2, 1, 0]
    },
    collision: true,
    collisionPos: {
        collX: [1, 0, -2, -1],
        collY: [1, 3, 2, 0]
    },
});