const sql = require('mssql');
require('dotenv').config()
// Cấu hình kết nối tới SQL Server
const config = {
    user: process.env.USER,           // Thay bằng tên người dùng SQL Server của bạn
    password: process.env.PASSWORD,   // Thay bằng mật khẩu SQL Server của bạn
    server: 'localhost',       // Thay bằng tên server SQL Server (ví dụ: localhost)
    database: 'master',       // Kết nối ban đầu tới database 'master'
    options: {
        encrypt: true,        // Bật nếu dùng Azure SQL
        trustServerCertificate: true // Bật nếu dùng server local
    }
};

// Hàm tạo database và table
async function createDbAndTable() {
    try {
        // Kết nối tới SQL Server
        let pool = await sql.connect(config);

        // Script SQL để tạo database và table
        const sqlScript = `
            IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'myDatabase')
            BEGIN
                CREATE DATABASE myDatabase;
            END
          
        `;

        const createTable = `  USE myDatabase;
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Users')
            BEGIN
                CREATE TABLE Users (id INT, name VARCHAR(50));
            END`

        // Thực thi script SQL
        await pool.request().query(sqlScript);
        await pool.request().query(createTable);
        console.log('Database và table Users đã được tạo hoặc đã tồn tại');
    } catch (err) {
        // Xử lý lỗi nếu có
        console.error('Lỗi:', err);
    } finally {
        // Đóng kết nối
        sql.close();
    }
}

// Gọi hàm để chạy
createDbAndTable();