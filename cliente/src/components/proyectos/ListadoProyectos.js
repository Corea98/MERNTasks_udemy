import React, { useContext, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Proyecto from './Proyecto';

import ProyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';

const ListadoProyectos = () => {

    // Extraer proyectos de state inicial
    const proyectoContext = useContext(ProyectoContext);
    const { mensaje, proyectos, obtenerProyectos } = proyectoContext;

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    // Obtener proyectos cuando carga el componente
    useEffect(() => {
        obtenerProyectos();
        // eslint-disable-next-line
    }, []);

    // Para mostrar mensajes de error
    useEffect(() => {
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje])

    // Revisar si proyectos tiene contenido
    if (proyectos.length === 0) return <p>No hay proyectos</p>;

    return (
        <ul className="listado-proyectos">
            { alerta ? (<div className={`alerta ${ alerta.categoria }`}>{alerta.msg}</div>) : null}

            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}

export default ListadoProyectos;