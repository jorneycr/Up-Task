const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
// const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

//helpers con algunos funciones
const helpers = require('./helpers');

//crear la conexion a la bd
const db = require('./config/db');

//importar
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
    .then(() => console.log('Conectando al servidor'))
    .catch(error => console.log(error));

//app de express
const app = express();


//cargar archivos estaticos o publicos
app.use(express.static('public'));

// habilitar pug
app.set('view engine', 'pug');

//habilitar bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

//agregamos express validartor para usar en todo la aplicacion
// app.use(expressValidator);

//vistas
app.set('views', path.join(__dirname, './views'));

//agregar flash messages
app.use(flash());

app.use(cookieParser());

//sessiones nos permiten navegar entre diferentes paginas
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//pasar var dump a la aplicacion
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    next();
})

app.use('/', routes());

app.listen(3000);