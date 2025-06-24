/*
const express=require('express');
const mysql=require('mysql');
const cors=require('cors');
const app=express();
const bp=require('body-parser');
app.use(cors());
app.use(bp.json());
const conn=mysql.createConnection({
  host:'localhost',user:'root',password:'',database:'kitsw',
});
 conn.connect(err=>{
  if(err){
    console.error('Data base connection failed',err.stack);
    return;
  }
  console.log('Connected to database');
 });
app.post('/login',(req,res)=>{
  const {name,rollno,password}=req.body;
  const sql='Insert into skill(name,rollno,password) values (?,?,?)';
  conn.query(sql,[name,rollno,password],(err,result)=>{
    if(err){
      res.json({message:'Server error'});
      }
    else if(result.length>0){
      res.json({message:'Login successful'});
    }
    else{
      res.json({messgae:'Invalid credentials'});
    }
    });
  });


app.listen(4000,()=>{
  console.log('running on http://localhost:4000')
});
*/
/*const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kitsw'
});

conn.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database');
});

app.post('/login', (req, res) => {
  const { name, rollno, password } = req.body;
  const sql = 'SELECT * FROM users WHERE name = ? AND rollno = ? AND password = ?';
  conn.query(sql, [name, rollno, password], (err, results) => {
    if (err) {
      console.error(err);
      res.json({ message: 'Server error' });
    } else if (results.length > 0) {
      res.json({ message: 'Login successful', rollno: rollno });
    } else {
      res.json({ message: 'Invalid credentials' });
    }
  });
});
// Change this:
app.post('/skills', (req, res) => {
  const { rollno } = req.body;
  const query = 'SELECT * FROM skills WHERE rollno = ?';
  conn.query(query, [rollno], (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

// To this (fetch all):
app.get('/skills', (req, res) => {
  const query = 'SELECT * FROM skills';
  conn.query(query, (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});


app.post('/add-skill', (req, res) => {
  const { rollno, skill_name, proficiency } = req.body;
  const sql = 'INSERT INTO skills (rollno, skill_name, proficiency) VALUES (?, ?, ?)';
  conn.query(sql, [rollno, skill_name, proficiency], (err, result) => {
    if (err) {
      console.error('Error inserting skill:', err);
      res.json({ message: 'Failed to add skill' });
    } else {
      res.json({ message: 'Skill added successfully' });
    }
  });
});




app.post('/signup', (req, res) => {
  const { name, rollno, password } = req.body;
  const sql = 'INSERT INTO users (name, rollno, password) VALUES (?, ?, ?)';
  conn.query(sql, [name, rollno, password], (err, result) => {
    if (err) {
      console.error(err);
      res.json({ message: 'Signup failed. User may already exist or invalid input.' });
    } else {
      res.json({ message: 'Signup successful' });
    }
  });
});

app.post('/homepage',(req,res)=>{
  const {id,rollno,skill_name,proficinecy}=req.body;
  const sql='UPDATE skills SET skill_name=?,proficinecy=? where id=?';
  conn.query(sql,[id,rollno,skill_name,proficinecy],(err,result)=>{
    if(err){
      res.send({message:'Error updating the skill'});
    }
    else{
      res.send({message:'Skill updated successfully'});
    }
  });
});
app.post('/delete-skill', (req, res) => {
  const { id } = req.body;
  const query = 'UPDATE skills SET isworking = 0 WHERE id = ?';

  conn.query(query, [id], (err, result) => {
    if (err) return res.json({ success: false, error: err });
    res.json({ success: true });
  });
});

app.post('/update-skill', (req, res) => {
  const { id, skill_name, proficiency } = req.body;
  
  const sql = 'UPDATE skills SET skill_name = ?, proficiency = ?, status = "Active", isworking = 1 WHERE id = ?';
  conn.query(sql, [skill_name, proficiency, id], (err, result) => {
    if (err) {
      console.error('Error updating skill:', err);
      res.json({ message: 'Failed to update skill' });
    } else {
      res.json({ message: 'Skill updated successfully' });
    }
  });
});



app.post('/reactivate-skill', (req, res) => {
  const { id } = req.body;
  const query = 'UPDATE skills SET isworking = 1 WHERE id = ?';
  conn.query(query, [id], (err) => {
    if (err) res.json({ message: 'Failed to reactivate skill' });
    else res.json({ message: 'Skill reactivated' });
  });
});


app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});*/
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

app.use(cors());
app.use(express.json());

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kitsw'
});

conn.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected');
});

app.get('/skills', async(req, res) => {
  const [rows]=await conn.execute('SELECT * FROM skills');
    if (err) res.status(500).send(err);
     res.json(result);
  });


