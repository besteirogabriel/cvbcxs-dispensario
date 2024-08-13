var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

// Connection pool configuration
const pool = new Pool({
  user: 'dispensario',
  host: 'asa1prd-db-gob01.crcsao6misme.sa-east-1.rds.amazonaws.com',
  database: 'dispensario',
  password: 'Ai.g4aex.',
  port: 5432, 
  ssl: {
    rejectUnauthorized: false,
  },
});

// SQL query to select data from the medicamentos table
// const selectQuery = "SELECT medicamento, composto, laboratorio, STRING_AGG(lote, ', ') AS lotes, fabricacao, validade, SUM(qtd_cx) FROM medicamentos GROUP BY  medicamento, composto, laboratorio, fabricacao, validade;";

var selectQuery =
  "SELECT id, medicamento, composto, laboratorio, STRING_AGG(lote, ', ') AS lotes, fabricacao, validade, CASE WHEN tipo_medicamento = 'COMPRIMIDO' THEN SUM(qtd_total) WHEN tipo_medicamento = 'GOTAS' THEN SUM(qtd_cx) ELSE NULL END AS quantidade_total FROM medicamentos WHERE ativo = true GROUP BY id, medicamento, composto, laboratorio,fabricacao, validade, tipo_medicamento;";

router.get('/', async function (req, res, next) {
  jwt.verify(req.cookies.token, req.cookies.secretKey, (err, decoded) => {
    if (err) {
      return;
      //   return res.status(401).json({ message: 'Token inválido' });
    } else {
      req.user = decoded;
    }
  });
  var tableHeaders = {};
  if (req?.user?.admin) {
    tableHeaders = {
      id_medicamento: 'ID Medicamento ',
      medicamento: 'Medicamento',
      composto: 'Composto',
      laboratorio: 'Laboratorio',
      lote: 'Lote',
      // tipo: 'Tipo',
      fabricacao: 'Fabricação',
      validade: 'Validade',
      quantidade_total: 'Quantidade Total',
      buttons: 'Ações',
    };
  } else {
    tableHeaders = {
      medicamento: 'Medicamento',
      composto: 'Composto',
      laboratorio: 'Laboratorio',
      lote: 'Lote',
      // tipo: 'Tipo',
      fabricacao: 'Fabricação',
      validade: 'Validade',
      quantidade_total: 'Quantidade Total',
    };
  }
  try {
    // Get the search query from the request
    const searchQuery = req.query.search;

    // Connect to the database
    const client = await pool.connect();

    // Define the base query
    let query = selectQuery;

    // Check if there's a search query
    if (searchQuery) {
      // Modify the query to include the search condition
      query = `SELECT id, medicamento, composto, laboratorio, lote, fabricacao, validade, CASE WHEN tipo_medicamento = 'COMPRIMIDO' THEN qtd_total WHEN tipo_medicamento = 'GOTAS' THEN qtd_cx ELSE NULL END AS quantidade FROM medicamentos WHERE ativo = true AND (medicamento ILIKE '%${searchQuery}%' OR composto ILIKE '%${searchQuery}%')`;
    }

    // Execute the query
    const result = await client.query(query);

    // Release the client back to the pool
    client.release();

    // Extract the rows from the result and format the date
    const tableBody = result.rows.map((row) => ({
      ...row,
      fabricacao: new Date(row.fabricacao).toLocaleDateString('en-US', {
        month: '2-digit',
        year: 'numeric',
      }),
      validade: new Date(row.validade).toLocaleDateString('en-US', {
        month: '2-digit',
        year: 'numeric',
      }),
    }));
    // if its not admin, remove the id_medicamento from rows
    if (!req?.user?.admin) {
      tableBody.forEach((row) => {
        delete row.id;
      });
    }

    // Render the template with the retrieved data
    res.render('site-estoque', {
      user: req.user || {},
      title: 'Estoque - CVBCXS dispensário',
      page: 'estoque',
      bodyClass: 'table',
      system: req.system,
      data: {
        system: req.system,
        tableHeaders: tableHeaders,
        tableBody: tableBody, // Pass the retrieved data here
        tablePageHeader: {
          title: req.system ? 'Gerenciar Estoque' : 'Estoque',
          tableActions: {
            search: {
              placeholder: 'Pesquisar medicamento ou composto',
            },
          },
        },
      },
    });
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error retrieving data from database');
  }
});

router.post('/', async function (req, res, next) {
  try {
    // Get the search query from the form submission
    const searchQuery = req.body.search;

    // Redirect to the GET route with the search query as a query parameter
    res.redirect(`/estoque?search=${searchQuery}`);
  } catch (err) {
    console.error('Error processing search', err);
    res.status(500).send('Error processing search');
  }
});

module.exports = router;
