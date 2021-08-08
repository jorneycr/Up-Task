const express = require('express');
const router = express.Router();

//importar los controllers
const proyectosController = require('../controllers/proyectosControllers');

module.exports = function () {
    // rutas para el home
    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyectos);
    router.post('/nuevo-proyecto', proyectosController.nuevoProyecto);
    return router;
}


