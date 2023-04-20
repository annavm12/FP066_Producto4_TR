const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  horaInicio: {
    type: String,
    required: true
  },
  horaFinal: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  colaboradores: [{
    type: String
  }],
  prioridad: {
    type: String,
    enum: ['alta', 'media', 'baja'],
    default: 'media'
  },
  diaSemana: {
    type: String,
    enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
  },
  color: {
    type: String,
    default: function() {
      switch (this.prioridad) {
        case 'alta':
          return 'red';
        case 'media':
          return 'yellow';
        case 'baja':
          return 'green';
        default:
          return 'white';
      }
    }
  }
});

const Tarea = mongoose.model('Tarea', tareaSchema);

module.exports = Tarea;
