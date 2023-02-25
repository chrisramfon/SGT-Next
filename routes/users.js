var express = require('express');
var router = express.Router();
const usuario = require('../controllers/usuario');

router.post('/registrar', usuario.registrar);

router.post('/iniciar', usuario.iniciar);

module.exports = router;
