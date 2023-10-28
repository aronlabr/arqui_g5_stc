// Esta forma de representar modelos

export let users = {
  id: 1,
  name: 'Luis',
  email: '4@a',
};

export default class User1 {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

// O de este Modo implementando las peticion tambien

import { query } from '../../infraestructura/conexion/db.js';
import {
  getUserId,
  createUser,
} from '../../infraestructura/consultas/queries.js';

export class User2 {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static async getById(userId) {
    const userRecord = await query(getUserId, [userId]);
    if (userRecord) {
      return new User2(userRecord.id, userRecord.name, userRecord.email);
    }
    return null;
  }

  static async create(name, email) {
    const userRecord = await query(createUser, [name, email]);
    return new User2(userRecord.id, userRecord.name, userRecord.email);
  }

  // Other methods for updating, deleting, etc., based on your application's requirements
}
