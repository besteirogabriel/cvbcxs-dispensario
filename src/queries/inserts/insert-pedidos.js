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
  const client = await pool.connect();
  const medicamentos = pedido.medicamento;
  const quantidades = pedido.quantidade;

  try {
    const promises = medicamentos.map(async (medicamento) => {
      const result = await client.query(
        'SELECT tipo_medicamento FROM medicamentos WHERE medicamento ILIKE $1',
        [`%${medicamento.split(' - ')[0]}%`]
      );
      return result.rows[0].tipo_medicamento;
    });

    const tiposMedicamento = await Promise.all(promises);

    for (let i = 0; i < medicamentos.length; i++) {
      const medicamento = medicamentos[i].split(' - ')[0];
      const composto = medicamentos[i].split(' - ')[1];
      const quantidade = quantidades[i];
      const tipoMedicamento = tiposMedicamento[i];

      const result = await client.query(
        'SELECT ' +
          'CASE ' +
          "  WHEN $1 = 'COMPRIMIDO' THEN SUM(qtd_total) " +
          "  WHEN $1 = 'GOTAS' THEN SUM(qtd_cx) " +
          'END AS total ' +
          'FROM medicamentos ' +
          'WHERE medicamento ILIKE $2 AND composto ILIKE $3',
        [tipoMedicamento, `%${medicamento}%`, `%${composto}%`]
      );
      const totalDisponivel = result.rows[0].total;
      if (parseInt(totalDisponivel) >= parseInt(quantidade)) {
        console.log(
          `Medicamento ${medicamento} - ${composto}: disponível. Quantidade: ${totalDisponivel}`
        );
        return true;
      } else {
        console.log(
          `total: ${totalDisponivel}, Medicamento ${medicamento} - ${composto}: não disponível.`
        );
        return false;
      }
    }
  } catch (error) {
    console.error('Erro ao verificar disponibilidade:', error);
    return false;
  } finally {
    client.release();
  }
}

async function insertPedido(pedido) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const pedidoQuery = `
      INSERT INTO pedidos(nome_beneficiado, cim, id_loja, estado)
      VALUES($1, $2, $3, $4)
      RETURNING id;
  `;
    const pedidoValues = [
      pedido.beneficiado,
      pedido.cim,
      pedido.loja,
      'EM PREPARAÇÃO',
    ];
    const pedidoResult = await client.query(pedidoQuery, pedidoValues);
    const pedidoId = pedidoResult.rows[0].id;

    const medicamentos = pedido.medicamento;
    const quantidades = pedido.quantidade;

    for (let i = 0; i < medicamentos.length; i++) {
      const medicamento = medicamentos[i];
      const quantidade = quantidades[i];

      const medicamentoQuery = `
          INSERT INTO pedidos_medicamentos(pedido_id, medicamento_composto, quantidade)
          VALUES($1, $2, $3);
      `;
      await client.query(medicamentoQuery, [pedidoId, medicamento, quantidade]);
    }

    await client.query('COMMIT');
    return {
      success: true,
      message: 'Pedido criado com sucesso.',
      pedidoId: pedidoId,
    };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error processing pedido', error);
    return { success: false, message: 'Erro ao processar pedido.' };
  } finally {
    client.release();
  }
}

module.exports = { checkAvailability, insertPedido };
