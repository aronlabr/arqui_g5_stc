export default {
  getUserId: 'SELECT * FROM users WHERE id = ?',
  createUser: 'INSERT INTO users (name, email) VALUES (?, ?) RETURNING *',
  prueba: 'SELECT 1 + 1 as result',
  updateVisitState: 'update ? : estado',
};
