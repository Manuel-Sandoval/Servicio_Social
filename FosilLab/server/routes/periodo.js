const express = require('express');
const db = require('../middlewares/db');
const mdAutenticacion = require('../middlewares/autenticacion');

const app = express();

// ==========================================
// Obtener todos los periodos
// ==========================================
app.get('/', [mdAutenticacion.verifica_logged], (req, res) => {

  const id_era = req.query.era;
  let where = '';
  let params = [];

  if(id_era){
    where = 'where pe.id_era = :id_era';
    params.push(id_era);
  }

  db.open('SELECT er.id_era, er.nombre nombre_era, pe.id_periodo, pe.nombre nombre_periodo ' +
          'FROM periodos pe ' +
          'JOIN eras er ON (er.id_era = pe.id_era) ' + where, params, false).then(function (data) {
    let periodos = data.data.periodos;
    res.status(data.status).json({periodos});
  });

});

// ==========================================
// Obtener un periodo
// ==========================================
app.get('/:id', [mdAutenticacion.verifica_logged], (req, res) => {

  let id = req.params.id;

  db.open('SELECT er.id_era, er.nombre nombre_era, pe.id_periodo, pe.nombre nombre_periodo ' +
          'FROM periodos pe ' +
          'JOIN eras er ON (er.id_era = pe.id_era) ' +
          'WHERE pe.id_periodo = :id', [id], false).then(function (data) {
    let periodo = data.data.periodos[0];
    res.status(data.status).json({periodo});
  });
});

// ==========================================
// Actualizar periodo
// ==========================================
app.put('/:id', [mdAutenticacion.verifica_logged], (req, res) => {

  const id = req.params.id;
  const periodo = req.body.periodo;

  console.log(periodo);

  db.open('UPDATE periodos SET nombre = :nombre, id_era = :id_era WHERE id_periodo = :id',
    [periodo.NOMBRE_PERIODO, periodo.ID_ERA, id], true).then(function (data) {
    let periodos = data.data.UPDATE;
    res.status(data.status).json({message: periodos > 0 ? 'El periodo se actualizo con exito' : 'Ocurrio un problema y el periodo no se actualizo, verifique que el periodo exista'});
  });
});

// ==========================================
// Crear un nuevo periodo
// ==========================================
app.post('/', [mdAutenticacion.verifica_logged], (req, res) => {
  var periodo = req.body.periodo;

  db.open('INSERT INTO periodos(nombre, id_era) VALUES(:nombre, :id_era) ',
    [periodo.NOMBRE_PERIODO, periodo.ID_ERA], true).then(function (data) {
    let periodos = data.data.INSERT;
    res.status(data.status).json({message: periodos > 0 ? 'El periodo se creo con exito' : 'Ocurrio un problema y el periodo no se inserto, verifique.'});
  });

});

module.exports = app;
