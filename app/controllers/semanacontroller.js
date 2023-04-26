/*const Semana = require('../models/semana');

const obtenerSemanas = async (req, res) => {
  try {
    const semanas = await Semana.find();
    res.json(semanas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las semanas' });
  }
};

module.exports = { obtenerSemanas };

const crearSemana = async (req, res) => {
  try {
    const nuevaSemana = new Semana(req.body);
    const semanaGuardada = await nuevaSemana.save();
    res.json(semanaGuardada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la semana' });
  }
};

module.exports = { crearSemana };


const eliminarSemana = async (req, res) => {
  try {
    const semanaEliminada = await Semana.findByIdAndDelete(req.params.id);
    if (!semanaEliminada) {
      return res.status(404).json({ mensaje: 'Semana no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar la semana' });
  }
};

module.exports = { eliminarSemana };

const actualizarSemana = async (req, res) => {
  try {
    const semanaActualizada = await Semana.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!semanaActualizada) {
      return res.status(404).json({ mensaje: 'Semana no encontrada' });
    }
    res.json(semanaActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar la semana' });
  }
};

module.exports = { actualizarSemana };

*/