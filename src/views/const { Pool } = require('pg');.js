const { Pool } = require('pg');

// Connection pool configuration
const pool = new Pool({
  user: 'user',
  host: '127.0.0.1',
  database: 'dbname',
  password: 'password',
  port: 5432, // your PostgreSQL port
});

// Define the SQL query
const selectQuery = 'SELECT medicamento, ID FROM medicamentos';

// Function to execute the query and print results
async function executeQuery() {
    try {
        // Connect to the database
        const client = await pool.connect();
        
        // Execute the query
        const result = await client.query(selectQuery);
        
        // Release the client back to the pool
        client.release();

        // Print the results
        console.log("Results:");
        for (let row of result.rows) {
            console.log(row);
        }
    } catch (err) {
        console.error('Error executing query', err);
    } finally {
        // Close the database connection
        pool.end();
    }
}

// Call the function to execute the query
executeQuery();