const { app, conn } = require('../server');

app.post('/auth/clientes', async (req, res) => {
    let {
        login   ,
        senha   } = req.body;

    // Tratamento de Erros:
    if(login.length > 100 || !login.replaceAll(" ","")){
        res.status(400).send({
            erro: "Parâmetro em formato incorreto! (login)"
        });
        return
    }

    if(senha.length > 100 || !senha.replaceAll(" ","")){
        res.status(400).send({
            erro: "Parâmetro em formato incorreto! (senha)"
        });
        return
    }

    // Executar Procedure no Banco de Dados:
    let [query] = await conn.promise().execute(`CALL AUTH_CLIENTES ( ?, ?)`,
        [login, senha]
    );

    query = query[0][0];

    if(query.ID_CLIENTE){
        res.status(200).send({
            sucesso: "Login efetuado com sucesso!",
            dados: query
        });
        return
    }

    if(query.MENSAGEM){
        res.status(200).send({
            mensagem: query.MENSAGEM
        });
        return
    }
})

app.post('/novo/clientes', async (req, res) => {
    let {
        nome    ,
        email   ,
        contato ,
        senha   } = req.body;

    // Tratamento de Erros:
    if(nome.length > 100 || !nome.replaceAll(" ","")){
        res.status(400).send({
            erro: "Parâmetro em formato incorreto! (nome)",
        });
        return
    }

    if(email.length > 100 || !email.replaceAll(" ","")){
        res.status(400).send({
            erro: "Parâmetro em formato incorreto! (email)",
        });
        return
    }

    if(contato.length != 11 || !contato.replaceAll(" ","")){
        res.status(400).send({
            erro: "Parâmetro em formato incorreto! (contato)",
        });
        return
    }

    if(senha.length > 100 || !senha.replaceAll(" ","")){
        res.status(400).send({
            erro: "Parâmetro em formato incorreto! (senha)",
        });
        return
    };

    // Executar Procedure no Banco de Dados:
    let [query] = await conn.promise().execute(`CALL NOVO_CLIENTE ( ?, ?, ?, ? )`,
        [nome, email, contato, senha]
    );

    query = query[0][0];

    if(query.ID_CLIENTE){
        res.status(200).send({
            sucesso: "Registro salvo com sucesso!"
        });
        return
    }

    if(query.MENSAGEM){
        res.status(200).send({
            mensagem: query.MENSAGEM
        });
        return
    }
})