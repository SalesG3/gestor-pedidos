CREATE TABLE IF NOT EXISTS CLIENTES (
	ID_CLIENTE		INT PRIMARY KEY AUTO_INCREMENT	,
    NM_CLIENTE		VARCHAR(100) NOT NULL			,
    EMAIL			VARCHAR(100) NOT NULL UNIQUE	,
    CONTATO			CHAR(11) NOT NULL UNIQUE		,
    SENHA			VARCHAR(100) NOT NULL			);