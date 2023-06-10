module.exports = app => {
    const controller = require("../controllers/controller.js");
  
    var router = require("express").Router();
  
    router.get("/test", controller.Test);

  
    app.use('/', router);
  };