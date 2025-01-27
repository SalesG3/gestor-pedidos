// Verifica Token de Autenticação
require('dotenv').config();

const auth = function(req, res, next){

    if(req.headers.token){
        if(req.headers.token == process.env.TOKEN){
            next(); return
        }
    }

    res.status(401).send({ auth: "Não Autorizado!" })
}

// Servidor HTTP Express
const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();
app.use(express.json(), cors({origin: "*"}), auth);


const server = http.createServer(app);
server.listen(process.env.PORT, () => {
    console.log("Servidor Live! Porta: " + process.env.PORT)
});

// Conexão com Banco de Dados
const mysql = require('mysql2');

const conn = mysql.createConnection(process.env.DBURL);

conn.connect(function(err){
    if(err) throw err;
    console.log('Banco de Dados Conectado!');
})

// Exportar Módulos
module.exports = {
    app: app,
    conn: conn,
};