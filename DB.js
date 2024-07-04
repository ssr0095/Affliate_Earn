require('dotenv').config();
const Pool = require('pg').Pool;


const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT_PG,
    ssl: {
        require: true,
        rejectUnauthorized: false // This setting allows self-signed certificates; for production, consider setting up proper SSL certificates
    }
})

module.exports = pool