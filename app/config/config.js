const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql');

export const typeDefs = `
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
    type Tarea {
      nombre: String!
      horaInicio: String!
      horaFinal: String!
      descripcion: String!
      colaboradores: String!
      prioridad: String!
      complete: Boolean
      contenedor: Container
    }
    
    type Container {
      _id: ID!
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
}
type Query {
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
