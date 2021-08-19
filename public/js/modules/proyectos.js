import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {
    btnEliminar.addEventListener('click', e => {
        const urlProyecto = e.target.dataset.proyectoUrl;

        // console.log(urlProyecto);

        Swal.fire({
            title: 'Deseas borrar este proyecto?',
            text: "Ya no se podra recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!',
            cancelButtonText: 'Cancelar!'
        }).then((result) => {
            if (result.isConfirmed) {

                //axios peticion
                const url = `${location.origin}/proyectos/${urlProyecto}`;
                // console.log(url);
                axios.delete(url, { params: { urlProyecto } })
                    .then(function (res) {
                        Swal.fire(
                            'Eliminado!',
                            res.data,
                            'success'
                        );
                        setTimeout(() => {
                            window.location.href = '/'
                        }, 1000)
                    })
                    .catch(()=>{
                        Swal.fire({
                            type:'error',
                            title: 'Hubo un error',
                            text: ' No se pudo eliminar el Proyecto'
                        })
                    })

            }
        })
    })
}

export default btnEliminar;