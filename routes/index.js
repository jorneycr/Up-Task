const express = require('express');
const router = express.Router();

//importar express validator
const { body } = require('express-validator');

//importar los controllers
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');

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

    //actualizar tarea
    router.post('/proyectos/:url', tareasController.agregarTarea);
    //eliminar tarea
    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);
    //elimina tarea
    router.delete('/tareas/:id', tareasController.eliminarTarea);

    //crear nueva cuenta
    router.get('/crear-cuenta',usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearCuenta);

    //iniciar sesion
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion)


    return router;
}


