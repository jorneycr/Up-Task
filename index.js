const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const routes = require('./routes');

//helpers con algunos funciones
const helpers = require('./helpers');

//crear la conexion a la bd
const db = require('./config/db');

//importar
require('./models/Proyectos');
require('./models/Tareas');

db.sync()
    .then(() => console.log('Conectando al servidor'))
    .catch(error => console.log(error));

//app de express
const app = express();

//cargar archivos estaticos o publicos
app.use(express.static('public'));

// habilitar pug
app.set('view engine', 'pug');

//vistas
app.set('views', path.join(__dirname, './views'));

//pasar var dump a la aplicacion
app.use((req, res, next)=>{
    res.locals.vardump = helpers.vardump;
    next();
})

//habilitar bodyParser
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes());

app.listen(3000);