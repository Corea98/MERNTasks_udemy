const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');

// Crea un proyecto
// api/proyectos
router.post('/',
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    auth,
    proyectoController.crearProyecto
)

// Obtener los proyectos
router.get('/',
    auth,
    proyectoController.obtenerProyectos
)

// Actualizar proyecto via ID
router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
)

// Eliminar un proyecto
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
)

module.exports = router;