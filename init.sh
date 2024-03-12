CREATE TABLE medicamentos (
    medicamento VARCHAR,
    composto VARCHAR,
    laboratorio VARCHAR,
    lote VARCHAR,
    fabricacao DATE,
    validade DATE,
    qtd_cx INTEGER
);

\copy medicamentos FROM 'planilha.csv' DELIMITER ',' CSV HEADER;
