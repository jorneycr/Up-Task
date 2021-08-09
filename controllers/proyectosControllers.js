const Proyectos = require('../models/Proyectos');
const slug = require('slug');

exports.proyectosHome = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });
}

exports.formularioProyectos = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    })
}

exports.nuevoProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    // res.send('Enviaste un Formulario')
    // console.log(req.body );

    //validar que exista la informacion
    const { nombre } = req.body;

    let errores = [];

    if (!nombre) {
        errores.push({ 'texto': 'Agrega un Nombre al Proyecto' })
    }

    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        //no hay errores
        //insertar en la bd

        const proyecto = await Proyectos.create({ nombre });
        res.redirect('/');
    }

}

exports.proyectoPorUrl = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    const proyecto = await Proyectos.findOne({
        where:{
            url: req.params.url
        }
    });

    if (!proyecto) return next();

    //render a la vista
    res.render('tareas',{
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos
    })

}