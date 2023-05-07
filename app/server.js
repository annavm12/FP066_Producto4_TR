const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

// Conectar a la base de datos de MongoDB
mongoose.connect('mongodb+srv://teamrocket:pokemon@cluster0.ohi0qi5.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado a la base de datos'))
  .catch((error) => console.log('Error al conectar a la base de datos:', error));

// Definir un esquema de GraphQL
const typeDefs = `
  type Query {
    hello: String
  }
`;

// Definir las resolvers para el esquema
const resolvers = {
  Query: {
    hello: () => 'Hola mundo!'
  }
};

// Crear un servidor Apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Crear una instancia de Express
const app = express();

// Iniciar el servidor Apollo y conectarlo con Express
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer();

// Iniciar el servidor Express
app.listen(3000, () => console.log('Servidor iniciado'));

