var express = require('express');
var db = require('../middlewares/db');
var mdAutenticacion = require('../middlewares/autenticacion');
var app = express();

// ==========================================
// Obtener todos los eones
// ==========================================
app.get('/', [mdAutenticacion.verifica_logged], (req, res) => {
  db.open('SELECT id_eon, nombre FROM eones', [], false).then(function (data) {
    let eones = data.data.eones;
    res.status(data.status).json({eones});
  });
});

// ==========================================
// Obtener un eon
// ==========================================
app.get('/:id', [mdAutenticacion.verifica_logged], (req, res) => {

  let id = req.params.id;

  db.open('SELECT id_eon, nombre FROM eones WHERE id_eon = :id', [id], false).then(function (data) {
    let eon = data.data.eones[0];
    res.status(data.status).json({eon});
  });
});

// ==========================================
// Actualizar eon
// ==========================================
app.put('/:id', [mdAutenticacion.verifica_logged], (req, res) => {

  const id = req.params.id;
  const eon = req.body.eon;

  db.open('UPDATE eones SET nombre = :nombre WHERE id_eon = :id_eon',
    [eon.NOMBRE, id], true).then(function (data) {
    let eones = data.data.UPDATE;
    res.status(data.status).json({message: eones > 0 ? 'El eon se actualizo con exito' : 'Ocurrio un problema y el eon no se actualizo, verifique que el eon exista'});
  });
});

// ==========================================
// Crear un nuevo eon
// ==========================================
app.post('/', [mdAutenticacion.verifica_logged], (req, res) => {

  const eon = req.body.eon;

  db.open('INSERT INTO eones(nombre) VALUES(:nombre)',
    [eon.NOMBRE], true).then(function (data) {
    let eones = data.data.INSERT;
    res.status(data.status).json({message: eones > 0 ? 'El eon se creo con exito' : 'Ocurrio un problema y el eon no se inserto, verifique.'});
  });

});


// ============================================
//   Borrar un eon por el id
// ============================================
// app.delete('/:id', [mdAutenticacion.verifica_logged], (req, res) => {
//
//   var id = req.params.id;
//
//   db.open('DELETE FROM eones WHERE id_eon = :id', [id], true).then(function (data) {
//     let eones = data.data.DELETE;
//     res.status(data.status).json({message: eones > 0 ? 'El eon se elimino con exito' : 'Ocurrio un problema y el eon no se elimino, verifique que el eon exista'});
//   });
//
// });


module.exports = app;
