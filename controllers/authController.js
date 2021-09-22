const passport = require('passport');

const Usuarios = require('../models/Usuarios');

//autentificar el usuario
exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son Obligatorios'
});

//funcion para revisar si el usuario esta logueado o no
exports.usuarioAutenticado = (req, res, next) => {

    //si el usuario esta autentificado, adelante
    if (req.isAuthenticated()) {
        return next();
    }
    //sino esta autentificado, redirigir al formulario
    return res.redirect('/iniciar-sesion');
}

//cierra la session
exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion');
    })
}

//crear token si el usuario es valido
exports.enviarToken = async (req, res) => {
    //verificar el usuario
    const { email } = req.body;
    const usuario = await Usuarios.findOne({ where: { email } });

    //sino existe el usuario
    if (!usuario) {
        req.flash('error', 'No existe esa cuenta');
        res.render('restablecer', {
            nombrePagina: 'Restablecer tu Contraseña',
            mensajes: req.flash()
        })
    }
}