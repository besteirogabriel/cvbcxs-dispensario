const { Pool } = require('pg');

const pool = new Pool({
  user: 'cvbcxs',
  host: '172.16.10.33',
  database: 'cvbcxcs_dispensario_gob',
  password: 'l_W[x1a2e~t0)',
  port: 5433,
});

async function checkAvailability(pedido) {
  const client = await pool.connect();
  const requestedMedicines = [];
  try {
    await client.query('BEGIN');

    const medicamentos = pedido.medicamento;
    const quantidades = pedido.quantidade;

    for (let i = 0; i < medicamentos.length; i++) {
      const medicamento = medicamentos[i].split(' - ')[0];
      const composto = medicamentos[i].split(' - ')[1];
      const quantidade = quantidades[i];

      const result = await client.query(
        'SELECT id,' +
          'CASE ' +
          "  WHEN $1 = 'COMPRIMIDO' THEN SUM(qtd_total) " +
          "  WHEN $1 = 'GOTAS' THEN SUM(qtd_cx) " +
          'END AS total ' +
          'FROM medicamentos ' +
          'WHERE medicamento ILIKE $2 AND composto ILIKE $3 GROUP BY id',
        [tipoMedicamento, `%${medicamento}%`, `%${composto}%`]
      );
      const medicineId = result.rows[0].id;
      const totalDisponivel = result.rows[0].total;

      if (parseInt(totalDisponivel) >= parseInt(quantidade)) {
        requestedMedicines.push({
          id: medicineId,
          medicamento: medicamento,
          composto: composto,
          quantidade: quantidade,
        });
        const updateQuery = `
          UPDATE medicamentos
          SET ${
            tipoMedicamento == 'COMPRIMIDO'
              ? `qtd_total = qtd_total - ${quantidade}`
              : `qtd_cx = qtd_cx - ${quantidade}`
          }
          WHERE id = $1;
        `;
        await client.query(updateQuery, [medicineId]);
      } else if (
        parseInt(totalDisponivel) <= parseInt(quantidade) &&
        totalDisponivel > 0
      ) {
        await client.query('ROLLBACK');
        return {
          success: false,
          message: `Medicamento ${medicamento} - ${composto} disponível em quantidade insuficiente, ${
            tipoMedicamento == 'COMPRIMIDO'
              ? `${
                  totalDisponivel === 1
                    ? '1 comprimido'
                    : `${totalDisponivel} comprimidos`
                }`
              : `${
                  totalDisponivel === 1
                    ? '1 caixa'
                    : `${totalDisponivel} caixas`
                }`
          } disponíveis.`,
          medicineId: medicineId,
        };
      } else if (parseInt(totalDisponivel) === 0) {
        await client.query('ROLLBACK');
        return {
          success: false,
          message: `Medicamento ${medicamento} - ${composto} não disponível.`,
          medicineId: medicineId,
        };
      }
    }

    await client.query('COMMIT');
    return {
      success: true,
      requestedMedicines: requestedMedicines,
    };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erro ao verificar disponibilidade:', error);
    return { success: false };
  } finally {
    client.release();
  }
}

async function insertPedido(pedido, requestedMedicines) {
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

    for (let i = 0; i < requestedMedicines.length; i++) {
      const medicamento = requestedMedicines[i].id;
      const quantidade = requestedMedicines[i].quantidade;

      const medicamentoQuery = `
        INSERT INTO pedidos_medicamentos(pedido_id, medicamento_id, quantidade)
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
    console.error('Erro ao processar pedido:', error);
    return {
      success: false,
      message: 'Erro ao processar pedido.',
    };
  } finally {
    client.release();
  }
}

module.exports = { checkAvailability, insertPedido };
