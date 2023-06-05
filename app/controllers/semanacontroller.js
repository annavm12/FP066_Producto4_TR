const Semana = require('./semana');

// Controlador para crear una nueva semana
async function crearSemana(req, res) {
  try {
    const semanaData = req.body;
    const nuevaSemana = await Semana.create(semanaData);
    res.status(201).json(nuevaSemana);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la semana' });
  }
}

// Controlador para eliminar una semana
async function eliminarSemana(req, res) {
  try {
    const id = req.params.id;
    const semanaEliminada = await Semana.findByIdAndDelete(id);
    if (semanaEliminada) {
      res.json(semanaEliminada);
    } else {
      res.status(404).json({ error: 'Semana no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la semana' });
  }
}

// Controlador para obtener todos las semanas
async function obtenerSemanas(req, res) {
  try {
    const semanas = await Semana.find();
    res.json(semanas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las semanas' });
  }
}

// Controlador para obtener una semana por su ID
async function obtenerSemanaPorId(req, res) {
  try {
    const id = req.params.id;
    const semana = await Semana.findById(id);
    if (semana) {
      res.json(semana);
    } else {
      res.status(404).json({ error: 'Semana no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la semana' });
  }
}

module.exports = {
  crearSemana,
  eliminarSemana,
  obtenerSemanas,
  obtenerSemanaPorId,
};




/*const Semana = require('../models/semana');

const semanaController ={};

semanaController.getSemana = async (req,res) =>{
  const semanas = await Semana.find();
  resizeTo.json(semanas);
};

semanaController.crearSemana = async (req, res) => {
  try {
    const nuevaSemana = new Semana(req.body);
    await nuevaSemana.save();
    res.status(201).json(nuevaSemana);
  } catch (error) {
    console.log('Error al crear una nueva semana:', error);
    res.status(500).json({ error: 'Error al crear una nueva semana' });
  }
};

semanaController.updateSemana = async (req,res) =>{
  const semanaId = req.params.id;
  const updateSemana =await Semana.findByIdAndUpdate(semanaId, req.body, {new: true});
  res.json(updateSemana);
}

semanaController.deleteSemana = async (req, res)=>{
  const semanaId = req.params.id;
  await Semana.findByIdAndDelete(semanaId);
  res.status(204).json({message: 'semana borrada'});
};

module.exports = semanaController;*/




