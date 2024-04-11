const { Pool } = require('pg');

const pool = new Pool({
  user: 'cvbcxs',
  host: '172.16.10.33',
  database: 'cvbcxcs_dispensario_gob',
  password: 'l_W[x1a2e~t0)',
  port: 5433,
});

//  QUERY PARA PEGAR OS PEDIDOS DE UMA LOJA
// SELECT
//     p.id AS pedido_id,
//     p.nome_beneficiado,
//     p.cim,
//     p.id_loja,
// 	u.email,
//     p.created_at AS pedido_criado_em,
//     p.estado,
//     pm.quantidade,
//     m.medicamento,
//     m.composto
// FROM
//     pedidos p
// JOIN
//     pedidos_medicamentos pm ON p.id = pm.pedido_id
// JOIN
//     medicamentos m ON pm.medicamento_id = m.id
// JOIN
// 	lojas l ON p.id_loja = p.id_loja
// JOIN
// 	usuarios u ON u.id = l.user_id
// WHERE
//     p.id_loja = '2';

// SELECT
//     p.id AS pedido_id,
//     p.nome_beneficiado,
//     p.cim,
//     p.id_loja,
//     p.created_at AS pedido_criado_em,
//     p.estado,
//     STRING_AGG(DISTINCT CONCAT(m.medicamento, ' - ', m.composto), ', ') AS medicamentos_compostos,
//     --STRING_AGG(pm.quantidade::TEXT, ', ') AS quantidades
// FROM
//     pedidos p
// JOIN
//     pedidos_medicamentos pm ON p.id = pm.pedido_id
// JOIN
//     medicamentos m ON pm.medicamento_id = m.id
// WHERE
//     p.id_loja = '2'
// GROUP BY
//     p.id,
//     p.nome_beneficiado,
//     p.cim,
//     p.id_loja,
//     p.created_at,
//     p.estado;

async function fetchOrdersFromDatabase(query) {
  try {
    const client = await pool.connect();
    const result = await client.query(query);
    client.release();
    return result.rows;
  } catch (error) {
    console.error('Erro ao buscar dados dos pedidos:', error);
    return [];
  }
}

async function fetchOrdersData(userId) {
  const ordersFromDB = await fetchOrdersFromDatabase(
    //`SELECT p.id AS pedido_id, p.nome_beneficiado, p.cim, p.id_loja,p.created_at AS pedido_criado_em, p.estado, STRING_AGG(DISTINCT CONCAT(m.medicamento, ' - ', m.composto), ', ') AS medicamentos_compostos FROM pedidos p JOIN pedidos_medicamentos pm ON p.id = pm.pedido_id JOIN medicamentos m ON pm.medicamento_id = m.id WHERE p.id_loja = ${idLoja} GROUP BY p.id, p.nome_beneficiado, p.cim, p.id_loja, p.created_at, p.estado;`
    `SELECT p.id AS pedido_id, p.nome_beneficiado, p.cim, p.id_loja, p.created_at AS pedido_criado_em, p.estado, STRING_AGG(DISTINCT CONCAT(m.medicamento, ' - ', m.composto), ', ') AS medicamentos_compostos FROM pedidos p JOIN pedidos_medicamentos pm ON p.id = pm.pedido_id JOIN medicamentos m ON pm.medicamento_id = m.id JOIN lojas l ON p.id_loja = l.id WHERE l.user_id = ${userId} GROUP BY p.id, p.nome_beneficiado, p.cim, p.id_loja, p.created_at, p.estado;`
  );
  const formattedOrders = ordersFromDB.map((order) => ({
    //pedido_id: order.pedido_id,
    cim: order.cim,
    beneficiado: order.nome_beneficiado,
    //id_loja: order.id_loja,
    //pedido_criado_em: order.pedido_criado_em,
    medicamento: order.medicamentos_compostos,
    status: order.estado,
  }));
  return formattedOrders;
}

module.exports = {
  fetchOrdersData,
};
