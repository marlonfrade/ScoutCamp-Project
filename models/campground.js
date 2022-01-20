const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  //Definindo os campos de inserção de dados:
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
});

//Exportando o módulo para um modelo:
module.exports = mongoose.model("Campground", CampgroundSchema);