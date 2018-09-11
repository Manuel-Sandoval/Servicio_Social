var express = require('express');
var db = require('../middlewares/db');
var mdAutenticacion = require('../middlewares/autenticacion');
var app = express();

// ==========================================
// Obtener todos los registros
// ==========================================
app.get('/', [mdAutenticacion.verifica_logged], (req, res) => {
  db.open('SELECT fo.id_fosil, fo.muestra, fo.grupo, fo.nombre, pa.id_pais, pa.nombre nombre_pais, ' +
    '       es.id_estado, es.nombre nombre_estado, mu.id_municipio, mu.nombre nombre_municipio, ' +
    '       fo.formacion, eo.id_eon, eo.nombre nombre_eon, er.id_era, er.nombre nombre_era, ' +
    '       fo.comentarios, fo.id_alta, u1.usuario usuario_alta, fo.id_modif, ' +
    '       u2.usuario usuario_modifica, fo.comentarios, ep.nombre nombre_epoca, pe.id_periodo, pe.nombre nombre_periodo' +
    ' FROM fosiles fo ' +
    ' JOIN paises pa ON (fo.id_pais = pa.id_pais) ' +
    ' JOIN estados es ON (fo.id_estado = es.id_estado) ' +
    ' JOIN municipios mu ON (fo.id_municipio = mu.id_municipio) ' +
    ' JOIN eones eo ON (fo.id_eon = eo.id_eon) ' +
    ' JOIN eras er ON (fo.id_era = er.id_era) ' +
    ' JOIN periodos pe ON (fo.id_periodo = pe.id_periodo) ' +
    ' JOIN epocas ep ON (fo.id_epoca = ep.id_epoca) ' +
    ' JOIN usuarios u1 ON (fo.id_alta = u1.id_usuario) ' +
    ' LEFT JOIN usuarios u2 ON (fo.id_modif = u2.id_usuario)', [], false).then(function (data) {
    let fosiles = data.data.fosiles;
    res.status(data.status).json({fosiles});
  });
});

// ==========================================
// Obtener un registro
// ==========================================
app.get('/:id', [mdAutenticacion.verifica_logged], (req, res) => {

  let id = req.params.id;

  db.open('SELECT fo.id_fosil, fo.muestra, fo.grupo, fo.nombre, pa.id_pais, pa.nombre nombre_pais, ' +
    '       es.id_estado, es.nombre nombre_estado, mu.id_municipio, mu.nombre nombre_municipio, ' +
    '       fo.formacion, eo.id_eon, eo.nombre nombre_eon, er.id_era, er.nombre nombre_era, ' +
    '       fo.comentarios, fo.id_alta, u1.usuario usuario_alta, fo.id_modif, ' +
    '       u2.usuario usuario_modifica, pe.id_periodo, ep.id_epoca ' +
    ' FROM fosiles fo ' +
    ' JOIN paises pa ON (fo.id_pais = pa.id_pais) ' +
    ' JOIN estados es ON (fo.id_estado = es.id_estado) ' +
    ' JOIN municipios mu ON (fo.id_municipio = mu.id_municipio) ' +
    ' JOIN eones eo ON (fo.id_eon = eo.id_eon) ' +
    ' JOIN eras er ON (fo.id_era = er.id_era) ' +
    ' JOIN periodos pe ON (fo.id_periodo = pe.id_periodo) ' +
    ' JOIN epocas ep ON (fo.id_epoca = ep.id_epoca) ' +
    ' JOIN usuarios u1 ON (fo.id_alta = u1.id_usuario) ' +
    ' LEFT JOIN usuarios u2 ON (fo.id_modif = u2.id_usuario) ' +
    ' WHERE id_fosil = :id', [id], false).then(function (data) {

    let fosil = data.data.fosiles[0];
    res.status(data.status).json({fosil});
  });
});

// ==========================================
// Actualizar un registro
// ==========================================
app.put('/:id', [mdAutenticacion.verifica_logged], (req, res) => {

  const id = req.params.id;
  const fosil = req.body.fosil;

  db.open('UPDATE FOSILES SET ' +
    '  ID_MODIF = :id_modif ' +
    ' ,ID_MUNICIPIO = :id_municipio ' +
    ' ,GRUPO = :grupo ' +
    ' ,FORMACION = :formacion ' +
    ' ,ID_ERA = :id_era ' +
    ' ,ID_PAIS = :id_pais ' +
    ' ,ID_PERIODO = :id_periodo ' +
    ' ,ID_ESTADO = :id_estado ' +
    ' ,COMENTARIOS = :comentarios ' +
    ' ,MUESTRA = :muestra ' +
    ' ,ID_EPOCA = :id_epoca ' +
    ' ,ID_EON = :id_eon ' +
    ' ,NOMBRE = :nombre ' +
    ' WHERE ID_FOSIL = :id_fosil',
    [req.session.sessionID, fosil.ID_MUNICIPIO, fosil.GRUPO, fosil.FORMACION, fosil.ID_ERA, fosil.ID_PAIS,
      fosil.ID_PERIODO, fosil.ID_ESTADO, fosil.COMENTARIOS, fosil.MUESTRA, fosil.ID_EPOCA, fosil.ID_EON,
      fosil.NOMBRE, id], true).then(function (data) {
    let fosiles = data.data.UPDATE;
    res.status(data.status).json({message: fosiles > 0 ? 'El fosil se actualizo con exito' : 'Ocurrio un problema y el fosil no se actualizo, verifique que el fosil exista'});
  });
});

// ==========================================
// Crear un nuevo registro
// ==========================================
app.post('/', [mdAutenticacion.verifica_logged], (req, res) => {

  var fosil = req.body.fosil;
  console.log(fosil);

  db.open('INSERT INTO fosiles( ' +
    ' id_municipio ' +
    ' ,grupo ' +
    ' ,formacion ' +
    ' ,id_era ' +
    ' ,id_pais ' +
    ' ,id_periodo ' +
    ' ,id_estado ' +
    ' ,comentarios ' +
    ' ,muestra ' +
    ' ,id_epoca ' +
    ' ,id_alta ' +
    ' ,id_eon ' +
    ' ,nombre ' +
    ' ) VALUES (' +
    ' :id_municipio ' +
    ' ,:grupo ' +
    ' ,:formacion ' +
    ' ,:id_era ' +
    ' ,:id_pais ' +
    ' ,:id_periodo ' +
    ' ,:id_estado ' +
    ' ,:comentarios ' +
    ' ,:muestra ' +
    ' ,:id_epoca ' +
    ' ,:id_alta ' +
    ' ,:id_eon ' +
    ' ,:nombre)',
    [fosil.ID_MUNICIPIO, fosil.GRUPO, fosil.FORMACION, fosil.ID_ERA, fosil.ID_PAIS, fosil.ID_PERIODO,
      fosil.ID_ESTADO, fosil.COMENTARIOS, fosil.MUESTRA, fosil.ID_EPOCA, req.session.sessionID, fosil.ID_EON, fosil.NOMBRE], true).then(function (data) {
    let fosiles = data.data.INSERT;
    res.status(data.status).json({message: fosiles > 0 ? 'El fosil se creo con exito' : 'Ocurrio un problema y el fosil no se inserto, verifique.'});
  });

});

module.exports = app;
