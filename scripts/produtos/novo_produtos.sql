
DELIMITER $$
CREATE PROCEDURE NOVO_PRODUTO (
	IN P_IMAGEM		 VARCHAR(255)	,
    IN P_CODIGO		 CHAR(4)		,
    IN P_DESCRICAO	 VARCHAR(100)	,
    IN P_VALOR		 FLOAT 			,
    IN P_QUANTIDADE	 INT			,
    IN P_OBSERVACOES TEXT			,
    IN P_ATIVO		 BOOLEAN		)
    BEGIN
		
        # TRATAMENTO PARA CD_PRODUTO DUPLICADO
		IF EXISTS ( SELECT ID_PRODUTO FROM PRODUTOS WHERE CD_PRODUTO = P_CODIGO ) THEN
            SELECT CONCAT("O Código: " , P_CODIGO , " Já está sendo utilizado!") AS MENSAGEM;
		
        ELSE
			INSERT INTO PRODUTOS (
                IMAGEM			,
                CD_PRODUTO		,
                DS_PRODUTO		,
                VL_PRODUTO		,
                QUANTIDADE		,
                OBSERVACOES		,
                ATIVO			)
			VALUES (
				P_IMAGEM		,	
                P_CODIGO		,
                P_DESCRICAO		,
                P_VALOR			,
                P_QUANTIDADE	,
                P_OBSERVACOES	,
                P_ATIVO			);
                
                SELECT LAST_INSERT_ID() AS ID_PRODUTO FROM PRODUTOS;
		END IF;
	END $$
DELIMITER ;