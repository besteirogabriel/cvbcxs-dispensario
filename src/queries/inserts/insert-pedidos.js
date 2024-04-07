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
  // const client = await pool.connect();
  console.log('check availability', pedido);
  // do this split to each medicine in the array
  for (let i = 0; i < pedido.medicamento.length; i++) {
    console.log('pedido.medicamento:', i, pedido.medicamento);
    // if (pedido?.medicamento){
    // console.log('pedido.medicamento[i]:', pedido.medicamento[i]);
    // const medicamento = pedido.medicamento[i].split(' - ')[0];
    // const composto = pedido.medicamento[i].split(' - ')[1];
    // console.log('medicamento:', medicamento);
    // console.log('composto:', composto);
    // await client.query(
    //   "SELECT * FROM medicamentos WHERE medicamento ILIKE $1 AND composto ILIKE $2",
    //   [`%${medicamento}%`, `%${composto}%`]
    // );
    // } else {
    // console.log('ELSE [i]:', pedido.medicamento[i]);
  }
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

module.exports = { checkAvailability, insertPedido };
