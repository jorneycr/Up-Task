const express = require('express');
const router = express.Router();

//importar express validator
const { body } = require('express-validator');

//importar los controllers
const proyectosController = require('../controllers/proyectosControllers');

module.exports = function () {
    // rutas para el home
    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyectos);
    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto);

    //listar proyecto
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);
    return router;
}


