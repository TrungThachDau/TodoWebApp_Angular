const express = require('express');
const sql = require('mssql');
const getConnection = require('./dbConfig');
const app = express(); // Khởi tạo biến app từ express
const cors = require('cors');
app.use(cors());
app.use(express.json()); // Middleware để phân tích cú pháp JSON

//GET
app.get('/todos', async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Todo');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
//POST
app.post('/todos', async (req, res) => {
  try {
    const {id, title, body } = req.body;
    if (!title) {
      return res.status(400).send('Title is required.');
    }
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .input('title', sql.NVarChar, title)
      .input('body', sql.NVarChar, body)
      .query('INSERT INTO Todo (id, title, body) VALUES (@id,@title,@body)');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }});
//Delete
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send('ID is required');
    }
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Todo WHERE id = @id');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }

});
//PUT
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;
    if (!title) {
      return res.status(400).send('Title is required');
    }
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .input('title', sql.NVarChar, title)
      .input('body', sql.NVarChar, body)
      .query('UPDATE Todo SET title = @title, body = @body WHERE id = @id');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
//GET BY ID

app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send('ID is required');
    }
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Todo WHERE id = @id');
    
    // Kiểm tra xem kết quả có phần tử nào không
    if (result.recordset.length === 0) {
      return res.status(404).send('Todo not found');
    }

    // Trả về đối tượng đầu tiên trong mảng recordset
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
//search
app.get('/search', async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) {
      return res.status(400).send('Title is required for search');
    }
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('title', sql.VarChar, `%${title}%`)
      .query('SELECT * FROM Todo WHERE title LIKE @title');

    if (result.recordset.length === 0) {
      return res.status(404).send('No todos found with the given name');
    }

    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// Bắt đầu server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
