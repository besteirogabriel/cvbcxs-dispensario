const { Pool } = require('pg');

const pool = new Pool({
  user: 'cvbcxs',
  host: '172.16.10.33',
  database: 'cvbcxcs_dispensario_gob',
  password: 'l_W[x1a2e~t0)',
  port: 5433,
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

async function formatLojasData() {
  const lojasFromDB = await fetchLojasFromDatabase();
  const formattedLojas = lojasFromDB.map((loja) => ({
    id: loja.id,
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
  return formattedLojas;
}

module.exports = formatLojasData;
