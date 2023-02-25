const conn = require('../controllers/mysqlconnection');
const jwt = require('jsonwebtoken');
const util = require('util');
const { use } = require('bcrypt/promises');

const Tarea = {}

Tarea.Registrar = async (req, res) => {

    try{

        // Válida el token.
        const decoded = await jwt.verify(req.body.token, 'Secreto');
        const user = decoded.id;
        const boo = false;

        console.log(user);
        // Registra la tarea.
        const queryT = util.promisify(conn.conf.query).bind(conn.conf);
        const rowsT = await queryT(
            `insert into Tarea (titulo, descripcion, estatus, fechaE, comentarios, responsable, tags, usuario) values (?, ?, ?, ?, ?, ?, ?, ?)`
        , [req.body.titulo, req.body.descripcion, boo, req.body.fechaE, req.body.comentarios, req.body.responsable, req.body.tags, user]
        );

        // Envía mensaje de confirmación.
        res.send({Mensaje: 'Tarea registrada', rows: rowsT}).status(200);
    }catch(e){
        res.send({Mensaje: 'Error al registrar la tarea.', Error: e}).status(400);
    }
}



module.exports = Tarea;