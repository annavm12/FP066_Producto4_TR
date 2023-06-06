const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const { createServer } = require('http');
const bodyParser = require('body-parser');
const { PubSub } = require('graphql-subscriptions');
const WebSocket = require('ws');
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
const semanaController = require('./controllers/semanacontroller.js');
const tareaController = require('./controllers/tareacontroller.js');

// Crear una instancia de Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Definir rutas
app.get('/semana/', semanaController.getSemana);
app.post('/semana', semanaController.crearSemana);
app.put('/semana/:id', semanaController.updateSemana);
app.delete('/semana/:id', semanaController.deleteSemana);
app.get('/tarea/:id', tareaController.getTareas);
app.post('/tarea', tareaController.createTarea);
app.put('/tarea/:id', tareaController.updateTarea);
app.put('/tarea', tareaController.updateTareas);
app.delete('/tarea/:id', tareaController.deleteTarea);

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
  }

  input SemanaInput {
    id: String!
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
    id: String!
    nombre: String!
    horaInicio: String!
    horaFinal: String!
    descripcion: String!
    colaboradores: String!
    prioridad: String!
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
    deleteSemana(id: ID!): String!
    crearTarea(input: NuevaTareaInput!): Tarea!
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
const clients = new Set();

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
      // Enviar mensaje a través de WebSocket a todos los clientes
      clients.forEach((client) => {
        client.send('Se ha creado una nueva semana');
      });
      pubsub.publish('NUEVA_SEMANA', { nuevaSemana: semana });
      return semana;
    },
    actualizarSemana: (_, { input }) => {
      return Semana.findByIdAndUpdate(input.id, input, { new: true });
      pubsub.publish('ACTUALIZACION_SEMANA', { actualizacionSemana: updatedSemana });
      return updatedSemana;
    },
    deleteSemana: async (_, { id }) => {
      await Semana.findByIdAndDelete(id);
      pubsub.publish('ELIMINACION_SEMANA', { eliminacionSemana: 'Semana eliminada correctamente' });
      return 'Semana eliminada correctamente';
    },
    crearTarea: (_, { input }) => {
      const tarea = new Tarea(input);
      tarea.save();
      // Enviar mensaje a través de WebSocket
      clients.forEach((client) => {
        client.send('Se ha creado una nueva tarea');
      });
      pubsub.publish(`NUEVA_TAREA_${input.contenedorId}`, { nuevaTarea: tarea });
      return tarea;
    },
    actualizarTarea: (_, { input }) => {
      return Tarea.findByIdAndUpdate(input.id, input, { new: true });
      pubsub.publish(`ACTUALIZACION_TAREA_${input.contenedorId}`, { actualizacionTarea: updatedTarea });
      return updatedTarea;
    },
    eliminarTarea: async (_, { id }) => {
      await Tarea.findByIdAndDelete(id);
      pubsub.publish(`ELIMINACION_TAREA_${contenedorId}`, { eliminacionTarea: 'Tarea eliminada correctamente' });

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

// Crear el servidor HTTP
const httpServer = createServer(app);

// Configurar WebSocket
const wss = new WebSocket.Server({ server: httpServer });

wss.on('connection', (ws) => {
  console.log('Nueva conexión de WebSocket');

  // Almacenar el cliente WebSocket en la variable `clients`
  clients.add(ws);

  ws.on('message', (message) => {
    console.log('Mensaje recibido:', message);
    // Aquí puedes realizar acciones con los datos recibidos
  });

  ws.on('close', () => {
    console.log('Conexión de WebSocket cerrada');

    // Eliminar el cliente WebSocket de la variable `clients` al cerrarse la conexión
    clients.delete(ws);
  });
});

// Conectar el servidor Apollo con Express
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

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
