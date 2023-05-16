const Tarea = require('../models/tarea');


//PRUEBO OTRA MANERA MAS ABAJO PORQUE ME DA PROBLEMAS EN EL SERVER !!! 

/*const obtenerTarea = async (req, res) => {
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
    await nuevaTarea.save();
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


const tareaController = {};

tareaController.getTareas = async (req, res) =>{
  const tareas = await Tarea.find();
  res.json(tareas);
};

tareaController.createTarea = async (req, res) =>{
  const newTarea = new Tarea(req.body);
  await newTarea.save();
  res.status(201).json(newTarea);
};

tareaController.deleteTarea =async (req, res) => {
  const tareaId = req.params.id;
  await Tarea.findByIdAndDelete(tareaId);
  res.status(204).json({message: 'tarea eliminada'});
};

tareaController.updateTarea = async (req, res) =>{
  const tareaId = req.params.id;
  const updatedTarea = await Tarea.findByIdAndUpdate(tareaId, req.body, {new : true});
  res.json(updatedTarea);
};

tareaController.updateTareas = async (req,res)=>{
  const updatedTareas = await Tarea.updateMany({}, req.body);
  res.json(updatedTareas);
};


module.exports = tareaController;