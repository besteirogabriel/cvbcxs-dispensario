const { Pool } = require('pg');

const pool = new Pool({
  user: 'dispensario',
  host: '172.18.0.1',
  database: 'dispensario',
  password: 'Ai.g4aex.',
  port: 5432, 
  ssl: {
    rejectUnauthorized: false,
  },
});

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

async function fetchOrdersData(userId, isAdmin = false) {
  let ordersFromDB = await fetchOrdersFromDatabase(
    isAdmin === true
      ? // ? `SELECT p.id AS pedido_id, p.nome_beneficiado, p.cim, p.id_loja, p.created_at AS pedido_criado_em, p.estado, STRING_AGG(DISTINCT CONCAT(m.medicamento, ' - ', m.composto), ', ') AS medicamentos_compostos FROM pedidos p JOIN pedidos_medicamentos pm ON p.id = pm.pedido_id JOIN medicamentos m ON pm.medicamento_id = m.id JOIN lojas l ON p.id_loja = l.id GROUP BY p.id, p.nome_beneficiado, p.cim, p.id_loja, p.created_at, p.estado ORDER BY p.id DESC;`
        `SELECT l.nome_loja AS loja, p.id AS pedido_id, p.nome_beneficiado, p.cim, p.id_loja, p.created_at AS pedido_criado_em, p.estado, STRING_AGG(DISTINCT CONCAT(m.medicamento, ' - ', m.composto), ', ') AS medicamentos_compostos FROM pedidos p JOIN pedidos_medicamentos pm ON p.id = pm.pedido_id JOIN medicamentos m ON pm.medicamento_id = m.id JOIN lojas l ON p.id_loja = l.id GROUP BY p.id, p.nome_beneficiado, p.cim, p.id_loja, p.created_at, p.estado, l.nome_loja ORDER BY p.id DESC;`
      : `SELECT p.id AS pedido_id, p.nome_beneficiado, p.cim, p.id_loja, p.created_at AS pedido_criado_em, p.estado, STRING_AGG(DISTINCT CONCAT(m.medicamento, ' - ', m.composto), ', ') AS medicamentos_compostos FROM pedidos p JOIN pedidos_medicamentos pm ON p.id = pm.pedido_id JOIN medicamentos m ON pm.medicamento_id = m.id JOIN lojas l ON p.id_loja = l.id WHERE l.user_id = ${userId} GROUP BY p.id, p.nome_beneficiado, p.cim, p.id_loja, p.created_at, p.estado;`
  );
  console.log('query', ordersFromDB);

  let formattedOrders;

  if (isAdmin) {
    formattedOrders = ordersFromDB.map((order) => ({
      id_pedido: order.pedido_id,
      loja: order.loja,
      cim: order.cim,
      beneficiado: order.nome_beneficiado,
      medicamento: order.medicamentos_compostos,
      status: order.estado,
    }));
    return formattedOrders;
  } else {
    formattedOrders = ordersFromDB.map((order) => ({
      cim: order.cim,
      beneficiado: order.nome_beneficiado,
      medicamento: order.medicamentos_compostos,
      status: order.estado,
    }));
    return formattedOrders;
  }
}

module.exports = {
  fetchOrdersData,
};
