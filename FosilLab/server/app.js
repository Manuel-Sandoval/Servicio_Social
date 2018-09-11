// Requires
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const http = require('http');

// Inicializar variables
const app = express();

// CORS
app.use(cors());

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
  secret: 'fosil-lab',
  name: 'sessionId',
  cookie: {maxAge: 10000000},
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'browser')));

// Importar rutas
// var appRoutes = require('./routes/app');
const usuarioRoutes = require('./routes/usuario');
const loginRoutes = require('./routes/login');
const eonRoutes = require('./routes/eon');
const epocaRoutes = require('./routes/epoca');
const eraRoutes = require('./routes/era');
const estadoRoutes = require('./routes/estado');
const fosilRoutes = require('./routes/fosil');
const municipioRoutes = require('./routes/municipio');
const paisRoutes = require('./routes/pais');
const periodoRoutes = require('./routes/periodo');

// Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/eones', eonRoutes);
app.use('/api/epocas', epocaRoutes);
app.use('/api/eras', eraRoutes);
app.use('/api/estados', estadoRoutes);
app.use('/api/fosiles', fosilRoutes);
app.use('/api/municipios', municipioRoutes);
app.use('/api/paises', paisRoutes);
app.use('/api/periodos', periodoRoutes);

// app.use('/api', appRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'browser/index.html'));
});

const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});
