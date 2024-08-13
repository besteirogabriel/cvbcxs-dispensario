const { Pool } = require('pg');

const pool = new Pool({
  user: 'dispensario',
  host: 'asa1prd-db-gob01.crcsao6misme.sa-east-1.rds.amazonaws.com',
  database: 'dispensario',
  password: 'Ai.g4aex.',
  port: 5432, 
  ssl: {
    rejectUnauthorized: false,
  },
});

async function fetchLojasFromDatabase() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM LOJAS');
    client.release();
    return result.rows;
  } catch (error) {
    console.error('Erro ao buscar dados das lojas:', error);
    return [];
  }
}

async function formatLojasData(cookiesId = null) {
  const lojasFromDB = await fetchLojasFromDatabase();
  const formattedLojas = lojasFromDB.map((loja) => ({
    id: loja.id,
    user_id: loja.user_id,
    name: loja.nome_loja,
    email: loja.email,
    numero_da_loja: loja.numero_loja,
    vm: loja.nome_vm,
    hospitaleiro: loja.nome_hospitaleiro,
    cep: loja.cep,
    endereco: loja.endereco,
    numero_endereco: loja.numero,
    cidade: loja.cidade,
    estado: loja.uf,
  }));
  if (cookiesId) {
    return [formattedLojas.find((loja) => loja.user_id == cookiesId)];
  } else {
    return formattedLojas;
  }
}

module.exports = formatLojasData;
