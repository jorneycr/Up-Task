const express = require('express');
const router = express.Router();

//importar express validator
const { body } = require('express-validator');

//importar los controllers
const proyectosController = require('../controllers/proyectosControllers');
const tareasController = require('../controllers/tareasControllers');


module.exports = function () {
    // rutas para el home
    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyectos);
    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto);

    //listar proyecto
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);

    //actualizar el Proyecto
    router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
    router.post('/nuevo-proyecto/:id', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto
    );

    //eliminar proyecto
    router.delete('/proyectos/:url', proyectosController.eliminarProyecto);


    //tareas
    router.post('/proyectos/:url', tareasController.agregarTarea)


    return router;
}


