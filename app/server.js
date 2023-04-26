/*const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');

const { PORT, GRAPHQL_PATH } = require('./config/config');
const { MONGODB_URI, MONGODB_OPTIONS } = require('./config/database');

const semanaController = require('./controllers/semanacontroller');
const tareaController = require('./controllers/tareacontroller');

const Semana = require('./models/semana');
const Tarea = require('./models/tarea');
const config = require('./config/config');


//conexion
mongoose.connect(MONGODB_URI, MONGODB_OPTIONS);



//Definicion schemes GraphQL
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
    
    type Query {
        obtenerSemana(id: ID!): Semana
        obtenerSemanas: [Semana!]!
    }
    
    type Mutation {
        nuevaSemana(input: NuevaSemanaInput): Semana
        actualizarSemana(input: ActualizarSemanaInput): Semana
        eliminarSemana(id: ID!): ID
    }
    type Tarea {
        id: ID!
        nombre: String!
        horaInicio: String!
        horaFinal: String!
        descripcion: String!
        colaboradores: String!
        prioridad: String!
        complete: Boolean!
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
        obtenerTarea(id: ID!): Tarea
        obtenerTareas: [Tarea!]!
      }
      
      type Mutation {
        nuevaTarea(input: NuevaTareaInput): Tarea
        actualizarTarea(input: ActualizarTareaInput): Tarea
        eliminarTarea(id: ID!): ID
      }
      `;      

//esto es del producto 3, pero me recomendaban hacerlo ahora... Lo dejo ya realiazado
const resolvers = {
  Query: {
    semanas: async () => {
      try {
        const semanas = await Semana.find();
        return semanas;
      } catch (err) {
        throw new Error(`Error al obtener las semanas: ${err}`);
      }
    },
    tareas: async () => {
      try {
        const tareas = await Tarea.find().populate('contenedor');
        return tareas;
      } catch (err) {
        throw new Error(`Error al obtener las tareas: ${err}`);
      }
    }
  },
  Mutation: {
    crearSemana: async (_, { semanaInput }) => {
      try {
        const semana = new Semana({
          semana: semanaInput.semana,
          anio: semanaInput.anio,
          descripcion: semanaInput.descripcion,
          mes: semanaInput.mes,
          horas: semanaInput.horas,
          color: semanaInput.color
        });
        const nuevaSemana = await semana.save();
        return nuevaSemana;
      } catch (err) {
        throw new Error(`Error al crear una nueva semana: ${err}`);
      }
    },
    eliminarSemana: async (_, { id }) => {
      try {
        const semanaEliminada = await Semana.findByIdAndRemove(id);
        return semanaEliminada;
      } catch (err) {
        throw new Error(`Error al eliminar la semana: ${err}`);
      }
    },
    crearTarea: async (_, { tareaInput }) => {
      try {
        const tarea = new Tarea({
          nombre: tareaInput.nombre,
          horaInicio: tareaInput.horaInicio,
          horaFinal: tareaInput.horaFinal,
          descripcion: tareaInput.descripcion,
          colaboradores: tareaInput.colaboradores,
          prioridad: tareaInput.prioridad,
          complete: tareaInput.complete,
          contenedor: tareaInput.contenedor
        });
        const nuevaTarea = await tarea.save();
        return nuevaTarea;
      } catch (err) {
        throw new Error(`Error al crear una nueva tarea: ${err}`);
      }
    },
    eliminarTarea: async (_, { id }) => {
      try {
        const tareaEliminada = await Tarea.findByIdAndRemove(id);
        return tareaEliminada;
      } catch (err) {
        throw new Error(`Error al eliminar la tarea: ${err}`);
      }
    }
  }
};*/


const server = new ApolloServer({ typeDefs, resolvers});

const { url } =  startStandaloneServer(server, {

  listen: { port: config.PORT },


}).then(( data)=>console.log(data));


console.log(`🚀  Server ready at: ${url}`);





