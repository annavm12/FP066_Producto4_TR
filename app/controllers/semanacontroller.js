const Semana = require('../models/semana');

const semanaController ={};

semanaController.getSemana = async (req,res) =>{
  const semanas = await Semana.find();
  resizeTo.json(semanas);
};

semanaController.crearSemana = async (req,res)=>{
  const nuevaSemana = new Semana(req.body);
  await nuevaSemana.save();
  res.status(201).json(nuevaSemana);
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




