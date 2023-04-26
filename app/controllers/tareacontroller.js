/*const Tarea = require('../models/tarea');

const obtenerTarea = async (req, res) => {
  try {
    const tarea = await Tarea.find();
    res.json(tarea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las tareas' });
  }
};

module.exports = { obtenerTarea };

const crearTarea = async (req, res) => {
  try {
    const nuevaTarea = new Tarea(req.body);
    const tareaGuardada = await nuevaTarea.save();
    res.json(tareaGuardada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la tarea' });
  }
};

module.exports = { crearTarea };


const eliminarTarea = async (req, res) => {
  try {
    const tareaEliminada = await Tarea.findByIdAndDelete(req.params.id);
    if (!tareaEliminada) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar la tarea' });
  }
};

module.exports = { eliminarTarea };

const actualizarTarea = async (req, res) => {
  try {
    const tareaActualizada = await Tarea.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tareaActualizada) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }
    res.json(tareaActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar la tarea' });
  }
};

module.exports = { actualizarTarea };*/

