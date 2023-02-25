const conn = require('../controllers/mysqlconnection');
const bcrypt = require('bcrypt');
const util = require('util');
const jwt = require('jsonwebtoken');

const Usuario = {}

Usuario.registrar = async (req, res) => {

    let usuario = req.body.usuario

    // Valida que el usuario no se encuentre registrado.
    conn.conf.query('select * from Usuario where Usuario like ?', [req.body.Usuario], function (error, results, fields) {
        if (results.length >= 1) throw 'Usuario no disponible'
    });

    try {

        // Encripta la contraseña.
        const salt = await bcrypt.genSalt(10);
        const encrypted = await bcrypt.hash(req.body.contrasena, salt);

        // Guarda la información.
        const queryU = util.promisify(conn.conf.query).bind(conn.conf);
        const rowsU = await queryU('insert into Usuario (usuario, contrasena) values (?, ?)', [usuario, encrypted]);

        // Mensaje de confirmación.
        res.send({ Mensaje: `Usuario ${usuario} registrado con éxito.`, rows: rowsU }).status(200);

    } catch (e) {
        res.send({ Mensaje: 'Error al registrar al usuario.', Error: e }).status(400);
    }
}

Usuario.iniciar = async (req, res) => {

    try{

        // Busca al usuario en la base de datos.
        const queryT = util.promisify(conn.conf.query).bind(conn.conf);
        const rowsT = await queryT('select * from Usuario where usuario like ?', [req.body.usuario]);
        if(rowsT.length < 1) throw 'No se encontró el usuario.';

        // Valida la contraseña
        const encripted = rowsT[0].contrasena;
        const compare = await bcrypt.compare(req.body.contrasena, encripted);
        if(!compare) throw 'La contraseña no coinside';

        //Genera el token
        const payload = {id: rowsT[0].id};
        const token = await jwt.sign(payload, 'Secreto');

        // Envia el token del usuario.
        res.send({Mensaje: `Bienvenido ${req.body.usuario}`, Token: token}).status(200);
    }catch (e) {
        res.send({Mensaje: 'Error al ejecutar el query.', Error: e}).status(400);
    }
}

module.exports = Usuario;