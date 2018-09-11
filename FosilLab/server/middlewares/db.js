const oracledb = require('oracledb');
const config = require('../config/config');

const con = {
  user: config.USERDB,
  password: config.PASSDB,
  connectionString: config.CONSTRING
};

function error(err, cn, resolve) {
    if (err) {
        if (cn != null) close(cn);
        resolve({data: err, status: 500});
    }
}

function open(sql, binds, dml) {
    return new Promise((resolve) => {
        let data = {};
        oracledb.getConnection(con, function (err, cn) {
            let arreglo = sql.split(' ');
            let pos = arreglo.indexOf('FROM');
            let nombre = arreglo[pos + 1];
            error(err, null, resolve);
            cn.execute(sql, binds, {autoCommit: dml, outFormat: oracledb.OBJECT}, function (err, result) {
                error(err, cn, resolve);
                data[nombre] = dml ? result && result.rowsAffected : result && result.rows;
                close(cn);
                resolve({data, status: 200});
            });
        });
    });
}

function close(cn) {
    cn.release(function (err) {
        if (err) console.log(err.message);
    });
}

exports.open = open;
exports.close = close;
