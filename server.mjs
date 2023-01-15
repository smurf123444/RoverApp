import express from 'express';
import next from 'next';
import sqlite3 from 'sqlite3';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import cors from 'cors';

import * as cookie from 'cookie';

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

const db = new sqlite3.Database(process.env.SQLITE_DATABASE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database');
});

app.prepare().then(() => {
  const server = express();
  server.use(cors());

  server.use(bodyParser.json());

  server.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    try {
      const hash = await bcrypt.hash(password, 10);
      db.run(
        `INSERT INTO users (username, password) VALUES (?, ?)`,
        [username, hash],
        function (err) {
          if (err) {
            console.error(err.message);
            res.status(500).send({ error: 'Error registering user' });
          } else {
            res.send({ message: 'User registered successfully' });
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

    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).send({ error: 'Error logging in' });
      } else if (!row) {
        res.status(401).send({ error: 'Username or password is incorrect' });
      } else {
        bcrypt.compare(password, row.password, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send({ error: 'Error logging in' });
          } else if (result) {

            db.run(
              `INSERT INTO activeUsers (username, token) VALUES (?, ?)`,
              [username, randomToken],
              function (err) {
                if (err) {
                  console.error(err.message);
                  res.status(500).send({ error: 'Error ActiveUser Token Insert Fail' });
                } else {
                  res.send({ message: 'ActiveUser Token inserted successfully' });
                }
              }
            );   
           // console.log(token());
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
    console.log(token)
    db.get(`SELECT * FROM activeUsers WHERE token = ?`, [token], (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).send({ error: 'Error with Token Search' });
      } else if (!row) {
        console.log("Error...");
      //  res.send({ message: "Unsuccessful with Authentication..." });
        res.status(401).send({ error: 'Token is incorrect' });
      }else if (row)
      {
        console.log("Success...");
        res.send({ message: "Successfully Authenticated", message1: row.username });
      } 
      else {
/*         bcrypt.compare(token, row.token, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send({ error: 'Cant Find Token' });
          } else if (result) {
           console.log("Success...");
            res.send({ message: "Successfully Authenticated" });
          } else {
            console.log("'Username or password is incorrect'")
            res.status(401).send({ error: 'Username or password is incorrect' });
          }
        }); */
        res.status(401).send({ error: 'Token is incorrect' });
      }
    });
  });
  
  server.post('/api/userInfo', (req, res) => {
    const { token } = req.body;
    console.log(token)
    let row2Item = ''
    db.get(`SELECT * FROM activeUsers WHERE token = ?`, [token], (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).send({ error: 'Error with Token Search' });
      } else if (!row) {
        console.log("Error...");
      //  res.send({ message: "Unsuccessful with Authentication..." });

        res.status(401).send({ error: 'Token is incorrect' });
      }else if (row)
      {
        row2Item = row.username;
        db.get(`SELECT * FROM userInfo WHERE ID = ?`, [row2Item], (err, row) => {
          if (err) {
            console.error(err.message);
            console.log("Error in 500")
            res.status(500).send({ error: 'Error with UserInfo Search' });
          } else if (!row) {
            console.log("Error...");
          //  res.send({ message: "Unsuccessful with Authentication..." });
            res.status(401).send({ error: 'Username is incorrect' });
          }else if (row)
          {
            res.send({ rowID: row.ID, data: row });

          } 
          else {
            res.status(401).send({ error: 'Token is incorrect' });
          }
        });
      } 
      else {
        res.status(401).send({ error: 'Token is incorrect' });
      }
    });
  }); 


/*   server.put('/api/EditUserInfo', (req, res) => {
    console.log(req.body)
    db.get(`SELECT * FROM userInfo WHERE ID = ?`, [req.body.data1], (err, row) =>  { 
      if(row)
    {

      
    }else if(!row){
      console.log("No user FOUND")
      db.run(`INSERT INTO userInfo (ID) VALUES (?)`, [req.body.data1 ], (err) => {
        if (err) {
                  console.error(err.message);
                  console.log("Error in INSERT")
                  res.status(500).send({ error: 'Error with INSERTING UserInfo' });
                } else {
                  console.log("INSERT success...");
                  res.send({ message: "Successful with INSERTING UserInfo..." });
                }  
              });
    //  res.status(500).send({ error: 'Error with Editing UserInfo' });
    } });

  });  */
       
    
       

  server.put('/api/EditUserInfo', (req, res) => {
    console.log(req.body)
    db.run(`UPDATE userInfo SET AboutMe = ?, AboutHome = ?, AboutPets = ?, PicturesURLs = ?, Services = ?, SizeCanHost = ?, SizeCanWatch = ?, Availability = ?, Address = ?, TypicalTodo = ? WHERE ID = ?`, [req.body.data2, req.body.data3, req.body.data4, req.body.data5, req.body.data6, req.body.data7, req.body.data8, req.body.data9, req.body.data10, req.body.data11, req.body.data1], (err) => {
      if (err) {
        console.error(err.message);
        console.log("Error in UPDATE");
        res.status(500).send({ error: 'Error with UPDATING UserInfo' });
      } else {
        console.log("UPDATE success...");
        res.send({ message: "Successful with UPDATING UserInfo..." });
      }
    });
  }); 

   

  server.post('/api/accountInfo', (req, res) => {
    const { token } = req.body;
    console.log(token)
    let row2Item = ''
    db.get(`SELECT * FROM activeUsers WHERE token = ?`, [token], (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).send({ error: 'Error with Token Search' });
      } else if (!row) {
        console.log("Error...");
      //  res.send({ message: "Unsuccessful with Authentication..." });

        res.status(401).send({ error: 'Token is incorrect' });
      }else if (row)
      {
        row2Item = row.username;
        db.get(`SELECT * FROM userInfo WHERE ID = ?`, [row2Item], (err, row) => {
          if (err) {
            console.error(err.message);
            console.log("Error in 500")
            res.status(500).send({ error: 'Error with UserInfo Search' });
          } else if (!row) {
            console.log("Error...");
          //  res.send({ message: "Unsuccessful with Authentication..." });
            res.status(401).send({ error: 'Username is incorrect' });
          }else if (row)
          {
            res.send({ rowID: row.ID, data: row });

          } 
          else {
            res.status(401).send({ error: 'Token is incorrect' });
          }
        });
      } 
      else {
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
