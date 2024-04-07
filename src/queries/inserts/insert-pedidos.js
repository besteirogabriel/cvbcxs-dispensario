const { Pool } = require('pg');

const pool = new Pool({
  user: 'cvbcxs',
  host: '172.16.10.33',
  database: 'cvbcxcs_dispensario_gob',
  password: 'l_W[x1a2e~t0)',
  port: 5433,
});

// check if requested medicine is in stock, if not, return false,
// if it is, insert the order into the database and return true

async function checkAvailability(pedido) {
  console.log(pedido);
  //   split pedido.medicamento_composto into medicamento and composto
  const medicamento = pedido.medicamento_composto.split(' - ')[0];
  const composto = pedido.medicamento_composto.split(' - ')[1];
  //  SELECT * FROM medicamentos
  //      WHERE
  //  medicamento ILIKE '%VITAMINA C%'
  //  AND composto ILIKE '%ÁCIDO ASCÓRBICO 200MG/ML%';
}

async function insertPedido(pedido) {
  try {
    const client = await pool.connect();
    const result = await client
      .query
      //   `INSERT INTO pedidos (medicamento, composto, laboratorio, qtd_cx, qtd_un, loja_id, endereco, cep, cidade, estado, veneravel, status) VALUES ('${pedido.medicamento}', '${pedido.composto}', '${pedido.laboratorio}', ${pedido.qtd_cx}, ${pedido.qtd_un}, ${pedido.loja_id}, '${pedido.endereco}', '${pedido.cep}', '${pedido.cidade}', '${pedido.estado}', '${pedido.veneravel}', 'pendente')`
      ();
    client.release();
    return true;
  } catch (error) {
    console.error('Erro ao inserir pedido:', error);
    return false;
  }
}
