import pkg from "pg";
const { Client } = pkg;

const dbConn = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "1234567890",
  database: "shurah"
});

export default dbConn;
