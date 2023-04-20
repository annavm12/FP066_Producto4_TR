const mongoose = require('mongoose');

const semanaSchema = new mongoose.Schema({
  numeroSemana: {
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
    type: Object,
    required: true,
    default: {
      background: '#FFFFFF',
      text: '#000000'
    }
  }
});

const Semana = mongoose.model('Semana', semanaSchema);

module.exports = Semana;

