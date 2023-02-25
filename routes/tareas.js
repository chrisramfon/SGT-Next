var express = require('express');
var router = express.Router();
const tarea = require('../controllers/tarea');

router.get('/', function(req, res, next) {
    res.send('¡Tareas funcionando!');
  });

router.post('/registrar', tarea.Registrar);

router.get('/todas', tarea.MostrarTareas);

router.put('/modificar', tarea.Modificar);

router.delete('/eliminar', tarea.Borrar);

router.get('/tarea', tarea.MostrarTarea);



module.exports = router;