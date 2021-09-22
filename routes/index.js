const express = require('express');
const router = express.Router();

//importar express validator
const { body } = require('express-validator');

//importar los controllers
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController')

module.exports = function () {
    // rutas para el home
    router.get('/', authController.usuarioAutenticado, proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', authController.usuarioAutenticado, proyectosController.formularioProyectos);
    router.post('/nuevo-proyecto', authController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto);

    //listar proyecto
    router.get('/proyectos/:url', authController.usuarioAutenticado, proyectosController.proyectoPorUrl);

    //actualizar el Proyecto
    router.get('/proyecto/editar/:id', authController.usuarioAutenticado, proyectosController.formularioEditar);
    router.post('/nuevo-proyecto/:id', authController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto
    );

    //eliminar proyecto
    router.delete('/proyectos/:url', authController.usuarioAutenticado, proyectosController.eliminarProyecto);


    //tareas

    //actualizar tarea
    router.post('/proyectos/:url', authController.usuarioAutenticado, tareasController.agregarTarea);
    //eliminar tarea
    router.patch('/tareas/:id', authController.usuarioAutenticado, tareasController.cambiarEstadoTarea);
    //elimina tarea
    router.delete('/tareas/:id', authController.usuarioAutenticado, tareasController.eliminarTarea);

    //crear nueva cuenta
    router.get('/crear-cuenta',  usuariosController.formCrearCuenta);
    router.post('/crear-cuenta',  usuariosController.crearCuenta);

    //iniciar sesion
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion)
    router.post('/iniciar-sesion', authController.autenticarUsuario);

    //cerrar sesion
    router.get('/cerrar-sesion', authController.cerrarSesion);

    //reestablecer contraseña
    router.get('/restablecer', usuariosController.formRestablecerPassword);
    router.post('/restablecer', authController.enviarToken );

    return router;
}


