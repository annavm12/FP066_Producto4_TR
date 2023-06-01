const Semana = require('../models/semana');

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

module.exports = semanaController;




