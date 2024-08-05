const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const path = require('path'); // Required for serving static files

const app = express();
const port = 3000; // Ensure the port matches the one you're running on

// PostgreSQL client setup
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123',
    port: 5432,
});

client.connect();

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to handle form submissions
app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Insert data into PostgreSQL
        await client.query('INSERT INTO users(username, email, password) VALUES($1, $2, $3)', [username, email, password]);
        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        console.error('Error inserting data', error);
        res.status(500).json({ message: 'Error signing up' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
