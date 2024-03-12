var express = require('express');
var router = express.Router();
const { Pool } = require('pg');

// Connection pool configuration
const pool = new Pool({
  user: 'user',
  host: 'cvbcxs-dispensario_db_1',
  database: 'dbname',
  password: 'password',
  port: 5432, // or your PostgreSQL port
});

// Table headers definition
var tableHeaders = {
    medicamento: 'Medicamento',
    composto: 'Composto',
    laboratorio: 'Laboratorio',
    lote: 'Lote',
    fabricacao: 'Fabricação',
    validade: 'Validade',
    quantidade: 'Qtd'
};

// SQL query to select data from the medicamentos table
const selectQuery = 'SELECT * FROM medicamentos';

router.get('/', async function(req, res, next){
    try {
        // Connect to the database
        const client = await pool.connect();
        // Execute the query
        const result = await client.query(selectQuery);
        // Release the client back to the pool
        client.release();
        
        // Extract the rows from the result
        const tableBody = result.rows;

        // Render the template with the retrieved data
        res.render('site-estoque', { 
            title: 'Estoque - CVBCXS dispensário', 
            page: 'estoque table', 
            data: { 
                tableHeaders: tableHeaders, 
                tableBody: tableBody, // Pass the retrieved data here
                tablePageHeader: {
                    title: 'Estoque',
                    tableActions: {
                        search: {
                            placeholder: 'Pesquisar medicamento'
                        }
                    },
                }
            } 
        });
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error retrieving data from database');
    }
});

module.exports = router;
