const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');


// Conectar a la base de datos de MongoDB
mongoose.connect('mongodb+srv://teamrocket:pokemon@cluster0.ohi0qi5.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado a la base de datos'))
  .catch((error) => console.log('Error al conectar a la base de datos:', error));

  const Semana = require('./models/semana.js');
  const Tarea = require('./models/tarea.js');
  const semanaController = require('./controllers/semanacontroller.js');
  const tareaController = require ('./controllers/tareacontroller.js');

  // Crear una instancia de Express
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.get('/semana/:id', semanaController.obtenerSemana);
    app.get('/semana', semanaController.obtenerSemanas);
    app.post('/semana', semanaController.crearSemana);
    app.put('/semana/:id', semanaController.actualizarSemana);
    app.delete('/semana/:id', semanaController.eliminarSemana);      app.get('/tarea', tareaController.obtenerTarea);
    app.get('/tarea/:id', tareaController.obtenerTarea);
    app.get('/tarea', tareaController.obtenerTareas);
    app.post('/tarea', tareaController.crearTarea);
    app.put('/tarea/:id', tareaController.actualizarTarea);
    app.delete('/tarea/:id', tareaController.eliminarTarea);
    

 const typeDefs = `
  type Semana {
    _id: ID!
    semana: Int!
    anio: Int!
    descripcion: String!
    mes: String!
    horas: Int!
    color: String!
  }
    type Tarea {
      nombre: String!
      horaInicio: String!
      horaFinal: String!
      descripcion: String!
      colaboradores: String!
      prioridad: String!
      complete: Boolean
    }
    

  input NuevaSemanaInput {
    semana: Int!
    anio: Int!
    descripcion: String!
    mes: String!
    horas: Int!
    color: String!
}

  input ActualizarSemanaInput {
      id: ID!
      semana: Int
      anio: Int
      descripcion: String
      mes: String
      horas: Int
      color: String
  }
  input NuevaTareaInput {
    nombre: String!
    horaInicio: String!
    horaFinal: String!
    descripcion: String!
    colaboradores: String!
    prioridad: String!
    complete: Boolean
    contenedorId: ID!
  }

  input ActualizarTareaInput {
    id: ID!
    nombre: String
    horaInicio: String
    horaFinal: String
    descripcion: String
    colaboradores: String
    prioridad: String
    complete: Boolean
    contenedorId: ID
}
type Query {
  obtenerSemana(id: ID!): Semana
  obtenerSemanas: [Semana!]!
  obtenerTarea(id: ID!): Tarea
  obtenerTareas: [Tarea!]!
}
type Mutation {
  nuevaSemana(input: NuevaSemanaInput): Semana
  actualizarSemana(input: ActualizarSemanaInput): Semana
  eliminarSemana(id: ID!): ID
}
type Mutation {
  nuevaTarea(input: NuevaTareaInput): Tarea
  actualizarTarea(input: ActualizarTareaInput): Tarea
  eliminarTarea(id: ID!): ID
}
`;
//resolvers


const resolvers = {
  Query: {
    obtenerSemana: async (_, { id }) => {
      const semana = await Semana.findById(id);
      return semana;
    },
    obtenerSemanas: async () => {
      const semanas = await Semana.find();
      return semanas;
    },
    obtenerTarea: async (_, { id }) => {
      const tarea = await Tarea.findById(id);
      return tarea;
    },
    obtenerTareas: async () => {
      const tareas = await Tarea.find();
      return tareas;
    }
  },
  Mutation: {
    nuevaSemana: async (_, { input }) => {
      const semana = new Semana(input);
      await semana.save();
      return semana;
    },
    actualizarSemana: async (_, { input }) => {
      const { id, ...actualizaciones } = input;
      const semana = await Semana.findByIdAndUpdate(id, actualizaciones, { new: true });
      return semana;
    },
    eliminarSemana: async (_, { id }) => {
      await Semana.findByIdAndDelete(id);
      return id;
    },
    nuevaTarea: async (_, { input }) => {
      const tarea = new Tarea(input);
      await tarea.save();
      return tarea;
    },
    actualizarTarea: async (_, { input }) => {
      const { id, ...actualizaciones } = input;
      const tarea = await Tarea.findByIdAndUpdate(id, actualizaciones, { new: true });
      return tarea;
    },
    eliminarTarea: async (_, { id }) => {
      await Tarea.findByIdAndDelete(id);
      return id;
    }
  },
 
};

module.exports = resolvers;


// Crear un servidor Apollo
const server = new ApolloServer({ typeDefs, resolvers });



// Iniciar el servidor Apollo y conectarlo con Express
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer();

// Iniciar el servidor Express
app.listen(3000, () => console.log('Servidor iniciado'));

