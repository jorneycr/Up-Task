const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//referenciq ql modelo donde vamos a autentificar
const Usuarios = require('../models/Usuarios');

//local strategy - login con credenciales propias y password
passport.use(
    new LocalStrategy(
        //por default passport espera un usuario y password
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({
                    where: { email: email }
                });
                //el usuario existe, pero no es correcto el password
                if (!usuario.verificarPassword(password)) {
                    return done(null, false, {
                        message: 'Password incorrecto'
                    });
                }
                //el email y el password existen y son correctos
                return done(null, usuario);
            } catch (error) {
                //ese usuario no existe
                return done(null, false, {
                    message: 'Esa cuenta no existe'
                });
            }
        }
    )
)

//serializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});

//deserilizar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

module.exports = passport;