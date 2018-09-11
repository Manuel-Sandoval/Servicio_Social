var express = require('express');

var db = require('../middlewares/db');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

// ==========================================
// Obtener todas los estados
// ==========================================
app.get('/', [mdAutenticacion.verifica_logged], (req, res) => {
  const id_pais = req.query.pais;
  let where = '';
  let params = [];

  if(id_pais){
    where = 'where es.id_pais = :id_pais';
    params.push(id_pais);
  }

  db.open('SELECT pa.id_pais, pa.nombre nombre_pais, es.id_estado, es.nombre nombre_estado ' +
    'FROM estados es ' +
    'JOIN paises pa ON (es.id_pais =  pa.id_pais) ' + where, params, false).then(function (data) {
    let estados = data.data.estados;
    res.status(data.status).json({estados});
  });
});

// ==========================================
// Obtener un estado
// ==========================================
app.get('/:id', [mdAutenticacion.verifica_logged], (req, res) => {

  let id = req.params.id;

  db.open('SELECT pa.id_pais, pa.nombre nombre_pais, es.id_estado, es.nombre nombre_estado ' +
    'FROM estados es ' +
    'JOIN paises pa ON (es.id_pais =  pa.id_pais) ' +
    'WHERE es.id_estado =  :id', [id], false).then(function (data) {
    let estado = data.data.estados[0];
    res.status(data.status).json({estado});
  });
});

// ==========================================
// Obtener estados por pais
// ==========================================
app.get('/?pais=:pais_id', [mdAutenticacion.verifica_logged], (req, res) => {

  let id = req.params.pais;
  console.log(req.params);

  db.open('SELECT pa.id_pais, pa.nombre nombre_pais, es.id_estado, es.nombre nombre_estado ' +
    'FROM estados es ' +
    'JOIN paises pa ON (es.id_pais =  pa.id_pais) ' +
    'WHERE es.id_pais =  :id', [id], false).then(function (data) {
    let estados = data.data.estados;
    res.status(data.status).json({estados});
  });
});

// ==========================================
// Actualizar estado
// ==========================================
app.put('/:id', [mdAutenticacion.verifica_admin], (req, res) => {

  const id = req.params.id;
  const estado = req.body.estado;

  db.open('UPDATE estados SET nombre = :nombre_estado WHERE id_estado = :id_estado',
    [estado.NOMBRE_ESTADO, id], true).then(function (data) {
    let estados = data.data.UPDATE;
    res.status(data.status).json({message: estados > 0 ? 'El estado se actualizo con exito' : 'Ocurrio un problema y el estado no se actualizo, verifique que el estado exista'});
  });
});

// ==========================================
// Crear un nuevo estado
// ==========================================
app.post('/', [mdAutenticacion.verifica_admin], (req, res) => {
  var estado = req.body.estado;

  db.open('INSERT INTO estados (id_pais, nombre) VALUES (:id_pais, :nombre_estado)',
    [estado.ID_PAIS, estado.NOMBRE_ESTADO], true).then(function (data) {
    console.log(data);
    let estados = data.data.INSERT;
    res.status(data.status).json({message: estados > 0 ? 'El estado se creo con exito' : 'Ocurrio un problema y el estado no se inserto, verifique que el estado no exista'});
  });

});

module.exports = app;
