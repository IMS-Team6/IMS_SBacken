const awilix = require("awilix");

const container = awilix.createContainer();



container.register({
  database: awilix.asFunction(require("./DataAccess/sessionRepository")),
  positionValidation: awilix.asFunction(require("./BusinessLogic/positionValidation")),
  sessionManager: awilix.asFunction(require("./BusinessLogic/sessionManager")),

  globals: awilix.asFunction(require("./globals")),
  restAPI: awilix.asFunction(require("./PresentationLayer/Routers/restApi")),
  app: awilix.asFunction(require("./PresentationLayer/app")),
});

const app = container.resolve("app");
app.listen(8080, function () {
  console.log("Web application listening on port 8080.");
});

