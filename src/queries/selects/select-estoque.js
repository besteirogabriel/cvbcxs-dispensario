const { Pool } = require('pg');

const pool = new Pool({
  user: 'cvbcxs',
  host: '172.16.10.33',
  database: 'cvbcxcs_dispensario_gob',
  password: 'l_W[x1a2e~t0)',
  port: 5433,
});

async function fetchMedicineFromDatabase() {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT medicamento, composto, laboratorio, STRING_AGG(lote, ', ') AS lotes, fabricacao, validade, SUM(qtd_cx) AS qtd_total_cx FROM medicamentos GROUP BY  medicamento, composto, laboratorio, fabricacao, validade;"
    );
    client.release();
    return result.rows;
  } catch (error) {
    console.error('Erro ao buscar dados do estoque:', error);
    return [];
  }
}

async function formatMedicineData() {
  const medicineFromDB = await fetchMedicineFromDatabase();
  const formattedMedicine = medicineFromDB.map((medicine) => ({
    medicamento: medicine.medicamento,
    composto: medicine.composto,
    laboratorio: medicine.laboratorio,
    lote: medicine.lotes,
    fabricacao: medicine.fabricacao,
    validade: medicine.validade,
    quantidade: medicine.qtd_total_cx,
  }));
  return formattedMedicine;
}

module.exports = formatMedicineData;