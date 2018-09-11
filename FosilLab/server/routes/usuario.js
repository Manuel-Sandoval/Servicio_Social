var express = require('express');
var bcrypt = require('bcryptjs');

var db = require('../middlewares/db');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

// ==========================================
// Obtener todos los usuarios
// ==========================================
app.get('/', [mdAutenticacion.verifica_admin], (req, res) => {
  db.open('SELECT id_usuario, usuario, activo, usuario_root FROM usuarios', [], false).then(function (data) {
    let usuarios = data.data.usuarios;
    res.status(data.status).json({usuarios});
  });
});

// ==========================================
// Obtener un usuario
// ==========================================
app.get('/:id', [mdAutenticacion.verifica_admin], (req, res) => {
  const id = req.params.id;
  db.open('SELECT id_usuario, usuario, activo, usuario_root FROM usuarios WHERE id_usuario = :id_usuario', [id], false).then(function (data) {
    let usuario = data.data.usuarios[0];
    if (!usuario) {
      res.status(500).json({message: 'El usuario no existe'});
      return;
    }
    res.status(data.status).json({usuario});
  });
});

// ==========================================
// Actualizar usuario
// ==========================================
app.put('/:id', [mdAutenticacion.verifica_admin], (req, res) => {

  const id = req.params.id;
  const usuario = req.body.usuario;

  let query = 'UPDATE usuarios SET usuario = :usuario, activo = :activo, usuario_root = :usuario_root';
  let params = [usuario.USUARIO, usuario.ACTIVO, usuario.USUARIO_ROOT];

  if(usuario.CREDENCIAL) {
    query = query + ' credencial = :credencial';
    params.push(bcrypt.hashSync(usuario.CREDENCIAL, 10));
  }

  params.push(id);

  db.open(query + ' WHERE id_usuario = :id_usuario', params, true).then(function (data) {
    let usuarios = data.data.UPDATE;
    res.status(data.status).json({message: usuarios > 0 ? 'El usuario se actualizo con exito' : 'Ocurrio un problema y el usuario no se actualizo, verifique que el usuario exista'});
  });

});

// ==========================================
// Crear un nuevo usuario
// ==========================================
app.post('/', [mdAutenticacion.verifica_admin], (req, res) => {
  var usuario = req.body.usuario;

  db.open('INSERT INTO usuarios(usuario, credencial, activo, usuario_root) VALUES(:usuario,:credencial,:activo,:usuario_root)',
    [usuario.USUARIO, bcrypt.hashSync(usuario.CREDENCIAL, 10), usuario.ACTIVO, usuario.USUARIO_ROOT], true).then(function (data) {
    let usuarios = data.data.INSERT;
    res.status(data.status).json({message: usuarios > 0 ? 'El usuario se creo con exito' : 'Ocurrio un problema y el usuario no se inserto, verifique que el nombre de usuario no exista'});
  });

});

// ============================================
//   Borrar un usuario por el id
// ============================================
app.delete('/:id', [mdAutenticacion.verifica_admin], (req, res) => {

  var id = req.params.id;

  db.open('DELETE FROM usuarios WHERE id_usuario = :id', [id], true).then(function (data) {
    let usuarios = data.data.DELETE;
    res.status(data.status).json({message: usuarios > 0 ? 'El usuario se elimino con exito' : 'Ocurrio un problema y el usuario no se elimino, verifique que el usuario exista'});
  });

});


module.exports = app;
