const db = require("../models");
const Achat = db.achats;
const mongoose=require("mongoose");
const Produit = db.tutorials;

// Create and Save a new Achat
exports.create = (req, res) => {
  // Validate request
  if ((!req.body.id) || (!req.body.quantite) || (!req.body.acheteurId) || (!req.body.acheteurTel) ) {
    res.status(400).send({ message: "Remplir tous les champs svp!" });
    return;
  }

  let quantiteDispo = 0;
  // Create a Achat
  let achat = {
    produit: req.body.id,
    quantite: req.body.quantite,
    acheteurId: req.body.acheteurId,
    acheteurTel: req.body.acheteurTel
  };
  




  const id = achat.produit;
  const collection = mongoose.connection.db.collection("produits");
  collection.findOne({_id:mongoose.Types.ObjectId(id)}).then(data=>{
    achat.nomProduit = data.nom;
    achat.expertId = data.expertId;
    achat.expertTel = data.expertTel;
    achat.vendeurId = data.userId;
    achat.vendeurTel = data.userTel;
    quantiteDispo = data.quantite;// it will print your collection data

    if (quantiteDispo < req.body.quantite){
      res.status(400).send({ message: "La quantité demandée n'est pas disponible" });
    }else {
    collection.updateOne({_id:mongoose.Types.ObjectId(id)}, {$set: {quantite : (quantiteDispo - req.body.quantite) }},{ upsert: true });
    const achatDb = new Achat(achat);
    // Save Achat in the database
    achatDb
      .save(achatDb)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur s'est produite lors de la création d'achat."
        });
      });
    }
  })
  .catch(err => {
    console.log(err);
  });

  

};

// Retrieve all Achats from the database.
exports.findAll = (req, res) => {
  const nom = req.query.nom;
  var condition = nom ? { nom: { $regex: new RegExp(nom), $options: "i" } } : {};

  Achat.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération des achats."
      });
    });
};

// Retrieve all Achats from the database by ExpertId.
exports.findAllByExpert = (req, res) => {
  // const nom = req.query.nom;
  const expertId = req.body.expertId;

  var condition = { expertId: { $eq: expertId } }

  Achat.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération des achats."
      });
    });
};

// Retrieve all Achats from the database by VendeurId.
exports.findAllByVendeur = (req, res) => {
  // const nom = req.query.nom;
  const vendeurId = req.body.vendeurId;

  var condition = { vendeurId: { $eq: vendeurId } }

  Achat.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération des achats."
      });
    });
};

// Retrieve all Achats from the database by AcheteurId.
exports.findAllByAcheteur = (req, res) => {
  // const nom = req.query.nom;
  const acheteurId = req.body.acheteurId;

  var condition = { acheteurId: { $eq: acheteurId } }

  Achat.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération des achats."
      });
    });
};