const awilix = require("awilix");

const container = awilix.createContainer();



container.register({
  //--------------------- Belongs to same resources------------------//
  database: awilix.asFunction(require("./DataAccess/postPosition")),
  positionValidation: awilix.asFunction(require("./BusinessLogic/positionValidation")),
  positionManager: awilix.asFunction(require("./BusinessLogic/positionManager")),

  //--------------------- Others------------------//
  globals: awilix.asFunction(require("./globals")),
  restAPI: awilix.asFunction(require("./PresentationLayer/Routers/restApi")),
  app: awilix.asFunction(require("./PresentationLayer/app")),
});

const app = container.resolve("app");
app.listen(8080, function () {
  console.log("Web application listening on port 8080.");
});

