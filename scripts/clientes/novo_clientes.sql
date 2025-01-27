    
DELIMITER $$
CREATE PROCEDURE NOVO_CLIENTE (
	IN P_NOME		VARCHAR(100)	,
    IN P_EMAIL		VARCHAR(100)	,
    IN P_CONTATO	CHAR(11)		,
    IN P_SENHA		VARCHAR(100)	)
	BEGIN
		
        IF EXISTS ( SELECT ID_CLIENTE FROM CLIENTES WHERE EMAIL = P_EMAIL OR CONTATO = P_CONTATO ) THEN
        
			SELECT CASE
				WHEN EMAIL = P_EMAIL AND CONTATO = P_CONTATO THEN	"Email e Contato já estão em uso!"
                WHEN EMAIL = P_EMAIL THEN 							"Email já está em uso!"
                WHEN CONTATO = P_CONTATO THEN						"Contato já está em uso!"
			END AS MENSAGEM FROM CLIENTES;
            
		ELSE
			INSERT INTO CLIENTES (
				NM_CLIENTE	,
                EMAIL		,
                CONTATO		,
                SENHA		)
			VALUES (
				P_NOME		,
                P_EMAIL		,
                P_CONTATO	,
                P_SENHA		);
		
			SELECT LAST_INSERT_ID() AS ID_CLIENTE FROM CLIENTES;
		END IF;
	END $$
DELIMITER ;