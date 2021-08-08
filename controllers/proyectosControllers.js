exports.proyectosHome = (req, res) => {
    res.render('index', {
        nombrePagina: 'Proyectos'
    });
}

exports.formularioProyectos = (req, res) => {
    res.render('nuevoProyecto',{
        nombrePagina: 'Nuevo Proyecto'
    })
}

exports.nuevoProyecto = (req, res) => {
    // res.send('Enviaste un Formulario')
    // console.log(req.body );

    //validar que exista la informacion
    const { nombre } = req.body;

    let errores = [];

    if(!nombre){
        errores.push({'texto': 'Agrega un Nombre al Proyecto'})
    }

    if(errores.length > 0){
        res.render('nuevoProyecto',{
            nombrePagina:'Nuevo Proyecto',
            errores
        })
    }else{
        //no hay errores
        //insertar en la bd
    }

}