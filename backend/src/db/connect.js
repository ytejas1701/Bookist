import pg from "pg";

const pool = new pg.Pool({
    user:'postgres',
    host:'localhost',
    database:'bookist',
    password:'112358',
    port:5432
});

export default pool;