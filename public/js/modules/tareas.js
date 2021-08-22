import axios from "axios";
import Swal from "sweetalert2";
import {actualizarAvance} from '../functions/avance';

const tareas = document.querySelector('.listado-pendientes');

if (tareas) {

    tareas.addEventListener('click', e => {
        if (e.target.classList.contains('fa-check-circle')) {
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            //reques hacia /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;
            axios.patch(url, { idTarea })
                .then(function (respuesta) {
                    if (respuesta.status === 200) {
                        icono.classList.toggle('completo')
                        actualizarAvance();
                    }
                })
        }
        if (e.target.classList.contains('fa-trash')) {
            // console.log('click');
            const tareasHTML = e.target.parentElement.parentElement,
                idTarea = tareasHTML.dataset.tarea;


            Swal.fire({
                title: 'Deseas borrar esta Tarea?',
                text: "Ya no se podra recuperar!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar!',
                cancelButtonText: 'Cancelar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    //enviar delete por medio de axios
                    const url = `${location.origin}/tareas/${idTarea}`;
                    axios.delete(url, { params: { idTarea } })
                        .then(function (respuesta){
                            if(respuesta.status===200){
                                //eliminar el nodo
                                tareasHTML.parentElement.removeChild(tareasHTML);

                                //opcional alerta
                                Swal.fire(
                                    'Tarea Eliminada',
                                    respuesta.data,
                                    'success'
                                )
                                actualizarAvance();
                            }
                        });
                }
            })
        }
    })


}

export default tareas;
