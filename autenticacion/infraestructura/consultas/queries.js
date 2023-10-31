module.exports = {
  getUserbyUserQ: 'SELECT * FROM usuarios WHERE user = ? LIMIT 1',
  newUser:
    'INSERT INTO usuarios (user, pass, nombre, ape_pat, ape_mat, dni, telefono, direccion, correo) VALUES (?,?,?,?,?,?,?,?,?)',
};
