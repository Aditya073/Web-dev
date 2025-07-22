const mysql = require('mysql2/promise');

const connection = async () => {
     return await mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'admin123',
            database: 'demo'
        });
}

module.exports = {connection};
