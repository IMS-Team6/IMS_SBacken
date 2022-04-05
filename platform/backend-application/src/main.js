const awilix = require("awilix");

const container = awilix.createContainer();

container.register({
  //--------------------- Belongs to same resources------------------//
  //Account
//   accountRouter: awilix.asFunction(require("./PresentationLayer/")),
//   accountManager: awilix.asFunction(require("./bll/account-manager")),
//   accountValidator: awilix.asFunction(require("./bll/account-validator")),
//   accountRepository: awilix.asFunction(require("./dal/account-repository")),

  //--------------------- Others------------------//
  globals: awilix.asFunction(require("./globals")),
  restAPI: awilix.asFunction(require("./PresentationLayer/Routers/rest-api")),
  app: awilix.asFunction(require("./PresentationLayer/app")),
});

const app = container.resolve("app");
app.listen(8080, function () {
  console.log("Web application listening on port 8080.");
});

// Start listening for incoming HTTP requests!
