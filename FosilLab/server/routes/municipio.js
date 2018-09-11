const express = require('express');

const db = require('../middlewares/db');
const mdAutenticacion = require('../middlewares/autenticacion');

const app = express();

// ==========================================
// Obtener todos los municipios
// ==========================================
app.get('/', [mdAutenticacion.verifica_logged], (req, res) => {
  const id_estado = req.query.estado;
  let where = '';
  let params = [];

  if(id_estado){
    where = 'where mu.id_estado = :id_estado';
    params.push(id_estado);
  }

  db.open('SELECT es.id_estado, es.nombre nombre_estado, mu.id_municipio, mu.nombre nombre_municipio' +
    ' FROM municipios mu' +
    ' JOIN estados    es ON (es.id_estado = mu.id_estado) ' + where, params, false).then(function (data) {
    let municipios = data.data.municipios;
    res.status(data.status).json({municipios});
  });
});

// ==========================================
// Obtener un municipio
// ==========================================
app.get('/:id', [mdAutenticacion.verifica_logged], (req, res) => {

  const id = req.params.id;

  db.open('SELECT es.id_estado, es.nombre nombre_estado, mu.id_municipio, mu.nombre nombre_municipio' +
    ' FROM municipios mu' +
    ' JOIN estados    es ON (es.id_estado = mu.id_estado)' +
    'WHERE mu.id_municipio =  :id', [id], false).then(function (data) {
    let municipio = data.data.municipios[0];
    res.status(data.status).json({municipio});
  });
});

// ==========================================
// Actualizar municipio por pk
// ==========================================
app.put('/:id', [mdAutenticacion.verifica_logged], (req, res) => {

  const id = req.params.id;
  const municipio = req.body.municipio;

  db.open('UPDATE municipios SET nombre = :nombre WHERE id_municipio = :id_municipio',
    [municipio.NOMBRE_MUNICIPIO, id], true).then(function (data) {
    let municipios = data.data.UPDATE;
    res.status(data.status).json({message: municipios > 0 ? 'El municipio se actualizo con exito' : 'Ocurrio un problema y el municipio no se actualizo, verifique que el municipio exista'});
  });
});

// ==========================================
// Crear un nuevo municipio
// ==========================================
app.post('/', [mdAutenticacion.verifica_logged], (req, res) => {
  const municipio = req.body.municipio;

  db.open('INSERT INTO municipios(id_estado, nombre) VALUES(:id_estado, :nombre)',
    [municipio.ID_ESTADO, municipio.NOMBRE_MUNICIPIO], true).then(function (data) {
    console.log(data);
    let municipios = data.data.INSERT;
    res.status(data.status).json({message: municipios > 0 ? 'El municipio se creo con exito' : 'Ocurrio un problema y el municipio no se inserto, verifique.'});
  });

});

module.exports = app;
