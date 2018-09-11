const express = require('express');

const db = require('../middlewares/db');
const mdAutenticacion = require('../middlewares/autenticacion');

const app = express();

// ==========================================
// Obtener todas las epocas
// ==========================================
app.get('/', [mdAutenticacion.verifica_logged], (req, res) => {

  const id_periodo = req.query.periodo;
  let where = '';
  let params = [];

  if(id_periodo){
    where = 'where e.id_periodo = :id_periodo';
    params.push(id_periodo);
  }

  db.open('SELECT p.id_periodo, p.nombre nombre_periodo, e.id_epoca, e.nombre nombre_epoca ' +
    'FROM epocas e ' +
    'JOIN periodos p ON (p.id_periodo = e.id_periodo) ' + where, params, false).then(function (data) {
    let epocas = data.data.epocas;
    res.status(data.status).json({epocas});
  });
});

// ==========================================
// Obtener un eon
// ==========================================
app.get('/:id', [mdAutenticacion.verifica_logged], (req, res) => {

  let id = req.params.id;

  db.open('SELECT p.id_periodo, p.nombre nombre_periodo, e.id_epoca, e.nombre nombre_epoca ' +
    'FROM epocas e ' +
    'JOIN periodos p ON (p.id_periodo = e.id_periodo) ' +
    'WHERE id_epoca = :id', [id], false).then(function (data) {
    let epoca = data.data.epocas[0];
    res.status(data.status).json({epoca});
  });
});

// ==========================================
// Actualizar epoca
// ==========================================
app.put('/:id', [mdAutenticacion.verifica_logged], (req, res) => {

  const id = req.params.id;
  const epoca = req.body.epoca;

  db.open('UPDATE epocas SET nombre = :nombre_epoca, id_periodo = :id_periodo WHERE id_epoca = :id',
    [epoca.NOMBRE_EPOCA, epoca.ID_PERIODO, id], true).then(function (data) {
    let epocas = data.data.UPDATE;
    res.status(data.status).json({message: epocas > 0 ? 'La epoca se actualizo con exito' : 'Ocurrio un problema y la epoca no se actualizo, verifique que la epoca exista'});
  });
});

// ==========================================
// Crear una nueva epoca
// ==========================================
app.post('/', [mdAutenticacion.verifica_logged], (req, res) => {
  var epoca = req.body.epoca;

  db.open('INSERT INTO epocas (id_periodo, nombre) VALUES (:id_periodo, :nombre_epoca)',
    [epoca.ID_PERIODO, epoca.NOMBRE_EPOCA], true).then(function (data) {
    let epocas = data.data.INSERT;
    res.status(data.status).json({message: epocas > 0 ? 'La epoca se creo con exito' : 'Ocurrio un problema y la epoca no se inserto, verifique que la epoca no exista'});
  });

});

module.exports = app;
