import express from 'express';
import next from 'next';

import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import cors from 'cors';

const sql = require('mssql');


dotenv.config();
const rand = () => {
  return Math.random().toString(36).substr(2);
};

const token = () => {
  return rand() + rand();
}; 
const randomToken = token();
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();



const config = {
    user: 'tits',
    password: '12341234',
    server: 'MSI',
    database: 'Rover',
};

sql.connect(config, (err) => {
    if (err) console.log(err);
});


app.prepare().then(() => {
  const server = express();
  server.use(cors());

  server.use(bodyParser.json());

  server.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const sqlRequest = new sql.Request();
        sqlRequest.input('username', sql.NVarChar, username);
        sqlRequest.input('password', sql.NVarChar, hash);
        sqlRequest.query(
            `INSERT INTO users (username, password) 
             OUTPUT INSERTED.ID
             VALUES (@username, @password)`,
            (err, result) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).send({ error: 'Error registering user' });
                } else {
                    const userId = result.recordset[0].ID;
                    sqlRequest.input('userId', sql.Int, userId);
                    sqlRequest.query(
                        `INSERT INTO userInfo (ID) 
                         VALUES (@userId)`,
                        (err, result) => {
                            if (err) {
                                console.error(err.message);
                                res.status(500).send({ error: 'Error registering user' });
                            } else {
                                res.send({ message: 'User registered successfully' });
                            }
                        }
                    );
                }
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error registering user' });
    }
});


server.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  new sql.Request()
    .input('username', sql.VarChar, username)
    .query(`SELECT * FROM users WHERE username = @username`, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Error logging in' });
      } else if (!result.recordset[0]) {
        res.status(401).send({ error: 'Username or password is incorrect' });
      } else {
        const row = result.recordset[0];
        bcrypt.compare(password, row.password, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send({ error: 'Error logging in' });
          } else if (result) {
            new sql.Request()
              .input('username', sql.VarChar, username)
              .input('token', sql.VarChar, randomToken)
              .query(
                `INSERT INTO activeUsers (username, token) VALUES (@username, @token)`,
                (err) => {
                  if (err) {
                    console.error(err);
                    res.status(500).send({ error: 'Error ActiveUser Token Insert Fail' });
                  } else {
                    console.log('Login Successful');
                  }
                }
              );
            res.send({ message: randomToken });
          } else {
            res.status(401).send({ error: 'Username or password is incorrect' });
          }
        });
      }
    });
});



server.post('/api/activeToken', (req, res) => {
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



server.put('/api/EditUserInfo', (req, res) => {
  console.log(req.body);
  new sql.Request()
    .input('data2', sql.VarChar, req.body.data2)
    .input('data3', sql.VarChar, req.body.data3)
    .input('data4', sql.VarChar, req.body.data4)
    .input('data5', sql.VarChar, req.body.data5)
    .input('data6', sql.VarChar, req.body.data6)
    .input('data7', sql.Int, req.body.data7)
    .input('data8', sql.Int, req.body.data8)
    .input('data9', sql.VarChar, req.body.data9)
    .input('data10', sql.VarChar, req.body.data10)
    .input('data11', sql.VarChar, req.body.data11)
    .input('data1', sql.Int, req.body.data1)
    .query(`UPDATE userInfo SET AboutMe = @data2, AboutHome = @data3, AboutPets = @data4, PicturesURLs = @data5, Services = @data6, SizeCanHost = @data7, SizeCanWatch = @data8, Availability = @data9, Address = @data10, TypicalTodo = @data11 WHERE ID = @data1`, (err) => {
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


server.put('/api/messageSend', async (req, res) => {
  try {
    console.log(req.body);
    const { fromUser, toUser, message, sentAt, status } = req.body;
    const newMessage = await new mssql.Request()
      .input('fromUser', mssql.NVarChar, fromUser)
      .input('toUser', mssql.NVarChar, toUser)
      .input('message', mssql.NVarChar, message)
      .input('sentAt', mssql.DateTime, sentAt)
      .input('status', mssql.NVarChar, status)
      .query(
        `INSERT INTO messages (sender_id, receiver_id, message, sent_at, status)
        VALUES (@fromUser, @toUser, @message, @sentAt, @status)`
      );
    res.send({ message: 'Message submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error submitting message' });
  }
});


server.put('/api/messageReceive/', async (req, res) => {
  try {
    const { toUser } = req.body;
    const sql = "SELECT * FROM messages WHERE receiver_id = @toUser";
    const result = await new mssql.Request().input("toUser", mssql.NVarChar, toUser).query(sql);
    res.send(result.recordset);
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error fetching messages' });
  }
});


server.post('/api/accountInfo', (req, res) => {
  const { token, username } = req.body;
  console.log(req.body)
  db.get(`SELECT * FROM activeUsers WHERE username = ?`, [username], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send({ error: 'Error with Token Search' });
    } else if (!row) {
      console.log("Error...");
    //  res.send({ message: "Unsuccessful with Authentication..." });
      res.status(401).send({ error: 'Token is incorrect' });
    } else if (row) {
      db.get(`SELECT * FROM userInfo WHERE ID = ?`, [username], (err, row) => {
        if (err) {
          console.error(err.message);
          console.log("Error in 500")
          res.status(500).send({ error: 'Error with UserInfo Search' });
        } else if (!row) {
          console.log("Error...");
        //  res.send({ message: "Unsuccessful with Authentication..." });
          res.status(401).send({ error: 'Username is incorrect' });
        } else if (row) {
          res.send({ rowID: row.ID, data: row });
        } else {
          res.status(401).send({ error: 'Token is incorrect' });
        }
      });
    } else {
      res.status(401).send({ error: 'Token is incorrect' });
    }
  });
});

  
  

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
