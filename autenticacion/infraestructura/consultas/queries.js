module.exports = {
  getUserbyUserQ: 'SELECT * FROM usuarios WHERE user = ? LIMIT 1',
  newUser: 'INSERT INTO usuarios (user, pass, id_tecnico) VALUES (?,?,?)',
};