app.post('/signup', (req, res) => {
  const { name, rollno, password } = req.body;

  const checkUser = 'SELECT * FROM users WHERE rollno = ?';
  conn.query(checkUser, [rollno], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });

    if (results.length > 0) {
      return res.json({ message: 'User already exists' });
    }

    const query = 'INSERT INTO users (name, rollno, password) VALUES (?, ?, ?)';
    conn.query(query, [name, rollno, password], (err) => {
      if (err) return res.json({ message: 'Signup failed' });

      const defaultSkill = `INSERT INTO skills (rollno, skill_name, proficiency, isworking, hours, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
                            VALUES (?, 'c', 'Beginner', 1, 0, 0, 0, 0, 0, 0, 0, 0)`;
      conn.query(defaultSkill, [rollno], (err2) => {
        if (err2) {
          return res.json({ message: 'Signup succeeded, but skill insert failed' });
        }
        res.json({ message: 'Signup successful' });
      });
    });
  });
});

app.post('/login', (req, res) => {
  const { rollno, password } = req.body;
  const sql = 'SELECT * FROM users WHERE rollno = ? AND password = ?';
  conn.query(sql, [rollno, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Login failed' });
    }
    if (result.length > 0) {
      res.json({ message: 'Login successful', rollno, role: result[0].role });
    } else {
      res.json({ message: 'Invalid credentials' });
    }
  });
});



app.post('/add-skill', (req, res) => {
  const {
    rollno, skill, proficiency, hours,
    monday, tuesday, wednesday, thursday,
    friday, saturday, sunday
  } = req.body;

  const checkQuery = `SELECT * FROM skills WHERE rollno = ? AND skill_name = ?`;
  conn.query(checkQuery, [rollno, skill], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error checking skill' });

    if (result.length > 0) {
      // Update existing skill
      const updateQuery = `
        UPDATE skills SET proficiency=?, hours=?, monday=?, tuesday=?, wednesday=?, thursday=?, 
        friday=?, saturday=?, sunday=?, isworking=1
        WHERE rollno=? AND skill_name=?`;

      conn.query(updateQuery, [proficiency, hours, monday, tuesday, wednesday, thursday, friday, saturday, sunday, rollno, skill],
        (err) => {
          if (err) return res.status(500).json({ message: 'Error updating skill' });
          res.json({ message: 'Skill updated successfully' });
        });
    } else {
      // Insert new skill
      const insertQuery = `
  INSERT INTO skills 
  (rollno, skill_name, proficiency, hours, monday, tuesday, wednesday, 
   thursday, friday, saturday, sunday, isworking) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
  ON DUPLICATE KEY UPDATE 
    proficiency = VALUES(proficiency),
    hours = VALUES(hours),
    monday = VALUES(monday),
    tuesday = VALUES(tuesday),
    wednesday = VALUES(wednesday),
    thursday = VALUES(thursday),
    friday = VALUES(friday),
    saturday = VALUES(saturday),
    sunday = VALUES(sunday),
    isworking = 1
`;

      conn.query(insertQuery, [rollno, skill, proficiency, hours, monday, tuesday, wednesday, thursday, friday, saturday, sunday],
        (err) => {
          if (err) return res.status(500).json({ message: 'Error adding skill' });
          res.json({ message: 'Skill added successfully' });
        });
    }
  });
});


app.post('/restore-skill/:id', (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE skills SET isworking = 1 WHERE rollno = "b23ai011"';
  conn.query(query, [id], (err) => {
    if (err) return res.json({ message: 'Error restoring skill' });
    res.json({ message: 'Skill restored' });
  });
});

app.post('/update-daily-hours', (req, res) => {
  const { rollno, skill_name, day, value } = req.body;
  const query = `UPDATE skills SET ${day} = ? WHERE rollno = ? AND skill_name = ?`;
  conn.query(query, [value, rollno, skill_name], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Updated successfully' });
  });
});

app.post('/delete-skill', (req, res) => {
  const { rollno } = req.body;
  conn.query('UPDATE skills SET isworking = 0 WHERE rollno = ?', [rollno], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Skill marked as deleted' });
  });
});

app.post('/update-skill', (req, res) => {
  const { id, skill_name, proficiency, hours, isworking } = req.body;
  const query = `
    UPDATE skills SET skill_name = ?, proficiency = ?, hours = ?, isworking = ?
    WHERE id = ?`;
  conn.query(query, [skill_name, proficiency, hours, isworking, id], (err) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    res.json({ message: 'Skill updated' });
  });
});

