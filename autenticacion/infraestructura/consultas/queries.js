module.exports = {
  getUserbyUserQ: 'SELECT * FROM usuarios WHERE user = ? LIMIT 1',
  newUser:
    'INSERT INTO usuarios (id_usuario, user, pass, name, dni, phone, address, email) VALUES (?,?,?,?,?,?,?,?)',
};
