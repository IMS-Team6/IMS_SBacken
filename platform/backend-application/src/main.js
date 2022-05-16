const awilix = require("awilix");
const container = awilix.createContainer();



container.register({

    sessionAPI: awilix.asFunction(require("./PresentationLayer/Routers/restApi")),
    sessionValidation: awilix.asFunction(require("./BusinessLogic/sessionValidation")),
    sessionManager: awilix.asFunction(require("./BusinessLogic/sessionManager")),
    sessionRepository: awilix.asFunction(require("./DataAccess/sessionRepository")),

    fileServiceAPI: awilix.asFunction(require("./PresentationLayer/Routers/fileService")),
    fileManager: awilix.asFunction(require("./BusinessLogic/fileManager")),
    fileValidation: awilix.asFunction(require("./BusinessLogic/fileValidation")),
    fileHandler: awilix.asFunction(require("./DataAccess/fileHandler")),
    fileRepository: awilix.asFunction(require("./DataAccess/fileRepository")),

    globals: awilix.asFunction(require("./globals")),
    app: awilix.asFunction(require("./PresentationLayer/app")),
});

const app = container.resolve("app");
app.listen(8080, function() {
    console.log("Web application listening on port 8080.");
});