app.post('/upsert-skill', (req, res) => {
  const { rollno, skill_name, proficiency, hours, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;

  const query = `
    INSERT INTO skills (rollno, skill_name, proficiency, hours, isworking, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
    VALUES (?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE 
      skill_name=?, proficiency=?, hours=?, isworking=1,
      monday=?, tuesday=?, wednesday=?, thursday=?, friday=?, saturday=?, sunday=?
  `;

  conn.query(
    query,
    [
      rollno, skill_name, proficiency, hours,
      monday, tuesday, wednesday, thursday, friday, saturday, sunday,
      skill_name, proficiency, hours,
      monday, tuesday, wednesday, thursday, friday, saturday, sunday
    ],
    (err) => {
      if (err) return res.status(500).json({ message: 'Error adding skill' });
      return res.json({ message: 'Skill added or reactivated' });
    }
  );
});

app.post('/fetch-skills', (req, res) => {
  conn.query(
    'SELECT * FROM skills WHERE rollno=?',
    [req.body.rollno],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Fetch error' });
      res.json(results);
    }
  );
});
app.get('/progress/:rollno', (req, res) => {
  const rollno = req.params.rollno;
  const sql = `
    SELECT 'Monday' AS day, monday AS hours FROM skills WHERE rollno = ?
    UNION SELECT 'Tuesday', tuesday FROM skills WHERE rollno = ?
    UNION SELECT 'Wednesday', wednesday FROM skills WHERE rollno = ?
    UNION SELECT 'Thursday', thursday FROM skills WHERE rollno = ?
    UNION SELECT 'Friday', friday FROM skills WHERE rollno = ?
    UNION SELECT 'Saturday', saturday FROM skills WHERE rollno = ?
    UNION SELECT 'Sunday', sunday FROM skills WHERE rollno = ?
  `;
  conn.query(sql, [rollno, rollno, rollno, rollno, rollno, rollno, rollno], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching progress' });
    res.json(results);
  });
});

app.get('/get-daily-hours', (req, res) => {
  const query = `
    SELECT rollno, skill_name, monday, tuesday, wednesday, thursday, friday, saturday, sunday 
    FROM skills WHERE isworking = 1
  `;
  conn.query(query, (err, result) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(result);
  });
});


app.get('/charts/:rollno', (req, res) => {
  const rollno = req.params.rollno;
 const sql = `
  SELECT rollno, skill_name, proficiency, isworking, hours, monday, tuesday, wednesday, thursday, friday, saturday, sunday 
  FROM skills 
  WHERE rollno = ?
`;

  conn.query(sql, [rollno], (err, results) => {
    if (err) res.status(500).json({ message: 'Chart error' });
    else res.json(results);
  });
});

app.listen(4000, () => console.log('Server running on port 4000'));/*
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'your_database_name' // replace with your DB name
});

// --- Signup ---
app.post('/signup', (req, res) => {
  const { rollno, password, role } = req.body;
  const userRole = role || 'user';
  const sql = 'INSERT INTO users (rollno, password, role) VALUES (?, ?, ?)';
  conn.query(sql, [rollno, password, userRole], (err, result) => {
    if (err) return res.json({ message: 'Signup failed' });
    res.json({ message: 'Signup successful' });
  });
});

// --- Login ---
app.post('/login', (req, res) => {
  const { rollno, password } = req.body;
  const sql = 'SELECT * FROM users WHERE rollno = ? AND password = ?';
  conn.query(sql, [rollno, password], (err, result) => {
    if (err) return res.json({ message: 'Login failed' });
    if (result.length > 0) {
      const role = result[0].role;
      res.json({ message: 'Login successful', rollno, role });
    } else {
      res.json({ message: 'Invalid credentials' });
    }
  });
});

// --- Get all skills ---
app.get('/skills', (req, res) => {
  conn.query('SELECT * FROM skills', (err, result) => {
    if (err) return res.json([]);
    res.json(result);
  });
});

// --- Add or update skill ---
app.post('/add-skill', (req, res) => {
  const { rollno, skill, proficiency, hours, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;
  const sql = `
    INSERT INTO skills (rollno, skill_name, proficiency, hours, isworking, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
    VALUES (?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
    proficiency = VALUES(proficiency), hours = VALUES(hours),
    monday = VALUES(monday), tuesday = VALUES(tuesday), wednesday = VALUES(wednesday),
    thursday = VALUES(thursday), friday = VALUES(friday), saturday = VALUES(saturday), sunday = VALUES(sunday),
    isworking = 1
  `;
  conn.query(sql, [rollno, skill, proficiency, hours, monday, tuesday, wednesday, thursday, friday, saturday, sunday], (err, result) => {
    if (err) return res.json({ message: 'Error saving skill' });
    res.json({ message: 'Skill saved successfully' });
  });
});

// --- Soft delete (set isworking = 0) ---
app.post('/delete-skill', (req, res) => {
  const { rollno } = req.body;
  conn.query('UPDATE skills SET isworking = 0 WHERE rollno = ?', [rollno], (err, result) => {
    if (err) return res.json({ message: 'Error deleting' });
    res.json({ message: 'Skills marked as deleted' });
  });
});

// --- Update skill (restore / edit) ---
app.post('/update-skill', (req, res) => {
  const { rollno, skill_name, proficiency, hours, isworking } = req.body;
  const sql = `
    UPDATE skills SET proficiency = ?, hours = ?, isworking = ?
    WHERE rollno = ? AND skill_name = ?
  `;
  conn.query(sql, [proficiency, hours, isworking, rollno, skill_name], (err, result) => {
    if (err) return res.json({ message: 'Error updating skill' });
    res.json({ message: 'Skill updated successfully' });
  });
});

// --- Bar chart data ---
app.get('/charts/:rollno', (req, res) => {
  const rollno = req.params.rollno;
  const sql = 'SELECT * FROM skills WHERE rollno = ? AND isworking = 1';
  conn.query(sql, [rollno], (err, result) => {
    if (err) return res.json([]);
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
*/
