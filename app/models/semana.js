const mongoose = require('mongoose');

// Definir el esquema de la colección 'semanas'
const semanaSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  semana: {
    type: Number,
    required: true,
  },
  anio: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  mes: {
    type: String,
    required: true,
  },
  horas: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

// Crear el modelo 'Semana' a partir del esquema
const Semana = mongoose.model('Semana', semanaSchema);

module.exports = Semana;
