const express = require('express');
const mysql = require('mysql');
const cors = require('cors');  // Import cors
const app = express();

app.use(express.json());
app.use(cors());  // Enable CORS for all routes

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'certificate',
  port: 3308,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL');
});

// API to insert data
app.post('/api/certificates', (req, res) => {
  const { name, collegename, city } = req.body;
  const sql = 'INSERT INTO certificates (name, collegename, city) VALUES (?, ?, ?)';
  db.query(sql, [name, collegename, city], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send({ message: 'Error inserting data' });
    }
    // Fetch the inserted data
    const newCertificate = {
      id: result.insertId,
      name,
      collegename,
      city,
    };
    res.send(newCertificate); // Return the new certificate
  });
});

// API to get data
app.get('/api/certificates', (req, res) => {
  const sql = 'SELECT * FROM certificates';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send({ message: 'Error fetching data' });
    }
    res.send(results);
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
