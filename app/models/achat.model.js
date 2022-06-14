module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      produit: {type: String , required : true},
      nomProduit: String,
      quantite: {type: Number , required : true},
      expertId: String,
      expertTel: String,
      vendeurId: String,
      vendeurTel: String,
      acheteurId: {type: String , required : true},
      acheteurTel: {type: String , required : true}
    },
   { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Achat = mongoose.model("achat", schema);
  return Achat;
};
