var express = require('express');
var router = express.Router();
const { Pool } = require('pg');

// Connection pool configuration
const pool = new Pool({
  user: 'user',
  host: 'cvbcxs-dispensario_db_1',
  database: 'dbname',
  password: 'password',
  port: 5432, // 
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
        // Get the search query from the request
        const searchQuery = req.query.search;

        // Connect to the database
        const client = await pool.connect();

        // Define the base query
        let query = selectQuery;

        // Check if there's a search query
        if (searchQuery) {
            // Modify the query to include the search condition
            query = `SELECT * FROM medicamentos WHERE medicamento ILIKE '%${searchQuery}%' OR composto ILIKE '%${searchQuery}%'`;
        }

        // Execute the query
        const result = await client.query(query);

        // Release the client back to the pool
        client.release();
        
        // Extract the rows from the result and format the date
        const tableBody = result.rows.map(row => ({
            ...row,
            fabricacao: new Date(row.fabricacao).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' }),
            validade: new Date(row.validade).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' })
        }));

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
                            placeholder: 'Pesquisar medicamento ou composto'
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
