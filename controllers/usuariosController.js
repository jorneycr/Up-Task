const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear Cuenta en Uptask'
    })
}

exports.crearCuenta = (req, res) => {
    //leer los datos
    const { email, password } = req.body;

    try {
        //crear los usuarios
        await Usuarios.create({
            email,
            password
        });
        res.redirect('/iniciar-sesion');
    } catch (error) {
        res.render('crearCuenta', {
            error: error.errores,
            nombrePagina: 'Crear Cuenta en Uptask'
        })
    }
}