const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host:'192.168.43.96',
    database:'courrier',
    password:'123456789',
    port: 5432,
});
module.exports = pool;