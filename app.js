const express = require('express');
const app = express();
const port = 3000;
const { connectDB,
    sql } = require('./db');
require('dotenv').config()
var cors = require('cors');
var corsOptions = {
    origin: '*',
    credentials: true
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', async (req, res) => {
    try {
        const pool = await connectDB();
        const result = await pool.request().query('SELECT * FROM users');
        console.log(result.recordset);

        res.json(result.recordset); // Dữ liệu trả về nằm trong `recordset`
    } catch (err) {
        res.status(500).send('Lỗi khi lấy danh sách users');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});