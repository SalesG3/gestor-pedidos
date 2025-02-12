DELIMITER $$
CREATE PROCEDURE AUTH_CLIENTES (
	IN P_LOGIN	VARCHAR(100)	,
    IN P_SENHA	VARCHAR(100)	)
    BEGIN
		IF NOT EXISTS (
			SELECT * FROM CLIENTES WHERE ( EMAIL = P_LOGIN OR CONTATO = P_LOGIN ) AND SENHA = P_SENHA
		) THEN
			SELECT "Login e Senha incompatíveis" AS MENSAGEM;
            
		ELSE
			SELECT
				ID_CLIENTE,
				NM_CLIENTE
			FROM CLIENTES WHERE
				( EMAIL = P_LOGIN OR CONTATO = P_LOGIN ) AND
                SENHA = P_SENHA;
		
        END IF;
    END $$
DELIMITER ;

DROP PROCEDURE AUTH_CLIENTES