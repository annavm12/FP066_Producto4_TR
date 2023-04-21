const mongoose = require('mongoose');

const tarjetaSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  semana: {
    type: Number,
    required: true
  },
  anio: {
    type: Number,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  mes: {
    type: String,
    required: true
  },
  horas: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  }
});

const Tarjeta = mongoose.model('Tarjeta', tarjetaSchema);

module.exports = Tarjeta;