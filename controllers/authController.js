const passport = require('passport');

exports.autenticarUsuario = passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect:'/iniciar-sesion',
    failureFlash:true,
    badRequestMessage: 'Ambos campos son Obligatorios'
});

//funcion para revisar si el usuario esta logueado o no
exports.usuarioAutenticado = (req, res, next) => {

    //si el usuario esta autentificado, adelante
    if(req.isAuthenticated()){
        return next();
    }
    //sino esta autentificado, redirigir al formulario
    return res.redirect('/iniciar-sesion');
}

//cierra la session
exports.cerrarSesion = (req, res) =>{
    req.session.destroy(()=>{
        res.redirect('/iniciar-sesion');
    })
}