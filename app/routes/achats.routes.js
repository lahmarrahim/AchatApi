module.exports = app => {
  const achatsController = require("../controllers/AchatController.js");


  var router = require("express").Router();

  // Create a new Product
  router.post("/create", achatsController.create);
  
  // Retrieve all Achats
  router.get("/findAll", achatsController.findAll);

  // Retrieve all Achats by Expert
  router.post("/AchatsApprouvesParExpert", achatsController.findAllByExpert);

  // Retrieve all Achats by Vendeur
  router.post("/MesVentes", achatsController.findAllByVendeur);

  // Retrieve all Achats by Acheteur
  router.post("/MesAchats", achatsController.findAllByAcheteur);





  app.use("/api/achats", router);
};