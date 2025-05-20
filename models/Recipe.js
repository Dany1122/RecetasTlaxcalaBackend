const mongoose = require('mongoose');

const recetaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ingredientes: { type: [String], required: true },
  procedimiento: { type: [String], required: true },
  calorias: { type: Number, required: true },
  historia: { type: String, required: true },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  creadoEn: { type: Date, default: Date.now },
  imagenes: [String]
});

module.exports = mongoose.model('Recipe', recetaSchema);
