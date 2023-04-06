const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const corsOptions = {
  origin: '*', // allow requests from any origin
  optionsSuccessStatus: 200
};

  
  app.use(cors(corsOptions));
  
  const config = {
    user: 'frontend',
    password: '12341234',
    server: 'localhost',
    database: 'RoverApp',
    port: 1433,
    trustServerCertificate: true
};
// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/register', async (req, res) => {
        console.log(req.body)
    try {
      const pool = await sql.connect(config);
      const { username, password } = req.body;

      const hash = await bcrypt.hash(password, 10);
  
      const result = await pool.request()
        .input('username', sql.NVarChar, username)
        .input('password', sql.NVarChar, hash)
        .query('INSERT INTO users (username, password) VALUES (@username, @password)');
  
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
        .query('SELECT id, username, password, accountType FROM users WHERE username = @username');
  
      if (!result.recordset[0]) {
        res.status(401).send({ error: 'Username or password is incorrect' });
      } else {
        const row = result.recordset[0];
        const isMatch = await bcrypt.compare(password, row.password);
  
        if (isMatch) {
          await pool.request()
            .input('username', sql.VarChar, username)
            .input('token', sql.VarChar, randomToken)
            .query(`INSERT INTO activeUsers (username, token) VALUES (@username, @token)`);
  
          const id = row.id;
          const accountType = row.accountType;
  
          res.send({ message: randomToken, userId: id, accountType });
        } else {
          res.status(401).send({ error: 'Username or password is incorrect' });
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Error logging in' });
    }
  });
  

 app.post('/api/activeToken', (req, res) => {
  const { token } = req.body;
  console.log(token);
  new sql.Request()
    .input('token', sql.VarChar, token)
    .query(`SELECT * FROM activeUsers WHERE token = @token`, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Error with Token Search' });
      } else if (!result.recordset[0]) {
        console.log('Error...');
        res.status(401).send({ error: 'Token is incorrect' });
      } else if (result.recordset[0]) {
        console.log('Success...');
        const row = result.recordset[0];
        res.send({ message: 'Successfully Authenticated', message1: row.username });
      } else {
        res.status(401).send({ error: 'Token is incorrect' });
      }
    });
});

app.put('/api/EditUserInfo', (req, res) => {
  console.log(req.body);
  new sql.Request()
    .input('data1', sql.VarChar, req.body.data1)
    .input('data2', sql.VarChar, req.body.data2)
    .input('data3', sql.VarChar, req.body.data3)
    .input('data4', sql.VarChar, req.body.data4)
    .input('data5', sql.VarChar, req.body.data5)
    .input('data6', sql.VarChar, req.body.data6)
    .input('data7', sql.VarChar, req.body.data7)
    .input('data8', sql.VarChar, req.body.data8)
    .input('data9', sql.VarChar, req.body.data9)
    .input('data10', sql.VarChar, req.body.data10)
    .input('data11', sql.VarChar, req.body.data11)
    .input('data12', sql.VarChar, req.body.data12)
    .input('data13', sql.VarChar, req.body.data13)
    .query(`UPDATE userInfo SET listingName = @data1, AboutMe = @data2, AboutHome = @data3, AboutPets = @data4, PicturesURLs = @data5, Services = @data6, SizeCanHost = @data7, SizeCanWatch = @data8, Availability = @data9, Address = @data10, TypicalTodo = @data11, pricePerDay = @data13 WHERE username = @data12`, (err) => {
      if (err) {
        console.error(err);
        console.log('Error in UPDATE');
        res.status(500).send({ error: 'Error with UPDATING UserInfo' });
      } else {
        console.log('UPDATE success...');
        res.send({ message: 'Successful with UPDATING UserInfo...' });
      }
    });
});

app.post('/api/ListingSearch', async (req, res) => {
  const { listingName } = req.body;

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('SearchTerm', sql.NVarChar(50), listingName)
      .execute('SearchListings');

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});


/* app.put('/api/messageSend', async (req, res) => {
  try {
    console.log(req.body);
    const { fromUser, toUser, message, sentAt, status } = req.body;
    const pool = await sql.connect(config);
    const newMessage = await pool.request()
      .input('fromUser', sql.NVarChar, fromUser)
      .input('toUser', sql.NVarChar, toUser)
      .input('message', sql.NVarChar, message)
      .input('sentAt', sql.DateTime, sentAt)
      .input('status', sql.NVarChar, status)
      .query(
        `INSERT INTO messages (sender_id, receiver_id, message, sent_at, status)
        VALUES (@fromUser, @toUser, @message, @sentAt, @status)`
      );
    res.send({ message: 'Message submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error submitting message' });
  }
}); */

app.put('/api/messageSend', async (req, res) => {
  try {
    console.log(req.body);
    const { fromUser, toUser, message } = req.body;
    const pool = await sql.connect(config);
    const newMessage = await pool.request()
      .input('sender_username', sql.NVarChar, fromUser)
      .input('receiver_username', sql.NVarChar, toUser)
      .input('message', sql.NVarChar, message)
      .execute('insert_message');
    res.send({ message: 'Message submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error submitting message' });
  }
});




app.put('/api/messageReceive/', async (req, res) => {
  try {
    const { toUser } = req.body;
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('receiver_username', sql.NVarChar, toUser)
      .execute('select_messages'); // Call the stored procedure
    res.send(result.recordset);
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error fetching messages' });
  }
});

app.post('/api/orders', async (req, res) => {
  const { user } = req.body;

  try {
      const pool = await sql.connect(config);
      const result = await pool.request()
          .input('user', sql.VarChar(255), user)
          .execute('GetOrdersByUser');

      res.send({ data: result.recordset });
  } catch (err) {
      console.error(err.message);
      res.status(500).send({ error: 'Error fetching orders' });
  }
});

app.post('/api/placeOrder', async (req, res) => {
  const { type, status, fromUser, toUser, price, dateStarted, dateDue, meetAndGreet } = req.body;

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('type', sql.VarChar(255), type)
      .input('status', sql.VarChar(255), status)
      .input('fromUser', sql.VarChar(255), fromUser)
      .input('meetAndGreet', sql.VarChar(255), meetAndGreet)
      .input('toUser', sql.VarChar(255), toUser)
      .input('price', sql.VarChar(255), price)
      .input('dateStarted', sql.VarChar(255), dateStarted)
      .input('dateDue', sql.VarChar(255), dateDue)
      .execute('AddOrder');

    res.send({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: 'Error adding order' });
  }
});

app.post('/api/updateOrderStatus', async (req, res) => {
  const { orderID, status } = req.body;
  console.log(req.body)
  console.log("updateOrderStatus Called")
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('orderID', sql.Int, orderID)
      .execute('update_order_status');

    res.send({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: 'Error updating order status' });
  }
});


app.post('/api/accountInfo', async (req, res) => {
  const { username } = req.body;
  console.log(req.body);

  try {
    const pool = await sql.connect(config);
      const userInfoResult = await pool.request()
        .input('username', sql.NVarChar, username)
        .query(`SELECT * FROM userInfo WHERE username  = @username`);
      
      if (!userInfoResult.recordset[0]) {
        console.log("Error...");
        res.status(401).send({ error: 'Username is incorrect' });
      } else {
        const userInfoRow = userInfoResult.recordset[0];
        res.send({ rowID: userInfoRow.ID, data: userInfoRow });
      }
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: 'Error with Token/UserInfo Search' });
  }
});


app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
