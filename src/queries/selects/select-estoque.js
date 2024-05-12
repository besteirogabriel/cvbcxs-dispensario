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
  // const medicineFromDB = await fetchMedicineFromDatabase("SELECT medicamento, composto, laboratorio FROM medicamentos GROUP BY  medicamento, composto, laboratorio;"  );
  const medicineFromDB = await fetchMedicineFromDatabase(`SELECT medicamento, composto, laboratorio, SUM(CASE WHEN tipo_medicamento = 'COMPRIMIDO' THEN qtd_total WHEN tipo_medicamento = 'GOTAS' THEN qtd_cx ELSE 0 END) AS quantidade FROM medicamentos WHERE ativo = true AND (tipo_medicamento = 'COMPRIMIDO' AND qtd_total > 0) OR (tipo_medicamento = 'GOTAS' AND qtd_cx > 0) GROUP BY medicamento, composto, laboratorio`);
  const formattedMedicine = medicineFromDB.map((medicine) => ({
    // id: medicine.id,
    medicamento_composto: `${medicine.medicamento} - ${medicine.composto}`,
    medicamento: medicine.medicamento,
    composto: medicine.composto,
    laboratorio: medicine.laboratorio,
    quantidade: medicine.quantidade,
    // lote: medicine.lotes,
    // fabricacao: medicine.fabricacao,
    // validade: medicine.validade,
  }));
  return formattedMedicine;
}

async function medicineData() {
  const medicineFromDB = await fetchMedicineFromDatabase("SELECT id, medicamento, composto, laboratorio, STRING_AGG(lote, ', ') AS lotes, fabricacao, validade, SUM(qtd_cx) AS qtd_total_cx FROM medicamentos WHERE ativo = true GROUP BY ativo, id, medicamento, composto, laboratorio, fabricacao, validade;"  );
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
  const medicineFromDB = await fetchMedicineFromDatabase("SELECT medicamento, composto, laboratorio, STRING_AGG(lote, ', ') AS lotes, fabricacao, validade, SUM(qtd_cx) AS qtd_total_cx FROM medicamentos WHERE ativo = true GROUP BY ativo, medicamento, composto, laboratorio, fabricacao, validade;"  );
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