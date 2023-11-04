import { gql } from 'graphql-tag';

const typeDefs = gql`
  scalar DateTime

  type Atencion {
    id_atencion: Int
    cl_dni: Int
    cl_nombre: String
    descripcion: String
    img_antes: String
    img_desp: String
  }

  type Visita {
    id: Int
    id_incidencia: String
    id_cuadrilla: Int
    fecha: DateTime
    estado: String
    id_atencion: Int
    atencion: Atencion
    motivo: String
    imagen: String
    lat: Float
    lon: Float
  }

  type ErrorInfo {
    code: String
    message: String
  }
  type Query {
    hello: String
    visita(id: Int): Visita
    visitas: [Visita]
  }
  input VisitaInput {
    id: Int
    estado: String
    motivo: String
    imagen: String
    lat: Float
    lon: Float
  }

  type Mutation {
    createVisita(incidencia: String, cuadrilla: Int, fecha: DateTime): Visita
    updateVisita(visita: VisitaInput): Visita
    delVisita(id: Int): Visita
  }
`;

export default typeDefs;
