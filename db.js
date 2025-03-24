// Tạo file có tên ví dụ: dbconnect.js

const sql = require('mssql');
require('dotenv').config()
const dbConfig = {
    user: process.env.USER,           // Thay bằng tên người dùng SQL Server của bạn
    password: process.env.PASSWORD,      // Thay bằng mật khẩu
    server: 'localhost',
    database: 'myDatabase', // Thay bằng tên database của bạn
    options: {
        trustedConnection: true, // Sử dụng Windows Authentication
        encrypt: true, // Bật mã hóa (khuyến nghị cho localhost)
        trustServerCertificate: true // Bỏ qua kiểm tra certificate cho localhost
    },
    port: 1433 // Port mặc định của MSSQL
};

async function connectDB() {
    console.log(process.env);

    try {
        let pool = await sql.connect(dbConfig);
        console.log('Kết nối thành công đến database!');
        return pool;
    } catch (err) {
        console.error('Lỗi kết nối database:', err);
    }
}

// Xuất module để sử dụng ở file khác
module.exports = {
    connectDB,
    sql
};

// Ví dụ cách sử dụng
