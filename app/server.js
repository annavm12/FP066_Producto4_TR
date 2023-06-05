const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const { createServer } = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const { PubSub } = require('graphql-subscriptions');

// Conectar a la base de datos de MongoDB
mongoose
  .connect('mongodb+srv://teamrocket:pokemon@cluster0.ohi0qi5.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Conectado a la base de datos'))
  .catch((error) => console.log('Error al conectar a la base de datos:', error));

// Importar modelos y controladores
const Semana = require('./models/semana.js');
const Tarea = require('./models/tarea.js');
//const semanaController = require('./controllers/semanacontroller.js');
//const tareaController = require('./controllers/tareacontroller.js');

// Crear una instancia de Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para obtener todas las semanas
app.get('/semanas', async (req, res) => {
  try {
    const semanas = await Semana.find();
    res.json(semanas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las semanas' });
  }
});
// Ruta para obtener una semana por su ID
app.get('/semanas/:id', async (req, res) => {
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
});
// Ruta para crear una nueva semana
app.post('/semanas', async (req, res) => {
  try {
    const semanaData = req.body;
    const nuevaSemana = await Semana.create(semanaData);
    res.status(201).json(nuevaSemana);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la semana' });
  }
});
// Ruta para eliminar una semana por su ID
app.delete('/semanas/:id', async (req, res) => {
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
});
// Definir rutas
/*app.get('/semana/', semanaController.getSemana);
app.post('/semana', semanaController.crearSemana);
app.put('/semana/:id', semanaController.updateSemana);
app.delete('/semana/:id', semanaController.deleteSemana);
app.get('/tarea/:id', tareaController.getTareas);
app.post('/tarea', tareaController.createTarea);
app.put('/tarea/:id', tareaController.updateTarea);
app.put('/tarea', tareaController.updateTareas);
app.delete('/tarea/:id', tareaController.deleteTarea);*/

// Definir el esquema de GraphQL
const typeDefs = gql`
type Semana {
  id: ID!
  semana: Int!
  anio: Int!
  descripcion: String!
  mes: String!
  horas: Int!
  color: String!
}

  type Tarea {
    id: ID!
    nombre: String!
    horaInicio: String!
    horaFinal: String!
    descripcion: String!
    colaboradores: String!
    prioridad: String!
    complete: Boolean
    archivo: String
  }

  input SemanaInput {
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
    crearSemana(input: SemanaInput!): Semana!
    actualizarSemana(input: ActualizarSemanaInput!): Semana
    eliminarSemana(id: ID!): String
    crearTarea(input: NuevaTareaInput!): Tarea
    actualizarTarea(input: ActualizarTareaInput!): Tarea
    eliminarTarea(id: ID!): String
  }

  type Subscription {
    nuevaSemana: Semana
    actualizacionSemana: Semana
    eliminacionSemana: String
    nuevaTarea(contenedorId: ID!): Tarea
    actualizacionTarea(contenedorId: ID!): Tarea
    eliminacionTarea(contenedorId: ID!): String
  }
`;

// Definir resolvers para resolver las operaciones de la API
const resolvers = {
  Query: {
    obtenerSemana: (_, { id }) => Semana.findById(id),
    obtenerSemanas: () => Semana.find(),
    obtenerTarea: (_, { id }) => Tarea.findById(id),
    obtenerTareas: () => Tarea.find(),
  },
  Mutation: {
    crearSemana: async (_, { input }) => {
      const semana = new Semana(input);
      await semana.save();
      return semana;
    },
    actualizarSemana: (_, { input }) => {
      return Semana.findByIdAndUpdate(input.id, input, { new: true });
    },
    eliminarSemana: async (_, { id }) => {
      await Semana.findByIdAndDelete(id);
      return 'Semana eliminada correctamente';
    },
    crearTarea: (_, { input }) => {
      const tarea = new Tarea(input);
      tarea.save();
      return tarea;
    },
    actualizarTarea: (_, { input }) => {
      return Tarea.findByIdAndUpdate(input.id, input, { new: true });
    },
    eliminarTarea: async (_, { id }) => {
      await Tarea.findByIdAndDelete(id);
      return 'Tarea eliminada correctamente';
    },
  },
  Subscription: {
    nuevaSemana: {
      subscribe: () => pubsub.asyncIterator(['NUEVA_SEMANA']),
    },
    actualizacionSemana: {
      subscribe: () => pubsub.asyncIterator(['ACTUALIZACION_SEMANA']),
    },
    eliminacionSemana: {
      subscribe: () => pubsub.asyncIterator(['ELIMINACION_SEMANA']),
    },
    nuevaTarea: {
      subscribe: (_, { contenedorId }) =>
        pubsub.asyncIterator([`NUEVA_TAREA_${contenedorId}`]),
    },
    actualizacionTarea: {
      subscribe: (_, { contenedorId }) =>
        pubsub.asyncIterator([`ACTUALIZACION_TAREA_${contenedorId}`]),
    },
    eliminacionTarea: {
      subscribe: (_, { contenedorId }) =>
        pubsub.asyncIterator([`ELIMINACION_TAREA_${contenedorId}`]),
    },
  },
};

// Crear el servidor Apollo
const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ pubsub }),
});

// Conectar el servidor Apollo con Express
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

// Crear el servidor HTTP
const httpServer = createServer(app);

// Configurar Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});
io.on('connection',(socket) =>{
  console.log('Nueva conexion de Websocket');
    socket.on('message', (data)=>{
      console.log('mensaje recibido', data);
    });
  socket.on('disconnect',() =>{
    console.log('desconectado de WebSocket');
  });
});

app.use(express.static('public/js'));
app.use(express.static('public/html'));
app.use(express.static('public/css'));
app.use(express.static('public/media'));
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});

// Iniciar el servidor Apollo
startServer();

// Iniciar el servidor HTTP
httpServer.listen(3000, () => {
  console.log(`Servidor web en http://localhost:3000`);
});
