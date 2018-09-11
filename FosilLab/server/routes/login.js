const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('../middlewares/db');

const app = express();

// ==========================================
//  Autenticación normal
// ==========================================
app.post('/', (req, res) => {

  const user = req.body.user;

  db.open('SELECT * FROM usuarios WHERE LOWER(usuario) = :username AND activo = 1', [user.USUARIO.toLowerCase()]).then(data => {
    let usuario = data.data.usuarios[0];
    if (!usuario) res.status(500).json({message: 'El usuario no existe'});
    else {
      if (!bcrypt.compareSync(user.CREDENCIAL, usuario.CREDENCIAL)) res.status(500).json({message: 'Contraseña invalida'});
      else {
        delete usuario.CREDENCIAL;
        req.session.sessionID = usuario.ID_USUARIO;
        res.status(200).json({usuario});
      }
    }
  });
});

module.exports = app;
