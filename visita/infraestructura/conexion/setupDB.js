import { query } from './db.js';
import database from '../esquema/db.sql';

await query(database);
