var express = require('express');
var db = require('../middlewares/db');
var mdAutenticacion = require('../middlewares/autenticacion');
var app = express();

// ==========================================
// Obtener todos los registros
// ==========================================
app.get('/', [mdAutenticacion.verifica_logged], (req, res) => {
  db.open('SELECT id_pais, nombre FROM paises', [], false).then(function (data) {
    let paises = data.data.paises;
    res.status(data.status).json({paises});
  });
});

// ==========================================
// Obtener un registro
// ==========================================
app.get('/:id', [mdAutenticacion.verifica_logged], (req, res) => {

  let id = req.params.id;

  db.open('SELECT id_pais, nombre FROM paises WHERE id_pais = :id', [id], false).then(function (data) {
    let pais = data.data.paises[0];
    res.status(data.status).json({pais});
  });
});

// ==========================================
// Actualizar registro
// ==========================================
app.put('/:id', [mdAutenticacion.verifica_logged], (req, res) => {

  const id = req.params.id;
  const pais = req.body.pais;

  db.open('UPDATE paises SET nombre = :nombre WHERE id_pais = :id_pais',
    [pais.NOMBRE, id], true).then(function (data) {
    let paises = data.data.UPDATE;
    res.status(data.status).json({message: paises > 0 ? 'El pais se actualizo con exito' : 'Ocurrio un problema y el pais no se actualizo, verifique que el pais exista'});
  });
});

// ==========================================
// Crear un nuevo registro
// ==========================================
app.post('/', [mdAutenticacion.verifica_logged], (req, res) => {
  var pais = req.body.pais;

  db.open('INSERT INTO paises(nombre) VALUES(:nombre)',
    [pais.NOMBRE], true).then(function (data) {
    let paises = data.data.INSERT;
    res.status(data.status).json({message: paises > 0 ? 'El pais se creo con exito' : 'Ocurrio un problema y el pais no se inserto, verifique.'});
  });

});

module.exports = app;
