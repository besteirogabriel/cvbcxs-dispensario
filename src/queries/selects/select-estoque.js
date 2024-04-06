const { Pool } = require('pg');

const pool = new Pool({
  user: 'cvbcxs',
  host: '172.16.10.33',
  database: 'cvbcxcs_dispensario_gob',
  password: 'l_W[x1a2e~t0)',
  port: 5433,
});

async function fetchMedicineFromDatabase(query) {
  try {
    const client = await pool.connect();
    const result = await client.query(query);
    client.release();
    return result.rows;
  } catch (error) {
    console.error('Erro ao buscar dados do estoque:', error);
    return [];
  }
}

async function basicMedicineData() {
  const medicineFromDB = await fetchMedicineFromDatabase("SELECT medicamento, composto, laboratorio FROM medicamentos GROUP BY  medicamento, composto, laboratorio;"  );
  const formattedMedicine = medicineFromDB.map((medicine) => ({
    // id: medicine.id,
    medicamento_composto: `${medicine.medicamento} - ${medicine.composto}`,
    medicamento: medicine.medicamento,
    composto: medicine.composto,
    laboratorio: medicine.laboratorio,
    // lote: medicine.lotes,
    // fabricacao: medicine.fabricacao,
    // validade: medicine.validade,
    // quantidade: medicine.qtd_total_cx,
  }));
  return formattedMedicine;
}

async function medicineData() {
  const medicineFromDB = await fetchMedicineFromDatabase("SELECT id, medicamento, composto, laboratorio, STRING_AGG(lote, ', ') AS lotes, fabricacao, validade, SUM(qtd_cx) AS qtd_total_cx FROM medicamentos GROUP BY  id, medicamento, composto, laboratorio, fabricacao, validade;"  );
  const formattedMedicine = medicineFromDB.map((medicine) => ({
    id: medicine.id,
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

async function medicineDataAggregate() {
  const medicineFromDB = await fetchMedicineFromDatabase("SELECT medicamento, composto, laboratorio, STRING_AGG(lote, ', ') AS lotes, fabricacao, validade, SUM(qtd_cx) AS qtd_total_cx FROM medicamentos GROUP BY  medicamento, composto, laboratorio, fabricacao, validade;"  );
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

module.exports = { medicineData, basicMedicineData, medicineDataAggregate };