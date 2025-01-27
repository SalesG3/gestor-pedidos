const { app, conn } = require('../server');

app.post('/novo/produtos', async (req, res) => {
    let {
        imagem      ,
        codigo      ,
        descricao   ,
        valor       ,
        quantidade  ,
        observacoes ,
        ativo       } = req.body;

    // Tratamento de Erros:
    if(String(imagem).length > 255){
        res.status(400).send({
            erro: "Parâmetro em formato incorreto! (imagem)",
        });
        return
    };

    if(String(codigo).length > 4 || Number.isNaN(Number(codigo)) || !codigo){
        res.status(400).send({
            erro: "Parâmetro em formato incorreto! (codigo)",
        });
        return
    };

    if(String(descricao).length > 100 || String(descricao).replaceAll(" ","") == "" || !descricao){
        res.status(400).send({
            erro: "Parâmetro em formato incorreto! (descricao)"
        });
        return
    };

    if(Number.isNaN(Number(valor)) || !valor){
        res.status(400).send({
            erro: "Parâmetro em formato incorreto! (valor)"
        });
        return
    };

    if(Number.isNaN(Number(quantidade)) || !quantidade){
        res.send(400).send({
            erro: "Parâmetro em formato incorreto! (quantidade)"
        });
        return
    };

    if(!(ativo in ["0","1"])){
        res.status(400).send({
            erro: "Parâmetro em formato incorreto! (ativo)"
        });
        return
    }

    // Executar Procedure no Banco de Dados
    let [query] = await conn.promise().execute(`CALL NOVO_PRODUTO ( ?, ?, ?, ?, ?, ?, ? )`,
        [imagem, codigo, descricao, valor, quantidade, observacoes, ativo]
    )

    let resposta = query[0][0];

    if(resposta.MENSAGEM){

        res.status(200).send({
            mensagem: resposta.MENSAGEM
        });
        return
    };

    if(resposta.ID_PRODUTO){
        res.status(200).send({
            sucesso: "Registro salvo com sucesso!"
        });
        return
    };
})