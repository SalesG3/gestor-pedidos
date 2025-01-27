const { app, conn } = require('./server');

const md5 = require('md5');

// Login de Usuário Administrador
app.post('/auth/admin', async (req, res) => {
    let { login, senha } = req.body;

    // Tratamento de Dados
    if (!login || !senha){
        res.status(200).send({
            erro: "Login e Senha são obrigatórios!"
        });
        return
    }

    // Hashando a senha:
    senha = md5(senha);

    // Verificação dos Dados no Banco
    let [query] = await conn.promise().execute(`CALL ADMIN_LOGIN ( ?, ?)`,
        [login, senha]
    );

    let resposta = query[0][0];

    // Tratamento da Resposta
    if(resposta.ID_USUARIO){
        res.status(200).send({
            sucesso: "Login efetuado com sucesso!",
            dados: resposta
        });
        return
    }

    if(resposta.MENSAGEM){
        res.status(200).send({
            mensagem: resposta.MENSAGEM
        });
        return
    }
});


require('./routes/produtos');
require('./routes/clientes');
