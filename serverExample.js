const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();
const corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200
  };
  
  app.use(cors(corsOptions));
  
const config = {
  user: 'tits',
  password: '12341234',
  server: 'MSI',
  database: 'RoverApp'
};

app.get('/', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .query('SELECT * FROM your-table-name');

    res.send(result);
  } catch (err) {
    console.error(err);
    res.send('An error occurred');
  }
});

app.post('/api/register', async (req, res) => {
    try {
      const pool = await sql.connect(config);
      const { username, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
  
      const result = await pool.request()
        .input('username', sql.NVarChar, username)
        .input('password', sql.NVarChar, hash)
        .query('INSERT INTO users (username, password) VALUES (@username, @password)');
  
      const result2 = await pool.request()
        .input('ID', sql.NVarChar, username)
        .query('INSERT INTO userInfo (ID) VALUES (@ID)');
  
      res.send({ message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Error registering user' });
    }
  });

  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const randomToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    try {
    const pool = await sql.connect(config);
    const result = await pool.request()
    .input('username', sql.VarChar, username)
    .query('SELECT * FROM users WHERE username = @username');
    if (!result.recordset[0]) {
        res.status(401).send({ error: 'Username or password is incorrect' });
      } else {
        const row = result.recordset[0];
        const isMatch = await bcrypt.compare(password, row.password);
      
        if (isMatch) {
          await pool.request()
            .input('username', sql.VarChar, username)
            .input('token', sql.VarChar, randomToken)
            .query(
              `INSERT INTO activeUsers (username, token) VALUES (@username, @token)`
            );
      
          res.send({ message: randomToken });
        } else {
          res.status(401).send({ error: 'Username or password is incorrect' });
        }
      }
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Error logging in' });
        }
 });      

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
