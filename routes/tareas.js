var express = require('express');
var router = express.Router();
const tarea = require('../controllers/tarea');

router.get('/', function(req, res, next) {
    res.send('¡Tareas funcionando!');
  });

router.post('/registrar', tarea.Registrar);


module.exports = router;