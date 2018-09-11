var db = require('./db');

// ==========================================
//  Verificar ADMIN
// ==========================================
exports.verifica_admin = function (req, res, next) {
  db.open('SELECT * FROM usuarios WHERE id_usuario = :id', [req.session.sessionID], false).then(data => {

    var usuario = data.data.usuarios[0];

    if (usuario && usuario.USUARIO_ROOT === 1) {
      next();
      return;
    }
    return res.status(401).json({error: 'No es administrador, no puede acceder a esta informacion'});
  });
};


// ==========================================
//  Verificar Logged
// ==========================================
exports.verifica_logged = function (req, res, next) {

  db.open('SELECT * FROM usuarios WHERE id_usuario = :id', [req.session.sessionID], false).then(data => {

    const usuario = data.data.usuarios[0];

    if (usuario) {
      next();
      return;
    }

    return res.status(401).json({error: 'No puedes acceder a esta informacion hasta que se encuentre loggeado'});
  });

};

