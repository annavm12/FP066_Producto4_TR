const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  horaInicio: { type: String, required: true },
  horaFinal: { type: String, required: true },
  descripcion: { type: String, required: true },
  colaboradores: { type: String, required: true },
  prioridad: { type: String, required: true },
  contenedor: { type: mongoose.Schema.Types.ObjectId, ref: "Container" },
});

module.exports = mongoose.model("Card", CardSchema);
