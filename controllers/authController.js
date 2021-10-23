const passport = require('passport');
const Usuarios = require('../models/Usuarios');

const crypto = require('crypto');

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
        res.redirect('/restablecer');
    }

    //usuario existe
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiration = Date.now() + 3600000;

    //guardalos en la base de datos
    await usuario.save();

    //url de reset
    const resetUrl = `http://${req.headers.host}/restablecer/${usuario.token}`;

}

exports.resetPassword = async (req, res) =>{
    res.json(req.params.token)
}