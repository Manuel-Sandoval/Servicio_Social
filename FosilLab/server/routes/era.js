var express = require('express');

var db = require('../middlewares/db');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

// ==========================================
// Obtener todas las eras
// ==========================================
app.get('/', [mdAutenticacion.verifica_logged], (req, res) => {

  const id_eon = req.query.eon;
  let where = '';
  let params = [];

  if(id_eon){
    where = 'where er.id_eon = :id_eon';
    params.push(id_eon);
  }

  db.open('SELECT eo.id_eon, eo.nombre nombre_eon, er.id_era, er.nombre nombre_era ' +
    'FROM eras er ' +
    'JOIN eones eo ON (er.id_eon = eo.id_eon) ' + where, params, false).then(function (data) {
    let eras = data.data.eras.map(era => {
      return era;
    });
    res.status(data.status).json({eras});
  });
});

// ==========================================
// Obtener era por id
// ==========================================
app.get('/:id', [mdAutenticacion.verifica_logged], (req, res) => {

  let id = req.params.id;

  db.open('SELECT eo.id_eon, eo.nombre nombre_eon, er.id_era, er.nombre nombre_era ' +
    'FROM eras er ' +
    'JOIN eones eo ON (er.id_eon = eo.id_eon) ' +
    'WHERE er.id_era = :id', [id], false).then(function (data) {
    let era = data.data.eras[0];
    res.status(data.status).json({era});
  });
});

// ==========================================
// Actualizar era
// ==========================================
app.put('/:id', [mdAutenticacion.verifica_admin], (req, res) => {

  const id = req.params.id;
  const era = req.body.era;

  db.open('UPDATE eras SET nombre = :nombre_era, id_eon = :id_eon WHERE id_era = :id_era',
    [era.NOMBRE_ERA, era.ID_EON, id], true).then(function (data) {
    let eras = data.data.UPDATE;
    res.status(data.status).json({message: eras > 0 ? 'La era se actualizo con exito' : 'Ocurrio un problema y la era no se actualizo, verifique que la era exista'});
  });
});

// ==========================================
// Crear una nueva era
// ==========================================
app.post('/', [mdAutenticacion.verifica_admin], (req, res) => {

  let era = req.body.era;

  db.open('INSERT INTO eras (id_eon, id_era, nombre) VALUES (:id_eon, :id_era, :nombre_era)',
    [era.ID_EON, era.ID_ERA, era.NOMBRE_ERA], true).then(function (data) {
    console.log(data);
    let eras = data.data.INSERT;
    res.status(data.status).json({message: eras > 0 ? 'La era se creo con exito' : 'Ocurrio un problema y la era no se inserto, verifique que la era no exista'});
  });

});

module.exports = app;
