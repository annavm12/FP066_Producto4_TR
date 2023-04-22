const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://teamrocket:pokemon@cluster0.ohi0qi5.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conexión a MongoDB Atlas establecida'))
.catch((err) => console.log('Error al conectar a MongoDB Atlas', err));

